const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // 🔍 DEBUG: check if env is loaded
    console.log("=== ENV DEBUG START ===");
    console.log("MONGODB_URI:", process.env.MONGODB_URI);
    console.log("=== ENV DEBUG END ===");

    // ❌ Stop immediately if missing
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is UNDEFINED ❌");
    }

    // ✅ Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ DB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;