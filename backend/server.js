process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db.config");

const PORT = process.env.PORT || 5001;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});