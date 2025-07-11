const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin'); // Import the Admin model

// Middleware to authenticate admin users
exports.adminAuthMiddleware = async (req, res, next) => {
  // Check for token in the Authorization header
  const token = req.header('Authorization') && req.header('Authorization').startsWith('Bearer ') 
    ? req.header('Authorization').replace('Bearer ', '') 
    : null;

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the admin associated with the token
    const admin = await Admin.findById(decoded.id);

    // Check if admin exists
    if (admin) {
      req.admin = admin;
      next();
    } else {
      res.status(403).json({ message: 'Access denied, only admins allowed' });
    }
  } catch (error) {
    // Handle token verification errors
    if (error.name === 'JsonWebTokenError') {
      res.status(401).json({ message: 'Invalid token' });
    } else {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};
