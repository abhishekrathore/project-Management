var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    // Make dummy schema by mogoose for a user colleaction in data base
    TaskSchema = mongoose.Schema({
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
        taskTitle: {
            type: String,
            unique: true,
            required: [true, 'Task Title is Require']
        },
        taskType: {
            type: String
        },
        prority: {
            type: String,
            default: 'high'
        },
        phase: {
            type: String,
            default: 'dev'
        },
        enddate: {
            type: Date,
            required: [true, 'Task End Date is Require'],
            validate: {
                validator: _dateValidator,
                message: '{VALUE} must be greater than Current Date'
            }
        },
        developers: [{
            type: Schema.Types.ObjectId,
            required: [true, 'Developers is require'],
            ref: 'User'
        }],
        status: {
            type: String,
            default: 'panding',
        },
        remark: {
            type: String,
            default: 'No Remark'
        },
        deleteflag: {
            type: Boolean,
            default: false
        }
    }, {
        timestamps: true
    });
// Export User Schema
module.exports = TaskSchema;

// function that validate the startDate and endDate
function _dateValidator(value) {
    return value >= new Date();
}

// function that validate the value is alpha numeric or not
function _alphaNumericValidation(value) {
    return /^[a-zA-Z0-9\-\s]+$/.test(value);
}