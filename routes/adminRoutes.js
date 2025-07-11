const express = require('express');
const {  registerAdmin, loginAdmin, addCategory, getCategories } = require('../controllers/adminController');
const { adminAuthMiddleware } = require('../middleware/adminMiddleware');
const router = express.Router();

router.post('/register', registerAdmin);

// Route to login an admin
router.post('/login', loginAdmin);

// Route to add a photo category (admin only)
router.post('/add-category', adminAuthMiddleware, addCategory);

// Route to get all categories (accessible by both admin and students)
router.get('/categories', getCategories);

module.exports = router;
