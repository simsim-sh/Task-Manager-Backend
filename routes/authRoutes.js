const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserByEmail,
  updateUser,
  deleteUser,
} = require("../controllers/authController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getAllUsers", getAllUsers);
router.get("/getUserByEmail", getUserByEmail);
router.put("/updateUser/:email", updateUser);
router.delete("/deleteUser/:email", deleteUser);

module.exports = router;
