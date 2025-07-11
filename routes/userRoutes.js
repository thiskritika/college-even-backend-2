// routes/userRoutes.js
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/userModel");
const { updateProfilePhoto, removeProfilePhoto } = require("../controllers/userController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Get logged-in user profile data
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password"); // Exclude password from the response
// routes/userRoutes.js
const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/userModel");
const { updateProfilePhoto, removeProfilePhoto } = require("../controllers/userController");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

// Get logged-in user profile data
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password"); // Exclude password from the response

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      name: user.name,
      course: user.course,
      collegeYear: user.collegeYear,
      profilePhoto: user.profilePhoto,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// routes/userRoutes.js


router.put("/profile-photo", authMiddleware, upload.single("profilePhoto"), updateProfilePhoto);
router.delete("/profile-photo", authMiddleware, removeProfilePhoto);


module.exports = router;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      name: user.name,
      course: user.course,
      collegeYear: user.collegeYear,
      profilePhoto: user.profilePhoto,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// routes/userRoutes.js


router.put("/profile-photo", authMiddleware, upload.single("profilePhoto"), updateProfilePhoto);
router.delete("/profile-photo", authMiddleware, removeProfilePhoto);


module.exports = router;
