const express = require("express");
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
} = require("../controllers/project");

const router = express.Router();

router.post("/createProject", createProject);
router.get("/getAllProjects", getAllProjects);
router.get("/getProjectById/:id", getProjectById);
router.put("/updateProject/:id", updateProjectById);
router.delete("/deleteProject/:id", deleteProjectById);

module.exports = router;
