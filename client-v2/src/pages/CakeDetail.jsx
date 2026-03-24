import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function CakeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [cake, setCake] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState('medium');

  // Review form
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get(`/api/cakes`),
      api.get(`/api/reviews/${id}`).catch(() => ({ data: [] })),
    ]).then(([cakeRes, reviewRes]) => {
      const found = cakeRes.data.find((c) => c._id === id);
      setCake(found || null);
      setReviews(reviewRes.data);
    }).finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!cake) return;
    addToCart({
      _id: cake._id,
      name: cake.name,
      image: cake.image,
      price: cake.price,
    });
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    setSubmitting(true);
    try {
      const res = await api.post('/api/reviews', {
        cakeId: id,
        name: reviewName,
        rating: reviewRating,
        comment: reviewComment,
      });
      setReviews([res.data, ...reviews]);
      setReviewName('');
      setReviewRating(5);
      setReviewComment('');
      toast.success('Review submitted!');
    } catch {
      toast.error('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 animate-pulse">
          <div className="h-[500px] bg-cream-200 rounded-3xl" />
          <div className="space-y-4 py-8">
            <div className="h-10 bg-cream-200 rounded w-3/4" />
            <div className="h-5 bg-cream-100 rounded w-full" />
            <div className="h-5 bg-cream-100 rounded w-2/3" />
            <div className="h-12 bg-cream-200 rounded w-1/3 mt-6" />
          </div>
        </div>
      </div>
    );
  }

  if (!cake) {
    return (
      <div className="text-center py-32">
        <p className="text-5xl mb-4">😢</p>
        <p className="text-chocolate-500 text-lg">Cake not found</p>
        <button onClick={() => navigate('/gallery')} className="btn-primary mt-6">
          Back to Gallery
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-chocolate-500 hover:text-rose-600 transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Back
        </button>

        {/* Detail */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/10">
              <img src={cake.image} alt={cake.name} className="w-full h-[500px] object-cover" />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="py-4"
          >
            {cake.category && (
              <span className="inline-block px-3 py-1 bg-rose-100 text-rose-600 text-xs font-medium rounded-full mb-4">
                {cake.category}
              </span>
            )}
            <h1 className="font-display text-4xl font-bold text-chocolate-900 mb-4">{cake.name}</h1>
            <p className="text-chocolate-500 leading-relaxed mb-8">{cake.description}</p>

            {/* Size Select */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-chocolate-700 mb-3">Select Size</p>
              <div className="flex gap-3">
                {['medium', 'large'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-6 py-3 rounded-xl text-sm font-medium capitalize transition-all ${
                      size === s
                        ? 'bg-chocolate-800 text-white shadow-lg'
                        : 'bg-cream-100 text-chocolate-600 hover:bg-cream-200'
                    }`}
                  >
                    {s} — ₹{cake.price[s]}
                  </button>
                ))}
              </div>
            </div>

            {/* Price & Cart */}
            <div className="flex items-center gap-6">
              <span className="text-3xl font-bold text-rose-500">₹{cake.price[size]}</span>
              <button onClick={handleAddToCart} className="btn-primary inline-flex items-center gap-2">
                <ShoppingCart size={18} /> Add to Cart
              </button>
            </div>
          </motion.div>
        </div>

        {/* Reviews */}
        <div className="mt-20">
          <h2 className="font-display text-3xl font-bold text-chocolate-800 mb-10">Customer Reviews</h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-1">
              <form onSubmit={submitReview} className="card p-6 space-y-4 sticky top-28">
                <h3 className="font-semibold text-chocolate-800 text-lg">Leave a Review</h3>
                <input
                  placeholder="Your name"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="input-field"
                />
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                    >
                      <Star
                        size={24}
                        className={`transition-colors ${
                          star <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-cream-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <textarea
                  placeholder="Write your review..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  rows={4}
                  className="input-field resize-none"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </div>

            {/* Reviews list */}
            <div className="lg:col-span-2 space-y-4">
              {reviews.length === 0 ? (
                <p className="text-chocolate-400 text-center py-10">No reviews yet. Be the first!</p>
              ) : (
                reviews.map((review) => (
                  <div key={review._id} className="card p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-chocolate-800">{review.name}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            size={14}
                            className={j < review.rating ? 'fill-amber-400 text-amber-400' : 'text-cream-300'}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-chocolate-500">{review.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
