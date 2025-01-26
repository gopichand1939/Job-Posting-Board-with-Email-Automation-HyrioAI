const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Token retrieved from Authorization header

  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET); // Verifying token
    req.user = verified; // Adding user info to the request
    next(); // Proceed to the next middleware
  } catch (err) {
    res.status(403).json({ message: "Invalid token." });
  }
};

module.exports = authenticateUser;
