const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.registerUser = async (req, response) => {
  const {
    name,
    email,
    password,
    userType,
    designation,
    permission,
    postModule,
    status,
    termsAccepted,
  } = req.body;

  if (!password) {
    return response.status(400).json({ message: "Password is required" });
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return response
        .status(400)
        .json({ succes: false, message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const validPostModules = ["blog", "news", "project"];

    const filteredPostModules = Array.isArray(postModule)
      ? postModule.filter((mod) => validPostModules.includes(mod))
      : validPostModules.includes(postModule)
      ? [postModule]
      : [];

    if (filteredPostModules.length === 0) {
      return response
        .status(400)
        .json({ succes: false, message: "Invalid postModule value" });
    }

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      // password,
      userType,
      designation,
      permission,
      postModule: filteredPostModules,
      status,
      termsAccepted,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    response.json({
      succes: true,
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        userType: newUser.userType,
        designation: newUser.designation,
        permission: newUser.permission,
        postModule: newUser.postModule,
        status: newUser.status,
        termsAccepted: newUser.termsAccepted,
      },
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ succes: false, message: "Server error" });
  }
};

exports.loginUser = async (req, response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return response
        .status(400)
        .json({ success: false, message: "Invalid name credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return response
        .status(400)
        .json({ success: false, message: "Invalid password credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    response.json({
      success: true,
      message: "Login successful",
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ success: false, message: "Server error" });
  }
};

//all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      return res.status(404).json({
        succes: false,
        message: "No Users Found",
      });
    }

    return res.status(200).json({
      succes: true,
      message: "Users Fetch Successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

//get users by ID
exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User Fetch successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
