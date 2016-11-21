Project = require("../Model/Project"); // Require User Molel file
var resultObj = {
        status: ''
    },
    FAIL = 'fail',
    OK = 'ok',
    DocumentController = require('../Controller/DocumentController'); // require Controller code code
// Create A new project
function _createNewProject(req, res) {
    var CreateProject = new Project({
        projectName: req.body.projectName,
        projectDescription: req.body.projectDescription,
        projectPrority: req.body.projectPrority,
        developers: req.body.developers,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
    });
    CreateProject.save(function(err, docs) {
        if (err) {
            resultObj.status = FAIL;
            resultObj.result = err;
            res.send(resultObj);
        } else {
            _insertDocument(req, res, docs, req.body.logoImageId);
        };
    });
}
// Make Document Row for Each Doc
function _insertDocument(req, res, docs, id) {
    resultObj.status = OK;
    resultObj.result = docs;
    if (id) {
        var updateDoc = {
            docPath: id.docPath,
            docName: id.docName,
            projectId: docs._id,
            updateRef: _updateProjectLogoId
        };
        DocumentController.insertDocument(updateDoc, res);
    } else {
        res.send(resultObj);
    }
}
// Update Logo Id for Each Project
function _updateProjectLogoId(docs, res) {
    Project.findByIdAndUpdate(docs.projectId, {
        $set: {
            logoImageId: docs._id
        }
    }, function(err, docs) {
        if (err) {
            resultObj.status = FAIL;
            resultObj.result = err;
            res.send(resultObj);
        } else {
            resultObj.status = OK;
            resultObj.result = docs;
            res.send(resultObj);
        };
    });
}
// Get Project Detail
function _getProjectDetailByProjectId(req, res) {
    var projectId = req.params.id;
    Project.findById(projectId).populate('logoImageId').populate('developers._id').exec(function(err, docs) {
        if (err) {
            resultObj.status = FAIL;
            resultObj.result = err;
            res.send(resultObj);
        } else {
            resultObj.status = OK;
            resultObj.result = docs;
            res.send(resultObj);
        };
    });
}
// Edit Project Detail
function _editProjectDetail(req, res) {
    var projectId = req.params.id;
    Project.findByIdAndUpdate(projectId, {
        $set: req.body
    }, function(err, docs) {
        if (err) {
            resultObj.status = FAIL;
            resultObj.result = err;
            res.send(resultObj);
        } else {
            _insertDocument(req, res, docs, req.body.logoImageIdNew);
        }
    });
}

// Get All Active Project for Admin
function _getActiveProject (req, res) {
    Project.find({deleteflag : false}).populate('logoImageId').exec(function(err, docs){
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
// Export Methodz
module.exports = {
    createNewProject: _createNewProject,
    updateProjectLogoId: _updateProjectLogoId,
    getProjectDetailByProjectId: _getProjectDetailByProjectId,
    editProjectDetail: _editProjectDetail,
    getActiveProject: _getActiveProject
};