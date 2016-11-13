var mongoose = require("mongoose"),
    // Network url with Database Name(mongooseStudent)
    url = process.env.MONGODB_URI || "mongodb://localhost:27017/projectManagement";
// Connect Mongo DB Commend by url &  No need Callback Function
//mongoose.set('debug', true);
mongoose.connect(url);