var mongoose = require("mongoose"),
    // Make dummy schema by mogoose for a user colleaction in data base
    UserSchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        useremail: {
            type: String,
            unique: true,
            required: true
        },
        userrole: {
            type: String,
            default : 'Developer'
        },
        accessflag: {
            type: Boolean,
            default : false
        },
        deleteflag: {
            type: Boolean,
            default : false
        }
    }, {
        timestamps: true
    });
// Export User Schema
module.exports = UserSchema;