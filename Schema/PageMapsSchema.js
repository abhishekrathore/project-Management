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
            required: true
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