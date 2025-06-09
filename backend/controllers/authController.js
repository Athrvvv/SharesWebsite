const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
  const { firstName, middleName, lastName, email, password, phoneNumber, dob } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName, middleName, lastName, email, password: hashedPassword, phoneNumber, dob,
    });

    res.status(201).json({ message: "Signup successful. Please login." });
  } catch (err) {
    res.status(500).json({ message: "Server error during signup" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
      },
      process.env.JWT_SECRET,
      { expiresIn: '2d' }
    );

    res.status(200).json({ message: "Login successful", token, userId: user._id });
  } catch (err) {
    res.status(500).json({ message: "Server error during login" });
  }
};
