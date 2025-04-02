const express = require("express");
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
} = require("../controllers/taskController.js");

const router = express.Router();

router.post("/createTask", createTask);
router.get("/getAllTasks", getAllTasks);
router.get("/getTaskById/:id", getTaskById);
router.put("/updateTask/:id", updateTaskById);
router.delete("/deleteTask/:id", deleteTaskById);

module.exports = router;
