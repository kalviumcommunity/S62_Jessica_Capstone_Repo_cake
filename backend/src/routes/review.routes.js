const express = require("express");
const router = express.Router();

const {
  getReviews,
  getCakeReviews,
  createReview
} = require("../controllers/review.controller");

router.get("/", getReviews);

router.get("/:cakeId", getCakeReviews);

router.post("/", createReview);

module.exports = router;