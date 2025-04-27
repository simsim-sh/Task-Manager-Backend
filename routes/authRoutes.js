// const express = require("express");
// const {
//   registerUser,
//   loginUser,
//   getAllUsers,
//   getUserByEmail,
//   updateUser,
//   deleteUser,
// } = require("../controllers/authController");
// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/getAllUsers", getAllUsers);
// router.get("/getUserByEmail", getUserByEmail);
// router.put("/updateUser/:email", updateUser);
// router.delete("/deleteUser/:email", deleteUser);

// module.exports = router;



// === /routes/authRoutes.js ===
const express = require('express');
const router = express.Router();
const { registerAdmin, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', registerAdmin);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;