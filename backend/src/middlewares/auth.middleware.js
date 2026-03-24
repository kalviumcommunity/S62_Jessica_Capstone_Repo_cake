const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protect = async (req, res, next) => {

console.log("Auth middleware running");

try {

const authHeader = req.headers.authorization;

if (!authHeader || !authHeader.startsWith("Bearer ")) {
return res.status(401).json({ message: "Not authorized, no token" });
}

const token = authHeader.split(" ")[1];

const decoded = jwt.verify(token, process.env.JWT_SECRET);

// DEBUG (temporary)
console.log("Decoded token:", decoded);

const user = await User.findById(decoded.id);

if (!user) {
return res.status(401).json({ message: "User not found" });
}

req.user = user;

next();

} catch (error) {

console.error(error);
res.status(401).json({ message: "Token invalid" });

}

};

module.exports = { protect };