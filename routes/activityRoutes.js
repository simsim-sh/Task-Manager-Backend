const express = require("express");
const { getAllActivities, createActivity, updateActivity, deleteActivity } = require("../controllers/activityController");
const router = express.Router();
 

router.post("/createActivity", createActivity);
router.get("/getByProject", getActivitiesByProject);
router.get("/", getAllActivities);
router.put("/updateActivity/:id", updateActivity);
router.delete("/deleteActivity/:id", deleteActivity);
 // New route for getting activities by project

module.exports = router;


