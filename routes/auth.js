const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  console.log("Request body:", req.body);
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    console.log("Existing user:", existingUser);

     if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Hashed password:", hashedPassword);

    // Declare and initialize the new user
    const newUser = new User({ username, password: hashedPassword });
    
    
    // Add a console log to see the user object
    console.log("User to be saved:", newUser);

    // Save the new user to the database
    await newUser.save();
    console.log("User saved successfully");
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error("Error saving user:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid username or password' });

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid username or password' });

    // Generate a JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Protected route example
router.get('/protected', async (req, res) => {
  const token = req.header('x-access-token');
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verified.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: `Welcome, ${user.username}!` });
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
});

module.exports = router;
