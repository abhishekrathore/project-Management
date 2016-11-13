var mongoose = require("mongoose"),// Require mongoose files
    UserSchema = require("../Schema/UserSchema"),// Require User Schema file
    User = mongoose.model('User', UserSchema);
module.exports = User; // Export User Model