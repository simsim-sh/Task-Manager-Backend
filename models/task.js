const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    taskName: {
      type: String,
      required: true,
      enum: ["UI_Design", "UI_Creation", "Testing", "Integration"],
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
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      required: true,
      enum: ["Low", "Medium", "High"],
    },
    assignedToWork: {
      type: [{
    type: String,
  }],
      required: true,
    },
    Reviwer: {
         type: [{
    type: String,
  }],
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: [
        "New",
        "In Progress",
        "Completed",
        "Active",
        "Inactive",
        "Overdue",
        "hold",
      ],
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", TaskSchema);
