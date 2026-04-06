import { useState } from "react";
import CakeScene from "../components/CakeScene";
import { Layers, Paintbrush, ShoppingCart } from "lucide-react";

export default function CakeCustomizer({ onBack, onAddToCart }) {

  const [frostingColor, setFrostingColor] = useState("#ffb6c1");
  const [layers, setLayers] = useState([{ flavor: "chocolate" }]);
  const [sideFrosting, setSideFrosting] = useState(false);
  const [toppings, setToppings] = useState([]);
  const [selectedTopping, setSelectedTopping] = useState(null);

  const addLayer = () => {
    if (layers.length < 4) {
      setLayers([...layers, { flavor: "chocolate" }]);
    }
  };

  const removeLayer = (index) => {
    if (layers.length === 1) return;
    setLayers(layers.filter((_, i) => i !== index));
  };

  const updateLayerFlavor = (index, flavor) => {
    const updated = [...layers];
    updated[index].flavor = flavor;
    setLayers(updated);
  };

  const undoTopping = () => {
    setToppings(toppings.slice(0, -1));
  };

  const price = 500 + layers.length * 150 + toppings.length * 40;

  return (
    <div className="fixed inset-0 bg-[#f6e8ea] flex justify-center items-center z-50">

      <div className="flex w-[1200px] h-[85vh] bg-white rounded-3xl overflow-hidden shadow-2xl">

        {/* LEFT PANEL */}
        <div className="w-[360px] flex-shrink-0 p-6 customizer-panel overflow-y-auto flex flex-col justify-between">

          <div>

            <button
              className="mb-6 designer-back px-4 py-2 text-white bg-black rounded-lg"
              onClick={onBack}
            >
              ← Back
            </button>

            <h2 className="text-3xl font-bold mb-6 text-[#2b2b2b]">
              Customize Your Cake
            </h2>

            {/* Layers */}
            <div className="mb-8">
              <h3 className="flex items-center gap-2 section-title text-[#3a2a2a]">
                <Layers size={18} />
                Layers
              </h3>

              {layers.map((layer, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <select
                    className="flex-1 border rounded-lg p-2"
                    value={layer.flavor}
                    onChange={(e) =>
                      updateLayerFlavor(index, e.target.value)
                    }
                  >
                    <option value="chocolate">Chocolate</option>
                    <option value="vanilla">Vanilla</option>
                    <option value="strawberry">Strawberry</option>
                  </select>

                  {layers.length > 1 && (
                    <button
                      onClick={() => removeLayer(index)}
                      className="bg-pink-500 text-white px-2 py-1 rounded-lg"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}

              <button
                onClick={addLayer}
                className="mt-3 layer-btn w-full py-2 rounded-lg text-white"
              >
                + Add Layer
              </button>
            </div>

            {/* Frosting */}
            <div className="mb-8">
              <h3 className="flex items-center gap-2 section-title text-[#3a2a2a]">
                <Paintbrush size={18} />
                Frosting
              </h3>

              <div className="flex items-center gap-3 mb-3">
                <input
                  type="color"
                  value={frostingColor}
                  onChange={(e) => setFrostingColor(e.target.value)}
                  className="w-10 h-10 border rounded"
                />
                <span className="text-sm font-medium text-[#444]">
                  Frosting Color
                </span>
              </div>

              <label className="flex items-center gap-2 text-sm text-[#444]">
                <input
                  type="checkbox"
                  checked={sideFrosting}
                  onChange={(e) =>
                    setSideFrosting(e.target.checked)
                  }
                />
                Add side frosting
              </label>
            </div>

            {/* Toppings */}
            <div className="mb-6">
              <h3 className="section-title text-[#3a2a2a]">Toppings</h3>

              <div className="toppings-grid">
                {[
                  { type: "strawberry", icon: "🍓" },
                  { type: "chocolate", icon: "🍫" },
                  { type: "candle", icon: "🕯" },
                  { type: "candy", icon: "🍬" },
                ].map((item) => (
                  <button
                    key={item.type}
                    onClick={() => {
                    setToppings((prev) => [
                      ...prev,
                  {
                    id: Date.now(),
                    type: item.type
                  }
          ]); 
        }}
                    className={`topping-btn flex flex-col items-center justify-center p-4 ${
                      selectedTopping === item.type ? "bg-pink-100" : ""
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm mt-1 capitalize">
                      {item.type}
                    </span>
                  </button>
                ))}
              </div>

              <button
                onClick={undoTopping}
                className="mt-3 bg-gray-200 hover:bg-gray-300 w-full py-2 rounded-lg"
              >
                Undo Last Topping
              </button>
            </div>

          </div>

          {/* Bottom */}
          <div>
            <div className="price-highlight mb-4 flex justify-between items-center">
              <span className="text-[#555] font-medium">
                Estimated Price
              </span>
              <span className="text-xl font-bold text-[#2b2b2b]">
                ₹{price}
              </span>
            </div>

            <button
              className="add-cart-btn flex items-center justify-center gap-2 text-white w-full py-3 text-lg font-semibold"
              onClick={() =>
                onAddToCart({
                  name: "Custom Cake",
                  layers,
                  frostingColor,
                  toppings
                })
              }
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-white to-pink-50">

          <div
            className="preview-3d scale-110"
            style={{
              cursor: selectedTopping ? "crosshair" : "default"
            }}
          >
            <CakeScene
              layers={layers}
              frostingColor={frostingColor}
              sideFrosting={sideFrosting}
              toppings={toppings}
              setToppings={setToppings}
              selectedTopping={selectedTopping}
              setSelectedTopping={setSelectedTopping}
            />
          </div>

        </div>

      </div>
    </div>
  );
}