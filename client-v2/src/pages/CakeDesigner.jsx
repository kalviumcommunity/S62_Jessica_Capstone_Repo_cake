import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ShoppingCart, ArrowLeft, Loader2, Wand2 } from 'lucide-react';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const FLAVORS = ['Chocolate', 'Vanilla', 'Red Velvet', 'Strawberry'];
const FROSTINGS = ['Vanilla Buttercream', 'Chocolate Ganache', 'Cream Cheese', 'Pink Buttercream'];
const TOPPING_OPTIONS = ['Strawberries', 'Sprinkles', 'Macarons', 'Chocolate Chips'];
const THEMES = ['Birthday', 'Wedding', 'Kids Party', 'Minimalist', 'Elegant', 'Rustic'];

export default function CakeDesigner() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [flavor, setFlavor] = useState('Chocolate');
  const [frosting, setFrosting] = useState('Vanilla Buttercream');
  const [topping, setTopping] = useState('Strawberries');
  const [theme, setTheme] = useState('Birthday');
  const [customPrompt, setCustomPrompt] = useState('');

  const [aiImage, setAiImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateCake = async () => {
    setLoading(true);
    setAiImage(null);

    const prompt = customPrompt.trim() || `professional bakery photo of a ${flavor.toLowerCase()} ${theme.toLowerCase()} cake with ${frosting.toLowerCase()} frosting and ${topping.toLowerCase()} toppings, ultra realistic, studio lighting, centered composition, white background`;

    try {
      const res = await api.post('/generate-image', { prompt });
      setAiImage(res.data.image);
      toast.success('Cake generated! ✨');
    } catch {
      toast.error('AI generation failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      _id: `ai-${Date.now()}`,
      name: `AI ${flavor} ${theme} Cake`,
      image: aiImage,
      price: { medium: 850 },
      isCustom: true,
    });
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm text-chocolate-400 hover:text-rose-600 transition-colors mb-6"
        >
          <ArrowLeft size={14} /> Back
        </button>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-100 text-purple-600 text-sm font-medium rounded-full mb-4">
            <Sparkles size={14} /> Powered by AI
          </div>
          <h1 className="font-display text-4xl font-bold text-chocolate-800">AI Cake Designer</h1>
          <p className="text-chocolate-400 mt-2">Describe your dream cake or select options below</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* ── Left: Controls ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-8 space-y-6"
          >
            {/* Custom prompt */}
            <div>
              <label className="block text-sm font-semibold text-chocolate-700 mb-2">
                ✨ Describe Your Dream Cake (optional)
              </label>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g., A majestic 3-tier unicorn rainbow cake with gold leaf accents and fresh berries..."
                rows={3}
                className="input-field resize-none"
              />
              <p className="text-xs text-chocolate-300 mt-1">Leave empty to auto-generate from options below</p>
            </div>

            <div className="border-t border-cream-200 pt-6">
              <p className="text-xs text-chocolate-400 mb-4 uppercase tracking-wider font-semibold">Or customize with options</p>

              {/* Options grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <SelectField label="Flavor" value={flavor} options={FLAVORS} onChange={setFlavor} />
                <SelectField label="Frosting" value={frosting} options={FROSTINGS} onChange={setFrosting} />
                <SelectField label="Toppings" value={topping} options={TOPPING_OPTIONS} onChange={setTopping} />
                <SelectField label="Theme" value={theme} options={THEMES} onChange={setTheme} />
              </div>
            </div>

            <button
              onClick={generateCake}
              disabled={loading}
              className="btn-primary w-full !py-4 text-base flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 size={20} />
                  Generate Cake
                </>
              )}
            </button>
          </motion.div>

          {/* ── Right: Preview ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="card w-full overflow-hidden">
              {loading ? (
                <div className="h-[400px] flex flex-col items-center justify-center bg-gradient-to-br from-cream-100 to-rose-50">
                  <div className="w-16 h-16 border-4 border-rose-500/20 border-t-rose-500 rounded-full animate-spin mb-6" />
                  <p className="text-chocolate-500 font-medium">AI is baking your cake... 🍰</p>
                  <p className="text-xs text-chocolate-300 mt-1">This may take 10-20 seconds</p>
                </div>
              ) : aiImage ? (
                <div>
                  <img
                    src={aiImage}
                    alt="AI Generated Cake"
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-semibold text-chocolate-800 text-lg">
                        {flavor} {theme} Cake
                      </h3>
                      <p className="text-sm text-chocolate-400 mt-1">
                        {frosting} frosting with {topping.toLowerCase()}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-rose-500">₹850</span>
                      <button
                        onClick={handleAddToCart}
                        className="btn-primary inline-flex items-center gap-2"
                      >
                        <ShoppingCart size={18} /> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-[400px] flex flex-col items-center justify-center bg-gradient-to-br from-cream-100 to-rose-50/50">
                  <Sparkles size={48} className="text-cream-300 mb-4" />
                  <p className="text-chocolate-400 font-medium">Your AI cake will appear here</p>
                  <p className="text-xs text-chocolate-300 mt-1">Configure options and hit Generate</p>
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

function SelectField({ label, value, options, onChange }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-chocolate-600 mb-1.5">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field !py-2.5 text-sm"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
