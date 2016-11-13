var mongoose = require("mongoose"),
    // Make dummy schema by mogoose for a user colleaction in data base
    UserSchema = mongoose.Schema({
        name: {
            type: String,
            required: true,
            index: true
        },
        useremail: {
            type: String,
            unique: true,
            required: true,
            index: true
        },
        userrole: {
            type: String,
            required: true,
            index: true
        },
        accessflag: {
            type: Boolean,
            required: true,
            index: true
        },
        deleteflag: {
            type: Boolean,
            index: true
        }
    }, {
        timestamps: {
            createdAt: 'created_at'
        }
    });
// Export User Schema
module.exports = UserSchema;