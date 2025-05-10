// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// exports.registerUser = async (req, response) => {
//   const {
//     name,
//     email,
//     password,
//     userType,
//     designation,
//     permission,
//     postModule,
//     status,
//     termsAccepted,
//   } = req.body;

//   if (!password) {
//     return response.status(400).json({ message: "Password is required" });
//   }

//   try {
//     // Check if user already exists
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return response
//         .status(400)
//         .json({ succes: false, message: "User already exists" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const validPostModules = ["blog", "news", "project"];

//     const filteredPostModules = Array.isArray(postModule)
//       ? postModule.filter((mod) => validPostModules.includes(mod))
//       : validPostModules.includes(postModule)
//       ? [postModule]
//       : [];

//     if (filteredPostModules.length === 0) {
//       return response
//         .status(400)
//         .json({ succes: false, message: "Invalid postModule value" });
//     }

//     // Create new user
//     const newUser = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       // password,
//       userType,
//       designation,
//       permission,
//       postModule: filteredPostModules,
//       status,
//       termsAccepted,
//     });

//     await newUser.save();

//     // Generate JWT token
//     const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     response.json({
//       succes: true,
//       message: "User registered successfully",
//       token,
//       user: {
//         id: newUser._id,
//         name: newUser.name,
//         email: newUser.email,
//         userType: newUser.userType,
//         designation: newUser.designation,
//         permission: newUser.permission,
//         postModule: newUser.postModule,
//         status: newUser.status,
//         termsAccepted: newUser.termsAccepted,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     response.status(500).json({ succes: false, message: "Server error" });
//   }
// };

// exports.loginUser = async (req, response) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return response
//         .status(400)
//         .json({ success: false, message: "Invalid name credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return response
//         .status(400)
//         .json({ success: false, message: "Invalid password credentials" });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     response.json({
//       success: true,
//       message: "Login successful",
//       token,
//       data: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     response.status(500).json({ success: false, message: "Server error" });
//   }
// };

// //all users
// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find();

//     if (!users || users.length === 0) {
//       return res.status(404).json({
//         succes: false,
//         message: "No Users Found",
//       });
//     }

//     return res.status(200).json({
//       succes: true,
//       message: "Users Fetch Successfully",
//       data: users,
//     });
//   } catch (error) {
//     console.error("Error fetching tasks:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

// //get users by ID
// exports.getUserByEmail = async (req, res) => {
//   try {
//     const { email } = req.query;

//     if (!email) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "Task not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "User Fetch successfully",
//       data: user,
//     });
//   } catch (error) {
//     console.error("Error fetching task:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// exports.updateUser = async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       userType,
//       designation,
//       permission,
//       postModule,
//       status,
//       termsAccepted,
//     } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // Update fields if provided
//     if (name) user.name = name;
//     // if (email) user.email = email;
//     // if (password) user.password = await bcrypt.hash(password, 10);
//     if (userType) user.userType = userType;
//     if (designation) user.designation = designation;
//     if (permission) user.permission = permission;
//     if (postModule) {
//       const validPostModules = ["blog", "news", "project"];
//       user.postModule = Array.isArray(postModule)
//         ? postModule.filter((mod) => validPostModules.includes(mod))
//         : validPostModules.includes(postModule)
//         ? [postModule]
//         : user.postModule;
//     }
//     if (status) user.status = status;
//     if (termsAccepted !== undefined) user.termsAccepted = termsAccepted;

//     const updatedUser = await user.save();

//     return res.status(200).json({
//       success: true,
//       message: "User updated successfully",
//       data: updatedUser,
//     });
//   } catch (error) {
//     console.error("Error updating user:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

// exports.deleteUser = async (req, res) => {
//   try {
//     const { email } = req.params;

//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         message: "Email is required",
//       });
//     }

//     const user = await User.findOneAndDelete({ email });
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "User deleted successfully",
//       data: user,
//     });
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

// === /controllers/authController.js ===
const User = require("../models/User");

// Helper function to send token response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
};

// register api
exports.registerAdmin = async (req, res, next) => {
  try {
    const userCount = await User.countDocuments();

    // Extract all fields from frontend
    const {
      name,
      email,
      password,
      designation,
      permission,
      postModule,
      status,
      role,
      termsAccepted,
    } = req.body;

    // First user registration
    if (userCount === 0) {
      if (role !== "admin") {
        return res.status(400).json({
          success: false,
          error: "The first registered user must be an admin.",
        });
      }
    } else {
      // Prevent public registration after the first user
      return res.status(403).json({
        success: false,
        error: "Registration not allowed. Only admin can create new users.",
      });
    }

    // Basic validation
    if (
      !name ||
      !email ||
      !password ||
      !designation ||
      !permission ||
      !postModule
    ) {
      return res.status(400).json({
        success: false,
        error: "All required fields must be provided.",
      });
    }

    // Create the admin (force role to admin for safety)
    const admin = await User.create({
      name,
      email,
      password,
      role: "admin",
      designation,
      permission,
      postModule,
      status,
      termsAccepted,
    });

    sendTokenResponse(admin, 200, res);
  } catch (err) {
    console.error("Register Error:", err);
    return res.status(500).json({
      success: false,
      error: "Server error during registration.",
    });
  }
};

// login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Please provide an email and password",
      });
    }

    // Check for user
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    console.log(user);

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
