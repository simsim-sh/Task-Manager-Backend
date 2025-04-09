const Project = require("../models/project");
const Task = require("../models/task");
const User = require("../models/User");

// Create task
exports.createTask = async (req, res) => {
  try {
    const { title, hours, priority, assignedToWork, status } = req.body;

    if (!title || !hours || !priority || !assignedToWork || !status) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find the related project
    const project = await Project.findOne({ title });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Find user by name (assignedToWork is a name)
    const assignedName = await User.findOne({ name: assignedToWork });
    if (!assignedName) {
      return res.status(404).json({
        success: false,
        message: "Assigned User Name not found",
      });
    }

    // Check if task already exists
    let taskExists = await Task.findOne({ title });

    if (taskExists) {
      // Update existing task
      taskExists.hours = hours;
      taskExists.priority = priority;
      taskExists.assignedToWork = assignedToWork;
      taskExists.status = status;

      taskExists = await taskExists.save();

      return res.status(200).json({
        success: true,
        message: "Task updated",
        data: taskExists,
      });
    } else {
      // Create new task
      const newTask = new Task({
        title,
        category: project.category,
        assignedTo: project.assignedTo,
        hours,
        priority,
        assignedToWork, // this is the user's name
        status,
      });

      await newTask.save();

      return res.status(201).json({
        success: true,
        message: "Task created",
        data: newTask,
      });
    }
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tasks found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task Fetch successfully",
      data: tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task Fetch successfully",
      data: task,
    });
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Delete task by ID
exports.deleteTaskByTitle = async (req, res) => {
  try {
    const { title } = req.query; // ✅ FIXED: query instead of params

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required to delete a task",
      });
    }

    const deletedTask = await Task.findOneAndDelete({ title });

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

