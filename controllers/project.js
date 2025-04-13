const Project = require("../models/project");

// Create project
// exports.createProject = async (req, res) => {
//   try {
//     const {
//       title,
//       category,
//       description,
//       companyName,
//       contactPerson,
//       contactPhone,
//       contactEmail,
//       address,
//       assignedTo,
//       notes,
//       status,
//     } = req.body;

//     if (
//       !title ||
//       !category ||
//       !description ||
//       !companyName ||
//       !contactPerson ||
//       !contactPhone ||
//       !contactEmail ||
//       !address ||
//       !assignedTo ||
//       !notes
//     ) {
//       return res
//         .status(400)
//         .json({ success: false, message: "All fields are required" });
//     }

//     // Ensure user is authenticated
//     if (!req.user || !req.user.name) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

//     const projectExists = await Project.findOne({ title });
//     if (projectExists) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Project already exists" });
//     }

//     const newProject = await Project.create({
//       title,
//       name: req.user.name, // auto-filled from logged-in user
//       category,
//       description,
//       companyName,
//       contactPerson,
//       contactPhone,
//       contactEmail,
//       address,
//       assignedTo,
//       notes,
//       status: status || "Pending",
//     });

//     res.status(201).json({
//       success: true,
//       message: "Project created successfully!",
//       data: newProject,
//     });
//   } catch (error) {
//     console.error("Error creating project:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

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

    const projectExists = await Project.findOne({ title });
    if (projectExists) {
      return res
        .status(400)
        .json({ success: false, message: "Project already exists" });
    }

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

// Get project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({});

    if (!projects || projects.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No projects found" });
    }

    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update project by ID (PUT request)
exports.updateProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;
    const updates = req.body;

    const updatedProject = await Project.findByIdAndUpdate(projectId, updates, {
      new: true, // Return the updated project
      runValidators: true, // Ensure validation rules are applied
    });

    if (!updatedProject) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully!",
      data: updatedProject,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete project by ID (DELETE request)
exports.deleteProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;

    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Project deleted successfully!" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get project status summary
exports.getProjectStatusSummary = async (req, res) => {
  try {
    const summary = await Project.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "summary Fetch successfully",
      data: summary,
    });
  } catch (error) {
    console.error("Error fetching project status summary:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
