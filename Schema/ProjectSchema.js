var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    // Make dummy schema by mogoose for a user colleaction in data base
    ProjectSchema = mongoose.Schema({
        projectName: {
            type: String,
            unique: true,
            required: [true, 'Project Name Require'],
            validate: {
                validator: _alphaNumericValidation,
                message: '{VALUE} is not a valid Project Name!'
            }
        },
        projectDescription: {
            type: String,
            required: [true, 'Project Description is Require']
        },
        projectPrority: {
            type: String,
            default: 'high'
        },
        startdate: {
            type: Date,
            default: Date.now
        },
        enddate: {
            type: Date,
            required: [true, 'Project End Date is Require'],
            validate: {
                validator: _dateValidator,
                message: '{VALUE} must be greater than Start Date'
            }
        },
        developers: [{
            type: Schema.Types.ObjectId,
            required: [true, 'Developers is require'],
            ref: 'User'
        }],
        logoImageId: {
            type: Schema.Types.ObjectId,
            default: null,
            ref: 'Document'
        },
        documentArray: [{
            type: Schema.Types.ObjectId,
            default: null,
            ref: 'Document'
        }],
        version: {
            type: Number,
            default: 1.0
        },
        deleteflag: {
            type: Boolean,
            default: false
        }
    }, {
        timestamps: true
    });
// Export User Schema
module.exports = ProjectSchema;

// function that validate the startDate and endDate
function _dateValidator(value) {
    return value > this.startdate;
}

// function that validate the value is alpha numeric or not
function _alphaNumericValidation(value) {
    return /^[a-zA-Z0-9\-\s]+$/.test(value);
}