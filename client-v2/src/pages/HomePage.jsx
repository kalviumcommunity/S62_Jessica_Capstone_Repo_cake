import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Star, Box, Palette } from 'lucide-react';
import api from '../services/api';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream-50 via-rose-50/30 to-cream-100" />
      <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-rose-200/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-pink-200/15 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <motion.div initial="hidden" animate="visible" className="max-w-xl">
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-100 text-rose-600 text-sm font-medium rounded-full mb-8">
              <Sparkles size={14} />
              Now with 3D Cake Designer & AI
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1} className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-chocolate-900 leading-[1.1] mb-6">
              Delight in{' '}
              <span className="text-gradient">Every Bite</span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="text-lg text-chocolate-500 leading-relaxed mb-10 max-w-md">
              Design your dream cake in 3D, customize every detail, and have it
              freshly baked and delivered to your doorstep.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
              <Link to="/gallery" className="btn-primary inline-flex items-center gap-2 !text-base">
                Order Now <ArrowRight size={18} />
              </Link>
              <Link to="/customize" className="btn-outline inline-flex items-center gap-2 !text-base">
                <Box size={18} /> 3D Designer
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} custom={4} className="flex gap-10 mt-14">
              {[
                { value: '2k+', label: 'Happy Customers' },
                { value: '50+', label: 'Cake Varieties' },
                { value: '4.9', label: 'Avg Rating' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-chocolate-800">{stat.value}</p>
                  <p className="text-xs text-chocolate-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              <div className="w-[420px] h-[420px] rounded-full bg-gradient-to-br from-rose-200 via-pink-100 to-cream-200 flex items-center justify-center animate-pulse-glow">
                <div className="text-[200px] animate-float">🎂</div>
              </div>
              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-8 -left-4 bg-white rounded-2xl px-4 py-3 shadow-xl shadow-black/5 flex items-center gap-2"
              >
                <Palette size={18} className="text-rose-500" />
                <span className="text-sm font-medium text-chocolate-700">Custom Colors</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute bottom-12 -right-6 bg-white rounded-2xl px-4 py-3 shadow-xl shadow-black/5 flex items-center gap-2"
              >
                <Sparkles size={18} className="text-amber-500" />
                <span className="text-sm font-medium text-chocolate-700">AI Powered</span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: <Box size={24} />,
      title: '3D Cake Designer',
      desc: 'Build your cake layer by layer in interactive 3D. Choose flavors, frosting colors, and place toppings with a click.',
      link: '/customize',
    },
    {
      icon: <Sparkles size={24} />,
      title: 'AI Cake Generator',
      desc: 'Describe your dream cake and watch AI create a stunning visual preview. Turn imagination into reality.',
      link: '/ai-designer',
    },
    {
      icon: <Palette size={24} />,
      title: 'Custom Everything',
      desc: 'From flavor to frosting, toppings to themes — every detail is yours to customize. Max 4 layers, unlimited creativity.',
      link: '/customize',
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeUp} className="section-title">Why Jesmer?</motion.h2>
          <motion.p variants={fadeUp} custom={1} className="section-subtitle mx-auto">
            Not just a bakery — a complete cake experience
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} custom={i}
            >
              <Link to={f.link} className="card block p-8 h-full group">
                <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mb-6 group-hover:bg-rose-500 group-hover:text-white transition-colors duration-300">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-chocolate-800 mb-3">{f.title}</h3>
                <p className="text-chocolate-400 text-sm leading-relaxed">{f.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api.get('/api/reviews')
      .then((res) => setReviews(res.data.slice(0, 6)))
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeUp} className="section-title">What Our Customers Say</motion.h2>
          <motion.p variants={fadeUp} custom={1} className="section-subtitle mx-auto">
            Real reviews from real cake lovers
          </motion.p>
        </motion.div>

        {reviews.length === 0 ? (
          <p className="text-center text-chocolate-400">No reviews yet. Be the first to leave one!</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={review._id}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i * 0.5}
                className="card p-6"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      size={16}
                      className={j < review.rating ? 'fill-amber-400 text-amber-400' : 'text-cream-300'}
                    />
                  ))}
                </div>
                <p className="text-sm text-chocolate-600 leading-relaxed mb-4">
                  "{review.comment}"
                </p>
                <p className="text-sm font-semibold text-chocolate-800">{review.name}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-chocolate-800 via-chocolate-700 to-chocolate-900 p-12 md:p-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-rose-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-pink-500/10 blur-3xl" />

          <div className="relative text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Design Your Dream Cake?
            </h2>
            <p className="text-cream-300/80 text-lg mb-10">
              Try our 3D cake designer — build, customize, and order in minutes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/customize" className="btn-primary !bg-rose-500 !text-base inline-flex items-center gap-2">
                Start Designing <ArrowRight size={18} />
              </Link>
              <Link to="/gallery" className="px-6 py-3 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
                Browse Cakes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ReviewsSection />
      <CTASection />
    </>
  );
}
