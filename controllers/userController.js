const User = require("../models/userModel");

exports.updateProfilePhoto = async (req, res) => {
    try {
      const userId = req.user._id;
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
  
      const profilePhoto = req.file.path;
  
      const user = await User.findByIdAndUpdate(userId, { profilePhoto }, { new: true }).select("-password");
  
      res.status(200).json({ message: "Profile photo updated successfully", user });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  // Remove user profile photo
  exports.removeProfilePhoto = async (req, res) => {
    try {
      const userId = req.user._id;
      const user = await User.findByIdAndUpdate(userId, { profilePhoto: null }, { new: true }).select("-password");
  
      res.status(200).json({ message: "Profile photo removed successfully", user });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  