const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  course: { type: String, required: true },
  collegeYear: { type: String, required: true },
  profilePhoto: { type: String }, // Optional
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
});

module.exports = mongoose.model('User', userSchema);
