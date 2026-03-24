import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Layers, Paintbrush, Cherry, ShoppingCart, Undo2,
  ArrowLeft, Camera, Trash2,
} from 'lucide-react';
import CakeScene from '../components/three/CakeScene';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const FLAVORS = [
  { id: 'chocolate', label: 'Chocolate', color: '#5c3d26', emoji: '🍫' },
  { id: 'vanilla', label: 'Vanilla', color: '#f5e6c8', emoji: '🍦' },
  { id: 'strawberry', label: 'Strawberry', color: '#f8a4b8', emoji: '🍓' },
  { id: 'red velvet', label: 'Red Velvet', color: '#8b2232', emoji: '❤️' },
];

const TOPPINGS = [
  { id: 'strawberry', label: 'Strawberry', emoji: '🍓' },
  { id: 'chocolate', label: 'Chocolate', emoji: '🍫' },
  { id: 'candle', label: 'Candle', emoji: '🕯️' },
  { id: 'candy', label: 'Candy', emoji: '🍬' },
];

const FROSTING_PRESETS = [
  '#ffb6c1', '#f8e4d0', '#8b5e3c', '#ffffff',
  '#c084fc', '#f87171', '#34d399', '#fbbf24',
];

export default function CakeCustomizer() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [layers, setLayers] = useState([{ flavor: 'chocolate' }]);
  const [frostingColor, setFrostingColor] = useState('#ffb6c1');
  const [sideFrosting, setSideFrosting] = useState(false);
  const [toppings, setToppings] = useState([]);
  const [selectedTopping, setSelectedTopping] = useState(null);

  const addLayer = () => {
    if (layers.length >= 4) {
      toast.error('Maximum 4 layers');
      return;
    }
    setLayers([...layers, { flavor: 'chocolate' }]);
  };

  const removeLayer = (index) => {
    if (layers.length <= 1) return;
    setLayers(layers.filter((_, i) => i !== index));
  };

  const updateFlavor = (index, flavor) => {
    setLayers(layers.map((l, i) => i === index ? { ...l, flavor } : l));
  };

  const undoTopping = () => setToppings(toppings.slice(0, -1));
  const clearToppings = () => setToppings([]);

  const price = 500 + layers.length * 150 + toppings.length * 40 + (sideFrosting ? 100 : 0);

  const handleAddToCart = () => {
    addToCart({
      _id: `custom-${Date.now()}`,
      name: `Custom ${layers.length}-Layer Cake`,
      price: { medium: price },
      isCustom: true,
      customData: { layers, frostingColor, sideFrosting, toppings },
    });
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col lg:flex-row">

      {/* ── Left: Controls Panel ── */}
      <div className="w-full lg:w-[380px] bg-white border-r border-cream-200 overflow-y-auto lg:h-[calc(100vh-80px)] lg:sticky lg:top-20">
        <div className="p-6 space-y-8">

          {/* Header */}
          <div>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1.5 text-sm text-chocolate-400 hover:text-rose-600 transition-colors mb-4"
            >
              <ArrowLeft size={14} /> Back
            </button>
            <h1 className="font-display text-2xl font-bold text-chocolate-800">3D Cake Designer</h1>
            <p className="text-sm text-chocolate-400 mt-1">Click on the cake to place toppings</p>
          </div>

          {/* ── Layers ── */}
          <section>
            <h3 className="flex items-center gap-2 font-semibold text-chocolate-700 text-sm uppercase tracking-wider mb-4">
              <Layers size={16} /> Layers ({layers.length}/4)
            </h3>
            <div className="space-y-2">
              {layers.map((layer, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-xs text-chocolate-400 w-5">{index + 1}.</span>
                  <div className="flex-1 grid grid-cols-4 gap-1.5">
                    {FLAVORS.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => updateFlavor(index, f.id)}
                        className={`px-2 py-2 rounded-lg text-[11px] font-medium text-center transition-all ${
                          layer.flavor === f.id
                            ? 'ring-2 ring-rose-500 bg-rose-50 text-rose-700'
                            : 'bg-cream-50 text-chocolate-500 hover:bg-cream-100'
                        }`}
                      >
                        <span className="text-base block mb-0.5">{f.emoji}</span>
                        {f.label}
                      </button>
                    ))}
                  </div>
                  {layers.length > 1 && (
                    <button
                      onClick={() => removeLayer(index)}
                      className="p-1.5 text-chocolate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={addLayer}
              disabled={layers.length >= 4}
              className="mt-3 w-full py-2.5 text-sm font-medium bg-chocolate-800 text-white rounded-xl hover:bg-chocolate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              + Add Layer
            </button>
          </section>

          {/* ── Frosting ── */}
          <section>
            <h3 className="flex items-center gap-2 font-semibold text-chocolate-700 text-sm uppercase tracking-wider mb-4">
              <Paintbrush size={16} /> Frosting
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {FROSTING_PRESETS.map((color) => (
                <button
                  key={color}
                  onClick={() => setFrostingColor(color)}
                  className={`w-9 h-9 rounded-xl transition-all ${
                    frostingColor === color ? 'ring-2 ring-rose-500 ring-offset-2 scale-110' : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: color, border: '1px solid rgba(0,0,0,0.1)' }}
                />
              ))}
              <label className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 via-green-500 to-blue-500 cursor-pointer overflow-hidden relative hover:scale-105 transition-transform">
                <input
                  type="color"
                  value={frostingColor}
                  onChange={(e) => setFrostingColor(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </label>
            </div>
            <label className="flex items-center gap-3 p-3 bg-cream-50 rounded-xl cursor-pointer hover:bg-cream-100 transition-colors">
              <input
                type="checkbox"
                checked={sideFrosting}
                onChange={(e) => setSideFrosting(e.target.checked)}
                className="w-4 h-4 rounded accent-rose-500"
              />
              <span className="text-sm text-chocolate-600">Side frosting (+₹100)</span>
            </label>
          </section>

          {/* ── Toppings ── */}
          <section>
            <h3 className="flex items-center gap-2 font-semibold text-chocolate-700 text-sm uppercase tracking-wider mb-4">
              <Cherry size={16} /> Toppings
            </h3>
            <p className="text-xs text-chocolate-400 mb-3">Select a topping, then click on the cake to place it</p>
            <div className="grid grid-cols-2 gap-2">
              {TOPPINGS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTopping(selectedTopping === t.id ? null : t.id)}
                  className={`flex items-center gap-2 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                    selectedTopping === t.id
                      ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25'
                      : 'bg-cream-50 text-chocolate-600 hover:bg-cream-100'
                  }`}
                >
                  <span className="text-lg">{t.emoji}</span>
                  {t.label}
                </button>
              ))}
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={undoTopping}
                disabled={toppings.length === 0}
                className="flex-1 py-2 text-sm bg-cream-100 hover:bg-cream-200 rounded-xl disabled:opacity-40 transition-colors flex items-center justify-center gap-1"
              >
                <Undo2 size={14} /> Undo
              </button>
              <button
                onClick={clearToppings}
                disabled={toppings.length === 0}
                className="flex-1 py-2 text-sm bg-cream-100 hover:bg-cream-200 rounded-xl disabled:opacity-40 transition-colors flex items-center justify-center gap-1"
              >
                <Trash2 size={14} /> Clear All
              </button>
            </div>
          </section>

          {/* ── Price & Checkout ── */}
          <section className="border-t border-cream-200 pt-6">
            <div className="bg-gradient-to-r from-cream-100 to-rose-50 p-4 rounded-xl mb-4">
              <p className="text-xs text-chocolate-400 mb-1">Estimated Price</p>
              <p className="text-3xl font-bold text-chocolate-800">₹{price}</p>
              <p className="text-xs text-chocolate-400 mt-1">
                {layers.length} layer{layers.length > 1 ? 's' : ''} · {toppings.length} topping{toppings.length !== 1 ? 's' : ''}
              </p>
            </div>
            <button
              onClick={handleAddToCart}
              className="btn-primary w-full !py-3.5 text-base flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} /> Add to Cart
            </button>
          </section>

        </div>
      </div>

      {/* ── Right: 3D Scene ── */}
      <div className="flex-1 h-[60vh] lg:h-[calc(100vh-80px)] lg:sticky lg:top-20">
        <CakeScene
          layers={layers}
          frostingColor={frostingColor}
          sideFrosting={sideFrosting}
          toppings={toppings}
          setToppings={setToppings}
          selectedTopping={selectedTopping}
        />
        {selectedTopping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-chocolate-800/90 backdrop-blur text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-xl"
          >
            Click on the cake to place {selectedTopping}
          </motion.div>
        )}
      </div>

    </div>
  );
}
