var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    // Make dummy schema by mogoose for a Uploaded Doc colleaction in data base
    DocumentSchema = mongoose.Schema({
        projectId: {
            type: Schema.Types.ObjectId,
            ref: 'Project',
            default : null
        },
        docPath: {
            type: String,
            required: true
        },
        docName: {
            type: String,
            required: true
        },
        screenId: {
            type: Number,
            default : null
        },
        deleteflag: {
            type: Boolean,
            default : false
        }
    }, {
        timestamps: true
    });
// Export User Schema
module.exports = DocumentSchema;