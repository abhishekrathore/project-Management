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
            resultObj.status = OK;
            resultObj.result = docs;
            if (req.body.logoImageId) {
                var updateDoc = {
                    docPath : req.body.logoImageId.docPath,
                    docName : req.body.logoImageId.docName,
                    projectId : docs._id,
                    updateRef : _updateProjectLogoId
                };
                DocumentController.insertDocument(updateDoc, res);
            } else {
                console.log('no logo')
                res.send(resultObj);
            }
        };
    });
}

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
function _editProjectDetail (req, res) {
    var projectId = req.params.id;
    Project.findByIdAndUpdate(projectId,{ $set: req.body}, function (err, docs) {
        if(err){
            resultObj.status = FAIL;
            resultObj.result = err;
            res.send(resultObj);
        } else {
            resultObj.status = OK;
            resultObj.result = docs;
            res.send(docs);
        }
    });
}
// Export Methodz
module.exports = {
    createNewProject: _createNewProject,
    updateProjectLogoId: _updateProjectLogoId,
    getProjectDetailByProjectId: _getProjectDetailByProjectId,
    editProjectDetail : _editProjectDetail
};