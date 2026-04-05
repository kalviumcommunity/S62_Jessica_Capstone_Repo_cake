const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }
    
const response = await fetch(
  "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: prompt
    }),
  }
);

    // Handle HF errors (like model loading)
    if (!response.ok) {
      const errorText = await response.text();
      console.error("HF Error:", errorText);
      return res.status(500).json({ error: errorText });
    }

    // Convert image to base64
    const imageBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(imageBuffer).toString("base64");

    res.json({
      image: `data:image/png;base64,${base64}`,
    });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Image generation failed" });
  }
});

module.exports = router;