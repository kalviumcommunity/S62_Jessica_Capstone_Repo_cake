import React, { useState } from "react";
import axios from "axios";
import Cake3D from "../components/CakeScene";

function CakeDesigner({ onBack, onAddToCart }) {

  const [flavor, setFlavor] = useState("chocolate");
  const [frosting, setFrosting] = useState("vanilla buttercream");
  const [toppings, setToppings] = useState("strawberries");
  const [theme, setTheme] = useState("birthday");

  const [aiImage, setAiImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateCake = async () => {

    setLoading(true);

    const prompt = `
    professional bakery photo of a ${flavor} ${theme} cake 
    with ${frosting} frosting and ${toppings} toppings,
    ultra realistic, studio lighting
    `;

    try {

      const res = await axios.post(
        "http://localhost:5001/generate-image",
        { prompt }
      );

      setAiImage(res.data.image);

    } catch (error) {

      console.error("AI generation failed:", error);

    }

    setLoading(false);

  };

  const addCustomCake = () => {

    const customCake = {
      _id: Date.now(), // temporary id
      name: `${flavor} ${theme} cake`,
      image: aiImage,
      price: 850,
      quantity: 1
    };

    onAddToCart(customCake);

    alert("Custom cake added to cart!");

  };

  return (

    <div className="designer-page">

      <button className="designer-back" onClick={onBack}>
        ← Back
      </button>

      <div className="designer-card">

        <h2 className="designer-title">✨ Design Your Dream Cake</h2>

        <div className="designer-layout">

          {/* LEFT SIDE — CONTROLS */}

          <div className="designer-controls">

            <div className="designer-field">
              <label>Flavor</label>
              <select value={flavor} onChange={(e)=>setFlavor(e.target.value)}>
                <option>chocolate</option>
                <option>vanilla</option>
                <option>red velvet</option>
                <option>strawberry</option>
              </select>
            </div>

            <div className="designer-field">
              <label>Frosting</label>
              <select value={frosting} onChange={(e)=>setFrosting(e.target.value)}>
                <option>vanilla buttercream</option>
                <option>chocolate ganache</option>
                <option>cream cheese frosting</option>
                <option>pink buttercream</option>
              </select>
            </div>

            <div className="designer-field">
              <label>Toppings</label>
              <select value={toppings} onChange={(e)=>setToppings(e.target.value)}>
                <option>strawberries</option>
                <option>sprinkles</option>
                <option>macarons</option>
                <option>chocolate chips</option>
              </select>
            </div>

            <div className="designer-field">
              <label>Theme</label>
              <select value={theme} onChange={(e)=>setTheme(e.target.value)}>
                <option>birthday</option>
                <option>wedding</option>
                <option>kids party</option>
                <option>minimalist</option>
              </select>
            </div>

            <button
              className="generate-btn"
              onClick={generateCake}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Cake ✨"}
            </button>

          </div>


          {/* RIGHT SIDE — PREVIEW */}

          <div className="designer-preview">

  <h3>Cake Preview</h3>

  {loading && (
    <p className="ai-loading">
      AI is baking your cake... 🍰
    </p>
  )}

  {aiImage && (
    <>
      <img
        src={aiImage}
        alt="AI Cake"
        className="ai-preview-image"
      />

      <button
        className="add-custom-cake"
        onClick={addCustomCake}
      >
        Add This Cake to Cart 🛒
      </button>
    </>
  )}

</div>
          </div>

        </div>

      </div>

  );

}

export default CakeDesigner;