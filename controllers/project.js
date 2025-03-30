const Project = require("../models/project");

// Create project
exports.createProject = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      companyName,
      contactPerson,
      contactPhone,
      contactEmail,
      address,
      assignedTo,
      notes,
      status,
    } = req.body;

    if (
      !title ||
      !category ||
      !description ||
      !companyName ||
      !contactPerson ||
      !contactPhone ||
      !contactEmail ||
      !address
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if the project already exists
    const projectExists = await Project.findOne({ title });
    if (projectExists) {
      return res
        .status(400)
        .json({ success: false, message: "Project already exists" });
    }

    // Corrected the create syntax
    const newProject = await Project.create({
      title,
      category,
      description,
      companyName,
      contactPerson,
      contactPhone,
      contactEmail,
      address,
      assignedTo,
      notes,
      status: status || "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully!",
      data: newProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//get project data
exports.getProjectByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }

    const project = await Project.findOne({ title });

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    res.json({
      success: true,
      message: "Project Found Successfully",
      data: project,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
