// models/photoModel.js
const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    url: { type: String, required: true }, // Store the file URL or path
    category: { type: String },
    description: { type: String },
    date: { type: String, default: new Date().toLocaleDateString('en-GB') },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User
});

module.exports = mongoose.model('Photo', photoSchema);
