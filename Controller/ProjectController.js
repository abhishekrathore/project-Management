Project = require("../Model/Project"); // Require User Molel file
var resultObj = {
        status: ''
    },
    FAIL = 'fail',
    OK = 'ok',
    DocumentController = require('../Controller/DocumentController'); // require Controller code code
// Create A new project
function _createNewProject(req, res) {
    var CreateProject = new Project(req.body);
    CreateProject.save(function(err, docs) {
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
}

// Get Project Detail
function _getProjectDetailByProjectId(req, res) {
    var projectId = req.params.id;
    Project.findById(projectId).populate('logoImageId').populate('documentArray').populate('developers._id').exec(function(err, docs) {
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

// Check Project Id is Valid or Not
function _checkProjectId(req, res) {
    var projectId = req.params.id;
    Project.findById(projectId).exec(function(err, docs) {
        if (err) {
            resultObj.status = FAIL;
            resultObj.result = err;
            res.send(resultObj);
        } else if(docs){
            resultObj.status = OK;
            resultObj.result = {};
            resultObj.result.enddate = docs.enddate; 
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
            resultObj.status = OK;
            resultObj.result = docs;
            res.send(resultObj);
        }
    });
}

// Get All Active Project for Admin or User
function _getActiveProject(req, res) {
    var findObj = {
        deleteflag: false,
    }, editFlag = true
    if(req.user[0].userrole !== 'Admin') {
        findObj.developers = [req.user[0]._id];
        editFlag = false;
    }
    console.log(findObj)
    Project.find(findObj).populate('logoImageId').exec(function(err, docs) {
        if (err) {
            resultObj.status = FAIL;
            resultObj.result = err;
        } else {
            resultObj.status = OK;
            resultObj.result = {};
            resultObj.result.projectList = docs;
            resultObj.result.editFlag = editFlag;
        }
        res.send(resultObj);
    });
}
// Get Project User By Id

function _getUserByProjectId (req, res) {
    var projectId = req.params.id;
    Project.findById(projectId).populate('developers').exec(function(err, docs) {
        if (err) {
            resultObj.status = FAIL;
            resultObj.result = err;
            res.send(resultObj);
        } else {
            console.log(docs)
            resultObj.status = OK;
            resultObj.result = docs.developers;
            res.send(resultObj);
        };
    });
}
// Export Methodz
module.exports = {
    createNewProject: _createNewProject,
    getProjectDetailByProjectId: _getProjectDetailByProjectId,
    editProjectDetail: _editProjectDetail,
    getActiveProject: _getActiveProject,
    getUserByProjectId : _getUserByProjectId,
    checkProjectId : _checkProjectId
};