import { Link } from 'react-router-dom';
import { ChefHat, Instagram, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-chocolate-800 text-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
                <ChefHat size={20} className="text-white" />
              </div>
              <span className="font-display text-2xl font-bold text-white">Jesmer</span>
            </div>
            <p className="text-cream-300/70 text-sm leading-relaxed">
              Crafting dream cakes with love, creativity, and a sprinkle of magic. Design your perfect cake in 3D.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Explore</h4>
            <ul className="space-y-3">
              {[
                { to: '/gallery', label: 'Our Cakes' },
                { to: '/customize', label: '3D Designer' },
                { to: '/ai-designer', label: 'AI Cake Designer' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-cream-300/70 hover:text-rose-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-3">
              {['FAQ', 'Delivery Info', 'Returns', 'Contact Us'].map((item) => (
                <li key={item}>
                  <span className="text-sm text-cream-300/70 hover:text-rose-400 transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Connect</h4>
            <div className="flex gap-3">
              {[Instagram, Twitter, Mail].map((Icon, i) => (
                <button
                  key={i}
                  className="w-10 h-10 rounded-xl bg-chocolate-700 hover:bg-rose-500 flex items-center justify-center transition-colors"
                >
                  <Icon size={18} className="text-cream-200" />
                </button>
              ))}
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-chocolate-700/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream-300/50">
            © {new Date().getFullYear()} Jesmer Cakes. All rights reserved.
          </p>
          <p className="text-xs text-cream-300/50">
            Built with 🎂 by Jessica
          </p>
        </div>
      </div>
    </footer>
  );
}
