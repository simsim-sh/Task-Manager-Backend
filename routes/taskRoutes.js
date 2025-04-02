const express = require("express");
const {
  createTask,
  getAllTasks,
  getTaskById,
  deleteTaskByTitle,
} = require("../controllers/taskController.js");
const taskController = require("../controllers/taskController");
const router = express.Router();

router.post("/createTask", createTask);
router.get("/getAllTasks", getAllTasks);
router.get("/getTaskById/:id", getTaskById);
router.delete("/deleteTask", taskController.deleteTaskByTitle);

module.exports = router;
