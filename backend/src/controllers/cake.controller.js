const Cake = require("../models/cake.model.js");

console.log("Cake import:", Cake);

// GET ALL CAKES
const getAllCakes = async (req, res) => {
  try {
    const cakes = await Cake.find();
    res.json(cakes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE CAKE
const createCake = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;

    const cake = await Cake.create({
      name,
      description,
      price,
      image,
      category
    });

    res.status(201).json(cake);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE CAKE
const updateCake = async (req, res) => {
  try {

    const cake = await Cake.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }   // FIXED
    );

    res.json(cake);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE CAKE
const deleteCake = async (req, res) => {
  try {

    await Cake.findByIdAndDelete(req.params.id); // FIXED

    res.json({ message: "Cake deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCakes,
  createCake,
  updateCake,
  deleteCake
};