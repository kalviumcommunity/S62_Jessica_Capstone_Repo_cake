import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = (cake) => {
    setItems((prev) => {
      const existing = prev.find((item) => item._id === cake._id);
      if (existing) {
        toast.success(`Added another ${cake.name}`);
        return prev.map((item) =>
          item._id === cake._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      toast.success(`${cake.name} added to cart`);
      return [...prev, {
        _id: cake._id || `custom-${Date.now()}`,
        name: cake.name,
        image: cake.image || null,
        price: typeof cake.price === 'object' ? cake.price.medium : (cake.price || 0),
        quantity: 1,
        isCustom: cake.isCustom || false,
        customData: cake.customData || null,
      }];
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) return removeItem(id);
    setItems((prev) => prev.map((item) =>
      item._id === id ? { ...item, quantity } : item
    ));
  };

  const removeItem = (id) => {
    setItems((prev) => {
      const item = prev.find((i) => i._id === id);
      if (item) toast.success(`Removed ${item.name}`);
      return prev.filter((i) => i._id !== id);
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{
      items, itemCount, total,
      addToCart, updateQuantity, removeItem, clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
