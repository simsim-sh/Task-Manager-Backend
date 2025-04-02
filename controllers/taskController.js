const Task = require("../models/task");

// Create task
exports.createTask = async (req, res) => {
  try {
    const { taskName, hours, priority, assignedTo, status } = req.body;

    if (!taskName || !hours || !priority || !assignedTo) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const taskExists = await Task.findOne({ taskName, assignedTo });
    if (taskExists) {
      return res
        .status(400)
        .json({ success: false, message: "Task already exists for this user" });
    }

    const newTask = await Task.create({
      taskName,
      hours,
      priority,
      assignedTo,
      status: status || "Fresh",
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully!",
      data: newTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});

    if (!tasks || tasks.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No tasks found" });
    }

    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update task by ID
exports.updateTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updates = req.body;

    const updatedTask = await Task.findByIdAndUpdate(taskId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully!",
      data: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete task by ID
exports.deleteTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully!" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};