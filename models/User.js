const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
      enum: ["admin", "user", "manager"],
    },
    designation: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
      enum: ["hr", "marketing", "finance", "it"],
    },
    permission: {
      type: [String],
      required: true,
      enum: ["read", "write", "admin"],
    },
    postModule: {
      type: [String],
      required: true,
      enum: ["blog", "news", "project"],
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive"],
    },
    termsAccepted: {
      type: Boolean,
      required: true,
    },
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  designation: {
    type: String
  },
permission: {
  type: [String],
  enum: ['read', 'write', 'admin'],
  default: []
},
  postModule: {
    type: String
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
  },
  termsAccepted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
);

module.exports = mongoose.model("User", UserSchema);
