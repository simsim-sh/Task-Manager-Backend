const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    category: {
      type: String,
      require: true,
      enum: ["design", "development", "marketing"],
    },
    description: {
      type: String,
      require: true,
    },
    companyName: {
      type: String,
      require: true,
    },
    contactPerson: {
      type: String,
      require: true,
    },
    contactPhone: {
      type: String,
      require: true,
    },
    contactEmail: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    assignedTo: {
      type: String,
      require: true,
      enum: ["Marketing Team", "Dev Team", "Design Team"],
    },
    notes: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", ProjectSchema);
