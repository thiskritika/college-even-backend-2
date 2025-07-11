const express = require("express");
const { uploadPhoto, deletePhoto, updatePhotoDescription } = require("../controllers/photoController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const Photo = require("../models/photoModel");
const User = require("../models/userModel");

const router = express.Router();

// Upload a photo
router.post("/upload", authMiddleware, upload.single("photo"), uploadPhoto);

// Get all photos
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const photos = await Photo.find()
      .populate("userId", "profilePhoto name")
      .exec();

    const photoDetails = photos.map((photo) => ({
  _id: photo._id,
  url: photo.url,
  category: photo.category,
  description: photo.description,
  date: photo.date,
  user: photo.userId ? {
    _id: photo.userId._id,
    name: photo.userId.name,
    profilePhoto: photo.userId.profilePhoto,
  } : null,
}));


    res.status(200).json({
      message: "Photos retrieved successfully",
      photos: photoDetails,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all photos uploaded by the logged-in user
router.get("/yourPhotos", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id; // Assumes user ID is added to request by authMiddleware
    const photos = await Photo.find({ userId })
      .exec();

    res.status(200).json({
      message: "Your photos retrieved successfully",
      photos,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const photo = await Photo.findById(id).populate("userId"); // Use 'userId' as per your schema
      if (!photo) {
        return res.status(404).json({ message: "Photo not found" });
      }
      res.json({ photo });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

// Delete a specific photo
router.delete("/delete/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
      const photo = await Photo.findById(id);
      if (!photo) {
        return res.status(404).json({ message: "Photo not found" });
      }
  
      if (photo.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "You are not authorized to delete this photo" });
      }
  
      await Photo.findByIdAndDelete(id);
      res.status(200).json({ message: "Photo deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  

// Update the description of a photo
router.put("/update/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
  
    try {
      const photo = await Photo.findById(id);
      if (!photo) {
        return res.status(404).json({ message: "Photo not found" });
      }
  
      if (photo.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "You are not authorized to update this photo" });
      }
  
      photo.description = description;
      await photo.save();
      res.status(200).json({ message: "Photo description updated successfully", photo });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  

module.exports = router;
