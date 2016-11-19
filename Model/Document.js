var mongoose = require("mongoose"),// Require mongoose files
    DocumentSchema = require("../Schema/DocumentSchema"),// Require Project Schema file
    Document = mongoose.model('Document', DocumentSchema);
module.exports = Document; // Export Project Model