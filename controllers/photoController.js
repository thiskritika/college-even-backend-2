const Photo = require('../models/photoModel'); 
const User = require('../models/userModel'); // Your User model
// Controller to handle photo upload
exports.uploadPhoto = async (req, res) => {
    try {
      const { category, description } = req.body;
  
      // Check if file was uploaded
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      // Create a photo object
      const photo = {
        url: req.file.path, // Assuming you store the local path; adjust if storing a URL
        category,
        description,
        date: new Date().toLocaleDateString('en-GB') ,
        userId: req.user._id
      };
  
      // Save photo to the database
      const newPhoto = await Photo.create(photo);
  
      // Respond with success message and photo details
      res.status(201).json({ message: 'Photo uploaded successfully', photo: newPhoto });
    } catch (error) {
      // Handle any errors
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

  // Assuming you are using Mongoose





  


//Controller to get all photos
exports.getAllPhotos = async (req, res) => {
  try {
    // Retrieve all photos from the database
    const photos = await Photo.find();

    // Check if photos were retrieved
    if (!photos.length) {
      return res.status(404).json({ message: 'No photos found' });
    }

    // Respond with the retrieved photos
    res.status(200).json({ message: 'Photos retrieved successfully', photos });
  } catch (error) {
    // Handle any errors that occurred
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
