var mongoose = require("mongoose"),// Require mongoose files
    TaskLoggerSchema = require("../Schema/TaskLoggerSchema"),// Require Project Schema file
    TaskLogger = mongoose.model('TaskLogger', TaskLoggerSchema);
module.exports = TaskLogger; // Export Project Model