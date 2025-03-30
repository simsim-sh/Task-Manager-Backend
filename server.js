// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt'); // ✅ Import bcrypt
// const connectDB = require('./db'); 

// const app = express();

// // Middleware
// app.use(cors({
//   origin: 'http://localhost:5173', 
//   credentials: true
// }));
// app.use(express.json());

// // Connect to MongoDB
// connectDB();

// // Define User Schema
// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   userType: { type: String, required: true },
//   designation: { type: String, required: true },
//   permission: { type: String, required: true },
//   postModule: { type: String, required: true },
//   status: { type: String, default: "active" },
// });

// const User = mongoose.model('User', userSchema);

// // 📝 REGISTER Route (Sign Up)
// app.post('/registerUser', async (req, res) => {
//   const { name, email, password, userType, designation, permission, postModule, status } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // ✅ Hash password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       userType,
//       designation,
//       permission,
//       postModule,
//       status
//     });

//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully', user: newUser });
//   } catch (error) {
//     console.error('Register Error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // 🔐 LOGIN Route (Sign In)
// app.post('/registerUser', async (req, res) => {
//   const { name, email, password, userType, designation, permission, postModule, status } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ name, email, password: hashedPassword, userType, designation, permission, postModule, status });

//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully' }); // ✅ Return message
//   } catch (error) {
//     console.error('Register Error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Start the server
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
