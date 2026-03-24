import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, User as UserIcon, ShoppingBag, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function UserProfile() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <div className="text-center py-32">
        <p className="text-5xl mb-4">🔒</p>
        <p className="text-chocolate-500 text-lg mb-6">Please log in to view your profile</p>
        <button onClick={() => navigate('/login')} className="btn-primary">Log in</button>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-cream-50">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-8 md:p-10"
        >
          {/* Avatar */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-500/25">
              <span className="text-white text-2xl font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <h1 className="font-display text-2xl font-bold text-chocolate-800">{user.name}</h1>
            <span className="inline-block px-3 py-1 bg-cream-100 text-chocolate-500 text-xs rounded-full mt-2 capitalize">
              {user.role}
            </span>
          </div>

          {/* Info Cards */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-cream-50 rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
                <UserIcon size={18} className="text-rose-500" />
              </div>
              <div>
                <p className="text-xs text-chocolate-400">Full Name</p>
                <p className="font-semibold text-chocolate-800">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-cream-50 rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Mail size={18} className="text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-chocolate-400">Email</p>
                <p className="font-semibold text-chocolate-800">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-cream-50 rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <ShoppingBag size={18} className="text-amber-500" />
              </div>
              <div>
                <p className="text-xs text-chocolate-400">Member Since</p>
                <p className="font-semibold text-chocolate-800">
                  {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => { logout(); navigate('/'); }}
            className="mt-8 w-full py-3 flex items-center justify-center gap-2 text-red-500 font-medium bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
          >
            <LogOut size={18} /> Log out
          </button>
        </motion.div>
      </div>
    </div>
  );
}
