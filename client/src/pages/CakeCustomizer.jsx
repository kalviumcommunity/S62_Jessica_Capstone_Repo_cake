import { useState } from "react";
import CakeScene from "../components/CakeScene";
import { Layers, Paintbrush, Cherry, ShoppingCart } from "lucide-react";

export default function CakeCustomizer({ onBack, onAddToCart }) {

  const [frostingColor, setFrostingColor] = useState("#ffb6c1");

  const [layers, setLayers] = useState([
    { flavor: "chocolate" }
  ]);

  const [sideFrosting, setSideFrosting] = useState(false);

  const [toppings, setToppings] = useState([]);

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

  const addStrawberry = () => {
    setToppings([...toppings, { type: "strawberry" }]);
  };

  const addChocolate = () => {
    setToppings([...toppings, { type: "chocolate" }]);
  };

  const addCandle = () => {
    setToppings([...toppings, { type: "candle" }]);
  };

  const addCandy = () => {
    setToppings([...toppings, { type: "candy" }]);
  };

  const undoTopping = () => {
    setToppings(toppings.slice(0, -1));
  };

  const [selectedTopping, setSelectedTopping] = useState(null);

  const price = 500 + layers.length * 150 + toppings.length * 40;

  return (
    <div className="flex h-screen bg-[#f6e8ea]">

      {/* LEFT PANEL */}

      <div className="w-[340px] p-6 bg-white shadow-xl overflow-y-auto">

        <button
          className="mb-6 bg-gray-800 text-white px-4 py-2 rounded"
          onClick={onBack}
        >
          ← Back
        </button>

        <h2 className="text-2xl font-bold mb-6">
          Customize Your Cake
        </h2>

        {/* Layers */}

        <div className="mb-8">

          <h3 className="flex items-center gap-2 font-semibold text-lg mb-3">
            <Layers size={18} />
            Layers
          </h3>

          {layers.map((layer, index) => (

            <div key={index} className="flex items-center gap-2 mb-2">

              <select
                className="flex-1 border rounded p-2"
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
                  className="bg-pink-500 text-white px-2 py-1 rounded"
                >
                  ✕
                </button>
              )}

            </div>

          ))}

          <button
            onClick={addLayer}
            className="mt-2 bg-black text-white w-full py-2 rounded"
          >
            + Add Layer
          </button>

        </div>

        {/* Frosting */}

        <div className="mb-8">

          <h3 className="flex items-center gap-2 font-semibold text-lg mb-3">
            <Paintbrush size={18} />
            Frosting
          </h3>

          <div className="flex items-center gap-3 mb-3">

            <input
              type="color"
              value={frostingColor}
              onChange={(e) => setFrostingColor(e.target.value)}
            />

            <span className="text-sm">
              Frosting Color
            </span>

          </div>

          <label className="flex items-center gap-2 text-sm">

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

        <div className="grid grid-cols-2 gap-3">

  <button
    onClick={() => setSelectedTopping("strawberry")}
    className="flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 p-3 rounded-lg"
  >
    🍓
    <span className="text-sm mt-1">Strawberry</span>
  </button>

  <button
    onClick={() => setSelectedTopping("chocolate")}
    className="flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 p-3 rounded-lg"
  >
    🍫
    <span className="text-sm mt-1">Chocolate</span>
  </button>

  <button
    onClick={() => setSelectedTopping("candle")}
    className="flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 p-3 rounded-lg"
  >
    🕯
    <span className="text-sm mt-1">Candle</span>
  </button>

  <button
    onClick={() => setSelectedTopping("candy")}
    className="flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 p-3 rounded-lg"
  >
    🍬
    <span className="text-sm mt-1">Candy</span>
  </button>

</div>

<button
  onClick={undoTopping}
  className="mt-3 bg-gray-200 hover:bg-gray-300 w-full py-2 rounded"
>
  Undo Last Topping
</button>

        {/* Price */}

        <div className="bg-gray-100 p-4 rounded-lg mb-4">

          <p className="text-sm text-gray-600">
            Estimated Price
          </p>

          <p className="text-2xl font-bold">
            ₹{price}
          </p>

        </div>

        {/* Add to Cart */}

        <button
          className="flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white w-full py-3 rounded text-lg font-semibold"
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
          Add Custom Cake to Cart
        </button>

      </div>

      {/* 3D Scene */}

      <div className="flex-1 h-[calc(100vh-80px)]">

        <CakeScene
          layers={layers}
          frostingColor={frostingColor}
          sideFrosting={sideFrosting}
          toppings={toppings}
          setToppings={setToppings}
          selectedTopping={selectedTopping}
        />

      </div>

    </div>
  );
}