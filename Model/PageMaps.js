var mongoose = require("mongoose"),// Require mongoose files
    PageMapsSchema = require("../Schema/PageMapsSchema"),// Require Project Schema file
    PageMaps = mongoose.model('PageMaps', PageMapsSchema);
module.exports = PageMaps; // Export Project Model