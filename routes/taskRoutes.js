const express = require("express");
const {
  createTask,
  getAllTasks,
  getTaskById,
  deleteTaskByTitle,
  getTasksByTitle,
} = require("../controllers/taskController.js");
const router = express.Router();

router.post("/createTask", createTask);
router.get("/getAllTasks", getAllTasks);
router.get("/getTaskByTitle/:title", getTasksByTitle);
router.get("/getTaskById/:id", getTaskById);
router.delete("/deleteTask", deleteTaskByTitle);

module.exports = router;
