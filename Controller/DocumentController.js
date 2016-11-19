Document = require("../Model/Document"); // Require User Molel file
var file = require('file-system'),
    fs = require('fs'),
    resultObj = {
        status: ''
    },
    FAIL = 'fail',
    OK = 'ok';
//Q = require("q");
// Make a function for find user by querry
function _getDocumentByProjectId(req, res) {
    var findObj = {
        deleteFlag: false,
        projectID: req.id
    };
    Document.find(findObj, function(err, docs) {
        if (err) {
            resultObj.status = FAIL;
            resultObj.result = err;
        } else {
            resultObj.status = OK;
            resultObj.result = docs;
        };
        res.send(resultObj);
    });
}
// Insert New User Function 
function _insertDocument(projectDoc, res) {
    var saveDocument = new Document({
        projectId: projectDoc.projectId,
        docPath: projectDoc.docPath,
        docName: projectDoc.docName
    });
    saveDocument.save(function(err, docs) {
        if (err) {
            resultObj.status = FAIL;
            resultObj.result = err;
            res.send(resultObj);
        } else {
            projectDoc.updateRef(docs, res);
        };
    });
}
// Upload Doc at Server
function _uploadDocument(req, res) {
    if (req && req.file) {
        resultObj.status = OK;
        resultObj.result = req.file;
    } else {
        resultObj.status = FAIL;
        resultObj.result = 'Server Error';
    }
    res.send(resultObj);
}

// Get Document 
function _getDocument(req, res) {
    fs.readFile('images/'+ req.params.filename , function(err, data) {
        if(err) {
            resultObj.status = FAIL;
        resultObj.result = err;
        } else {
            resultObj.status = OK;
            resultObj.result = data;
        }
        res.send(resultObj);
    });
}
// Delete Document
function _deleteDocument(req, res) {
    var imagePath = process.env.IMAGE_PATH || 'images';
    documentName = req.query.name;
    if (documentName) {
        fs.stat(imagePath, function(err, stats) {
            if (err) {
                resultObj.status = FAIL;
                resultObj.result = req.err;
                res.send(resultObj);
            } else {
                fs.unlink(imagePath + '/' + documentName, function(err) {
                    if (err) {
                        resultObj.status = FAIL;
                        resultObj.result = req.err;
                        res.send(resultObj);
                    } else {
                        resultObj.status = OK;
                        resultObj.result = 'file deleted successfully';
                        res.send(resultObj);
                    }
                });
            }
        });
    } else {
        resultObj.status = FAIL;
        resultObj.result = 'Please Provide Document Name Which You Want to Delete';
        res.send(resultObj);
    }
}
// Export Methodz
module.exports = {
    getDocumentByProjectId: _getDocumentByProjectId,
    insertDocument: _insertDocument,
    uploadDocument: _uploadDocument,
    deleteDocument: _deleteDocument,
    getDocument : _getDocument
};