
Document = require("../Model/Document"); // Require User Molel file
var path = require('path'),
    fs = require('fs'),
    resultObj = {
        status: ''
    },
    FAIL = 'fail',
    OK = 'ok';
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
        }
        res.send(resultObj);
    });
}
// Insert New User Function 
function _insertDocument(projectDoc, res, isLogo, isDocs, callbackObj) {
    saveDocument.save(function(err, docs) {
        if (err) {
            resultObj.status = FAIL;
            resultObj.result = err;
            res.send(resultObj);
        } else {
            callbackObj.cb(docs, res, callbackObj);
        }
    });
}
// Upload Doc at Server
function _uploadDocument(req, res) {
    if (req && req.file) {
        var absolutePath = path.join(path.dirname(require.main.filename), req.file.path);
        req.file.absolutePath = absolutePath;
        var saveDocument = new Document({
            docPath: absolutePath,
            docName: req.file.filename
        });
        saveDocument.save(function(err, docs) {
            if (err) {
                resultObj.status = FAIL;
                resultObj.result = err;
                res.send(resultObj);
            } else {
                resultObj.status = OK;
                resultObj.result = docs;
                res.send(resultObj);
            }
        });
    } else {
        resultObj.status = FAIL;
        resultObj.result = 'Server Error';
        res.send(resultObj);
    }
}

// Get Document 
function _getDocument(req, res) {
    var file = 'images/' + req.params.filename;
    var filestream = fs.createReadStream(file);
    filestream.pipe(res);
}
// Delete Document
function _deleteDocument(req, res) {
    var imagePath = process.env.IMAGE_PATH || 'images';
    var documentName = req.query.name;
    if (documentName) {
        fs.stat(imagePath, function(err) {
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
                        _updateDocCollection(req, res);
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
    if (req.query.id) {
        Document.findOneAndRemove({
            _id: req.query.id
        }, function(err) {
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
