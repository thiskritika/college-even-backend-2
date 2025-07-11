const express = require('express');
const { register, login,logout } = require('../controllers/authController');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

// router.post('/register', register);
router.post('/register', upload.single('profilePhoto'), register);
router.post('/login', login);
router.post('/logout', logout);
module.exports = router;
