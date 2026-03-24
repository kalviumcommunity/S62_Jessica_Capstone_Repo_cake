import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ChefHat } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      navigate(user.role === 'admin' ? '/admin' : '/');
    } catch {
      // error handled by AuthContext
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-cream-50 via-rose-50/30 to-cream-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        <div className="card p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-500/25">
              <ChefHat size={24} className="text-white" />
            </div>
            <h1 className="font-display text-3xl font-bold text-chocolate-800">Welcome Back</h1>
            <p className="text-sm text-chocolate-400 mt-2">Log in to your Jesmer account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-chocolate-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-chocolate-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="input-field !pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-chocolate-400 hover:text-chocolate-600"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full !py-3.5 disabled:opacity-60"
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <p className="text-center text-sm text-chocolate-400 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-rose-500 font-semibold hover:text-rose-600">Sign up</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
