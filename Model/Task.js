var mongoose = require("mongoose"),// Require mongoose files
    TaskSchema = require("../Schema/TaskSchema"),// Require Project Schema file
    Task = mongoose.model('Task', TaskSchema);
module.exports = Task; // Export Project Model