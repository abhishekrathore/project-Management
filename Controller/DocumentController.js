Document = require("../Model/Document"); // Require User Molel file
var file = require('file-system'),
    path = require('path'),
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
        var absolutePath  = path.join(path.dirname(require.main.filename),req.file.path)
        req.file.absolutePath = absolutePath;
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
    console.log(req.params)
    fs.readFile('images/' + req.params.filename, function(err, data) {
        if (err) {
            resultObj.status = FAIL;
            resultObj.result = err;
        } else {
            resultObj.status = OK;
            resultObj.result = data;
        }
        console.log(resultObj)
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
                        _updateDocCollection(req, res)
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

function _updateDocCollection(req, res) {
    resultObj.status = OK;
    resultObj.result = 'file deleted successfully';
    if(req.query.id) {
        Document.findOneAndRemove({_id: req.query.id}, function(err, docs){
            res.send(resultObj);
        });
    } else {
        res.send(resultObj);
    }
}
// Export Methodz
module.exports = {
    getDocumentByProjectId: _getDocumentByProjectId,
    insertDocument: _insertDocument,
    uploadDocument: _uploadDocument,
    deleteDocument: _deleteDocument,
    getDocument: _getDocument
};