const express = require("express");
const { createProject, getProjectByTitle } = require("../controllers/project");

const router = express.Router();

router.post("/createProject", createProject);
router.get("/getProjectByTitle", getProjectByTitle);

module.exports = router;
