const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, deleteUserById, updateUserById, getUserById } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

// All routes below this middleware are protected and require admin role
router.use(protect);
router.use(authorize('admin'));

// Route for getting all users and creating a new user
router
  .route('/')
  .get(getAllUsers)  
  .post(createUser);  

// Route for individual user operations (get, update, delete)
router
  .route('/:id')
  .get(getUserById)  
  .put(updateUserById) 
  .delete(deleteUserById);  

module.exports = router;
