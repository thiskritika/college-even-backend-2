const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
  // Check if the Authorization header is present
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Authorization header missing' });

  // Extract the token from the header
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token missing' });

  try {
    // Verify the token and extract the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure the decoded token has the correct ID field (check if it's `id` or `_id`)
    const userId = decoded._id || decoded.id;

    // Find the user by the extracted ID
    const user = await User.findById(userId);
    if (!user) return res.status(401).json({ message: 'User not found' });

    // Attach the user to the request object
    req.user = user;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    // Handle token verification errors
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
