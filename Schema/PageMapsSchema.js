var mongoose = require("mongoose"),
    Schema= mongoose.Schema,
    // Make dummy schema by mogoose for a Uploaded Doc colleaction in data base
    PageMapsSchema = mongoose.Schema({
        projectId: {
            type: Schema.Types.ObjectId,
            ref: 'Project',
            required: true
        },
        screenName: {
            type: String,
            unique: true,
            required: [true, 'Screen Name Require'],
            validate: {
                validator: _alphaNumericValidation,
                message: '{VALUE} is not a valid Screen Name!'
            }
        },
        docPath: {
            type: String,
            required: true
        },
        docId: {
            type: Schema.Types.ObjectId,
            ref: 'Document',
            required: true
        },
        deleteflag: {
            type: Boolean,
            default : false
        }
    }, {
        timestamps: true
    });
// Export User Schema
module.exports = PageMapsSchema;
// function that validate the value is alpha numeric or not
function _alphaNumericValidation(value) {
    return /^[a-zA-Z0-9\-\s]+$/.test(value);
}