import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Package, BarChart3, Cake } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const { isAdmin, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [cakes, setCakes] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  // Cake form state
  const [showForm, setShowForm] = useState(false);
  const [editingCake, setEditingCake] = useState(null);
  const [form, setForm] = useState({
    name: '', description: '', mediumPrice: '', largePrice: '', image: '', category: '',
  });

  useEffect(() => {
    if (!isLoggedIn || !isAdmin) return;
    Promise.all([
      api.get('/api/orders'),
      api.get('/api/cakes'),
      api.get('/api/analytics/revenue').catch(() => ({ data: { totalRevenue: 0 } })),
    ]).then(([ordersRes, cakesRes, revenueRes]) => {
      setOrders(ordersRes.data);
      setCakes(cakesRes.data);
      setRevenue(revenueRes.data.totalRevenue || 0);
    }).finally(() => setLoading(false));
  }, [isAdmin, isLoggedIn]);

  if (!isLoggedIn || !isAdmin) {
    return (
      <div className="text-center py-32">
        <p className="text-5xl mb-4">🔒</p>
        <p className="text-chocolate-500 text-lg mb-6">Admin access required</p>
        <button onClick={() => navigate('/login')} className="btn-primary">Log in</button>
      </div>
    );
  }

  const updateOrderStatus = async (id, status) => {
    try {
      await api.put(`/api/orders/${id}`, { status });
      setOrders((prev) => prev.map((o) => o._id === id ? { ...o, status } : o));
      toast.success(`Order ${status.toLowerCase()}`);
    } catch {
      toast.error('Failed to update order');
    }
  };

  const handleSubmitCake = async () => {
    try {
      const payload = {
        name: form.name,
        description: form.description,
        price: { medium: Number(form.mediumPrice), large: Number(form.largePrice) },
        image: form.image,
        category: form.category,
      };

      if (editingCake) {
        const res = await api.put(`/api/cakes/${editingCake._id}`, payload);
        setCakes((prev) => prev.map((c) => c._id === editingCake._id ? res.data : c));
        toast.success('Cake updated');
      } else {
        const res = await api.post('/api/cakes', payload);
        setCakes((prev) => [...prev, res.data]);
        toast.success('Cake added');
      }
      resetForm();
    } catch {
      toast.error('Failed to save cake');
    }
  };

  const deleteCake = async (id) => {
    try {
      await api.delete(`/api/cakes/${id}`);
      setCakes((prev) => prev.filter((c) => c._id !== id));
      toast.success('Cake deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  const startEdit = (cake) => {
    setEditingCake(cake);
    setForm({
      name: cake.name,
      description: cake.description,
      mediumPrice: cake.price.medium,
      largePrice: cake.price.large,
      image: cake.image,
      category: cake.category || '',
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingCake(null);
    setForm({ name: '', description: '', mediumPrice: '', largePrice: '', image: '', category: '' });
  };

  const tabs = [
    { id: 'orders', label: 'Orders', icon: <Package size={18} /> },
    { id: 'cakes', label: 'Cakes', icon: <Cake size={18} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={18} /> },
  ];

  const statusColors = {
    Pending: 'bg-amber-100 text-amber-700',
    Preparing: 'bg-blue-100 text-blue-700',
    'Out for Delivery': 'bg-purple-100 text-purple-700',
    Delivered: 'bg-green-100 text-green-700',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-4 border-rose-500/30 border-t-rose-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <h1 className="font-display text-3xl font-bold text-chocolate-800 mb-2">Admin Dashboard</h1>
        <p className="text-chocolate-400 mb-8">Manage orders, cakes and analytics</p>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                tab === t.id
                  ? 'bg-chocolate-800 text-white shadow-lg'
                  : 'bg-white text-chocolate-600 hover:bg-cream-100 border border-cream-200'
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Orders Tab */}
        {tab === 'orders' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {orders.length === 0 ? (
              <p className="text-chocolate-400 text-center py-12">No orders yet</p>
            ) : (
              <div className="card overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-cream-50 text-left">
                      <th className="px-6 py-4 text-xs font-semibold text-chocolate-500 uppercase tracking-wider">Order</th>
                      <th className="px-6 py-4 text-xs font-semibold text-chocolate-500 uppercase tracking-wider">Items</th>
                      <th className="px-6 py-4 text-xs font-semibold text-chocolate-500 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-4 text-xs font-semibold text-chocolate-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-semibold text-chocolate-500 uppercase tracking-wider">Update</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream-100">
                    {orders.map((order) => (
                      <tr key={order._id} className="hover:bg-cream-50/50">
                        <td className="px-6 py-4 text-sm text-chocolate-600 font-mono">
                          #{order._id.slice(-6)}
                        </td>
                        <td className="px-6 py-4 text-sm text-chocolate-600">
                          {order.items?.map((item) => item.cakeId?.name || 'Custom').join(', ')}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-chocolate-800">
                          ₹{order.totalPrice}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || 'bg-gray-100 text-gray-700'}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                            className="text-sm border border-cream-200 rounded-lg px-3 py-1.5 bg-white focus:ring-2 focus:ring-rose-500/20"
                          >
                            {['Pending', 'Preparing', 'Out for Delivery', 'Delivered'].map((s) => (
                              <option key={s}>{s}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        )}

        {/* Cakes Tab */}
        {tab === 'cakes' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <button
              onClick={() => { resetForm(); setShowForm(true); }}
              className="btn-primary mb-6 inline-flex items-center gap-2"
            >
              <Plus size={18} /> Add Cake
            </button>

            {/* Form */}
            {showForm && (
              <div className="card p-6 mb-8 space-y-4">
                <h3 className="font-semibold text-chocolate-800">
                  {editingCake ? 'Edit Cake' : 'Add New Cake'}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input placeholder="Cake Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
                  <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field" />
                  <input placeholder="Medium Price" type="number" value={form.mediumPrice} onChange={(e) => setForm({ ...form, mediumPrice: e.target.value })} className="input-field" />
                  <input placeholder="Large Price" type="number" value={form.largePrice} onChange={(e) => setForm({ ...form, largePrice: e.target.value })} className="input-field" />
                  <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="input-field sm:col-span-2" />
                  <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="input-field sm:col-span-2 resize-none" />
                </div>
                <div className="flex gap-3">
                  <button onClick={handleSubmitCake} className="btn-primary">
                    {editingCake ? 'Save Changes' : 'Add Cake'}
                  </button>
                  <button onClick={resetForm} className="btn-outline">Cancel</button>
                </div>
              </div>
            )}

            {/* Cake Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cakes.map((cake) => (
                <div key={cake._id} className="card overflow-hidden">
                  <img src={cake.image} alt={cake.name} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h4 className="font-semibold text-chocolate-800">{cake.name}</h4>
                    <p className="text-sm text-chocolate-400 mt-1">M: ₹{cake.price.medium} · L: ₹{cake.price.large}</p>
                    <div className="flex gap-2 mt-4">
                      <button onClick={() => startEdit(cake)} className="flex-1 py-2 text-sm font-medium bg-cream-100 hover:bg-cream-200 rounded-lg transition-colors flex items-center justify-center gap-1">
                        <Pencil size={14} /> Edit
                      </button>
                      <button onClick={() => deleteCake(cake._id)} className="flex-1 py-2 text-sm font-medium text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors flex items-center justify-center gap-1">
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {tab === 'analytics' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <div className="card p-6">
                <p className="text-sm text-chocolate-400 mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-chocolate-800">₹{revenue.toLocaleString()}</p>
              </div>
              <div className="card p-6">
                <p className="text-sm text-chocolate-400 mb-1">Total Orders</p>
                <p className="text-3xl font-bold text-chocolate-800">{orders.length}</p>
              </div>
              <div className="card p-6">
                <p className="text-sm text-chocolate-400 mb-1">Cakes Available</p>
                <p className="text-3xl font-bold text-chocolate-800">{cakes.length}</p>
              </div>
            </div>
            <p className="text-chocolate-400 text-sm text-center">
              📊 Detailed analytics charts are available with the Recharts integration
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
