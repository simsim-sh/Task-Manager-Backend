const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    tittle: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      require: true,
      enum: ["design", "development", "marketing"],
    },
    assignedTo: {
      type: String,
      required: true,
      enum: ["Marketing Team", "Dev Team", "Design Team"],
    },
    hours: {
      type: Number,
      required: true,
    },
    priority: {
      type: String,
      required: true,
      enum: ["Low", "Medium", "High"],
    },
    assignedToWork: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Fresh", "In Progress", "Completed"],
      default: "Fresh",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", TaskSchema);