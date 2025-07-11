const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

// Register User Controller
exports.register = async (req, res) => {
  const { name, course, collegeYear, email, password } = req.body;
  let profilePhoto = null;

  // If a file is uploaded, store its path
  if (req.file) {
    profilePhoto = req.file.path; // Store the file path in the database
  }

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user object
    const newUser = new User({
      name,
      course,
      collegeYear,
      profilePhoto,
      email,
      password: hashedPassword
    });

    // Save the user in the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.logout = (req, res) => {
  // For stateless JWT, you typically handle logout client-side
  res.status(200).json({ message: 'Logged out successfully. Please remove the token on the client side.' });
};