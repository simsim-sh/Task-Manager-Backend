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
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
