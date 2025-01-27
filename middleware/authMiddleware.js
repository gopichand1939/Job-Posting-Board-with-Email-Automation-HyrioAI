const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Validates the token
    req.user = decoded; // Attaches user data to `req.user`
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token." });
  }
};


module.exports = authenticateUser;
