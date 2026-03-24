import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import api from '../services/api';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function CakeGallery() {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    api.get('/api/cakes')
      .then((res) => setCakes(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...new Set(cakes.map((c) => c.category).filter(Boolean))];

  const filtered = cakes.filter((cake) => {
    const matchSearch = cake.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || cake.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-gradient-to-b from-cream-100 to-cream-50 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="section-title text-center"
          >
            Our Cakes
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-subtitle text-center mx-auto"
          >
            Freshly baked with love — find your perfect cake
          </motion.p>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4 max-w-2xl mx-auto"
          >
            <div className="relative flex-1 w-full">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-chocolate-300" />
              <input
                type="text"
                placeholder="Search cakes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field !pl-11"
              />
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    category === cat
                      ? 'bg-chocolate-800 text-white shadow-lg shadow-chocolate-800/20'
                      : 'bg-white text-chocolate-600 hover:bg-cream-100 border border-cream-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                <div className="h-56 bg-cream-200" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-cream-200 rounded w-3/4" />
                  <div className="h-4 bg-cream-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🧁</p>
            <p className="text-chocolate-500 text-lg">No cakes found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((cake, i) => (
              <motion.div
                key={cake._id}
                initial="hidden" animate="visible"
                variants={fadeUp} custom={i}
              >
                <Link to={`/cake/${cake._id}`} className="card block overflow-hidden group">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={cake.image}
                      alt={cake.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {cake.category && (
                      <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-chocolate-700 rounded-full">
                        {cake.category}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-chocolate-800 group-hover:text-rose-600 transition-colors">
                      {cake.name}
                    </h3>
                    <p className="text-rose-500 font-bold mt-2">
                      ₹{cake.price?.medium}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
