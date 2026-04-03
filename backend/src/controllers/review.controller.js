const Review = require("../models/review.model");

const getReviews = async (req, res) => {

  try {

    const reviews = await Review.find();

    res.json(reviews);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};

const getCakeReviews = async (req, res) => {

  try {

    const reviews = await Review.find({
      cakeId: req.params.cakeId
    });

    res.json(reviews);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};

const createReview = async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body); // 👈 ADD THIS

    const review = await Review.create(req.body);

    console.log("SAVED:", review); // 👈 ADD THIS

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getReviews,
  getCakeReviews,
  createReview
};