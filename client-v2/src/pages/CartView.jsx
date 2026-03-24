import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function CartView() {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();

  const placeOrder = async () => {
    if (items.length === 0) return;
    try {
      await api.post('/api/orders', {
        items: items.map((item) => ({
          cakeId: item._id,
          quantity: item.quantity,
          size: 'medium',
        })),
        totalPrice: total,
        deliveryAddress: 'Bangalore',
      });
      clearCart();
      toast.success('Order placed successfully! 🎂');
    } catch {
      toast.error('Failed to place order');
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-cream-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <Link
          to="/gallery"
          className="inline-flex items-center gap-2 text-sm text-chocolate-500 hover:text-rose-600 transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Continue Shopping
        </Link>

        <h1 className="font-display text-4xl font-bold text-chocolate-800 mb-10">Your Cart</h1>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <ShoppingBag size={64} className="mx-auto text-cream-300 mb-6" />
            <h2 className="text-xl font-semibold text-chocolate-700 mb-2">Your cart is empty</h2>
            <p className="text-chocolate-400 mb-8">Time to find your perfect cake!</p>
            <Link to="/gallery" className="btn-primary inline-flex items-center gap-2">
              Browse Cakes
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, i) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="card p-5 flex items-center gap-5"
                >
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center flex-shrink-0 text-3xl">
                      🎂
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-chocolate-800 truncate">{item.name}</h3>
                    <p className="text-rose-500 font-bold mt-1">₹{item.price}</p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg bg-cream-100 hover:bg-cream-200 flex items-center justify-center transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-semibold text-chocolate-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-cream-100 hover:bg-cream-200 flex items-center justify-center transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <p className="font-bold text-chocolate-800 w-20 text-right">
                    ₹{item.price * item.quantity}
                  </p>

                  <button
                    onClick={() => removeItem(item._id)}
                    className="p-2 text-chocolate-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-28">
                <h3 className="font-semibold text-chocolate-800 text-lg mb-6">Order Summary</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-chocolate-500">
                    <span>Subtotal ({items.length} items)</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between text-sm text-chocolate-500">
                    <span>Delivery</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="border-t border-cream-200 pt-3 flex justify-between">
                    <span className="font-bold text-chocolate-800">Total</span>
                    <span className="font-bold text-xl text-rose-500">₹{total}</span>
                  </div>
                </div>
                <button onClick={placeOrder} className="btn-primary w-full">
                  Place Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
