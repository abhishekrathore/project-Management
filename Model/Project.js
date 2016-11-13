var mongoose = require("mongoose"),// Require mongoose files
    ProjectSchema = require("../Schema/ProjectSchema"),// Require Project Schema file
    Project = mongoose.model('Project', ProjectSchema);
module.exports = Project; // Export Project Model