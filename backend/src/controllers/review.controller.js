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

    const review = await Review.create(req.body);

    res.status(201).json(review);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};

module.exports = {
  getReviews,
  getCakeReviews,
  createReview
};