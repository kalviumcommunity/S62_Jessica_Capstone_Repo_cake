const express = require("express");
const cors = require("cors");

const cakeRoutes = require("./routes/cake.routes");
const authRoutes = require("./routes/auth.routes");
const orderRoutes = require("./routes/order.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const reviewRoutes = require("./routes/review.routes");
const generateImageRoute = require('./routes/generateImage');

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://s62-jessica-capstone-repo-cake.vercel.app"
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/cakes", cakeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/generate-image", generateImageRoute);

module.exports = app;