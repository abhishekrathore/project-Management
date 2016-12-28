var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    // Make dummy schema by mogoose for a user colleaction in data base
    TaskLogger = mongoose.Schema({
        screenId: {
            type: Schema.Types.ObjectId,
            required: [true, 'Screen Id is Require'],
            ref: 'PageMaps'
        },
        projectId: {
            type: Schema.Types.ObjectId,
            ref: 'Project',
            required: [true, 'Project Id is Require']
        },
        taskId: {
            type: Schema.Types.ObjectId,
            ref: 'Task',
            required: [true, 'Task Id is Require']
        },
        loggerType: {
            type: String,
            required: [true, 'Logger Type is Require']
        },
        oldValue: {
            type: String
        },
        newValue: {
            type: String
        },
        changedBy : {
            type: Schema.Types.ObjectId,
            required: [true, 'Change By User is require'],
            ref: 'User'
        },
        deleteflag: {
            type: Boolean,
            default: false
        }
    }, {
        timestamps: true
    });
// Export Task Logger Schema
module.exports = TaskLogger;
