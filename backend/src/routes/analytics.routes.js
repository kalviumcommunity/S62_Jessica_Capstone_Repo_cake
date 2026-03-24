const express = require("express");

const router = express.Router();

const analyticsController = require("../controllers/analytics.controller");

const { protect } = require("../middlewares/auth.middleware");


router.get("/revenue", protect, analyticsController.totalRevenue);

router.get("/popular-flavors", protect, analyticsController.popularFlavors);

router.get("/orders-per-day", protect, analyticsController.ordersPerDay);


module.exports = router;