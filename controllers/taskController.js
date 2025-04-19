const Project = require("../models/project");
const Task = require("../models/task");
const User = require("../models/User");

// Create task
exports.createTask = async (req, res) => {
  try {
    let {
      title,
      taskName,
      hours,
      priority,
      assignedToWork,
      status,
      startDate,
      endDate,
    } = req.body;

    // Trim string fields
    title = title?.trim();
    taskName = taskName?.trim();
    priority = priority?.trim();
   // Check if assignedToWork is an array, then trim each user name
if (Array.isArray(assignedToWork)) {
  assignedToWork = assignedToWork.map(name => name.trim());
} else {
  return res.status(400).json({
    success: false,
    message: "assignedToWork should be an array of user names",
  });
}
    status = status?.trim();

    // Convert date strings to timestamps (or use Date if your schema supports it)
    const startTimestamp = new Date(startDate).getTime();
    const endTimestamp = new Date(endDate).getTime();

    // Required field check
    if (
      !title ||
      !taskName ||
      !hours ||
      !priority ||
      !assignedToWork ||
      !status ||
      !startTimestamp ||
      !endTimestamp
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate taskName against allowed values
    const validTaskNames = [
      "UI_Design",
      "UI_Creation",
      "Testing",
      "Integraton",
    ];
    if (!validTaskNames.includes(taskName)) {
      return res.status(400).json({
        success: false,
        message: `Invalid taskName. Allowed values are: ${validTaskNames.join(
          ", "
        )}`,
      });
    }

    // Find related project
    const project = await Project.findOne({ title });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Validate assigned user
    const assignedName = await User.findOne({ name: assignedToWork });
    if (!assignedName) {
      return res.status(404).json({
        success: false,
        message: "Assigned User Name not found",
      });
    }

    // Check for existing task
    let taskExists = await Task.findOne({ title });

    if (taskExists) {
      // Update task
      taskExists.taskName = taskName;
      taskExists.hours = hours;
      taskExists.startDate = startTimestamp;
      taskExists.endDate = endTimestamp;
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
      // Create task
      const newTask = new Task({
        title,
        taskName,
        category: project.category,
        assignedTo: project.assignedTo,
        hours,
        priority,
        assignedToWork,
        startDate: startTimestamp,
        endDate: endTimestamp,
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
    return res.status(500).json({
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

// Get all tasks by project title
exports.getTasksByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required to fetch tasks",
      });
    }

    const tasks = await Project.find({ title });
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tasks found for this title",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
