Task = require("../Model/Task"); // Require User Molel file
var TaskLoggerController = require('../Controller/TaskLoggerController')
//var mongoose = require("mongoose");
var resultObj = {
        status: ''
    },
    FAIL = 'fail',
    DEFAULT_EVENT_ARRAY = [{
        _id: "Incoming Data"
    }, {
        _id: "Event Task"
    }, {
        _id: "Get ways Task"
    }];
OK = 'ok';
var ObjectId = require('mongoose').Types.ObjectId;
// Make a function for find user by querry
function _getTaskByProjectOrScreenId(req, res) {
    var findObj = {
        deleteflag: false,
        screenId: new ObjectId(req.params.screenId),
        projectId: new ObjectId(req.params.projectId)
    };
    Task.aggregate([{
        $match: findObj
    }, {
        $group: {
            _id: '$taskType',
            task: {
                $push: {
                    "_id": "$_id",
                    "taskTitle": "$taskTitle",
                    "enddate": "$enddate",
                    "projectId": "$projectId",
                    "taskType": "$taskType",
                    "remark": "$remark",
                    "status": "$status",
                    "developers": "$developers",
                    "phase": "$phase",
                    "prority": "$prority",
                    "screenId": "$screenId"
                }
            }
        }
    }], function(err, docs) {
        if (err) {
            resultObj.status = FAIL;
            resultObj.result = err;
        } else {
            var resultData = {};
            resultObj.status = OK;
            for (var i = 0; i < docs.length; i++) {
                resultData[docs[i]._id] = docs[i].task;
            }
            resultObj.result = {
                events: DEFAULT_EVENT_ARRAY,
                task: resultData
            };
        };
        res.send(resultObj);
    });
}

// Make a function for Save Task In Database
function _saveTask(req, res) {
    var CreateTask = new Task(req.body);
    CreateTask.save(function(err, docs) {
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

// Update Task
function _editTask(req, res) {
    var taskId = req.params.id;
    var diff = []
    Task.findById(taskId, function(err, docs) {
        if (docs) {
            console.log(docs._id)
            Object.keys(docs._doc).forEach(function(key) {
                if (docs._doc.hasOwnProperty(key) && req.body.hasOwnProperty(key) && docs._doc[key] != req.body[key] && !(key === 'enddate' && new Date(req.body[key]).getTime() === docs._doc[key].getTime()) && !(key === 'developers' && JSON.stringify(req.body[key]) === JSON.stringify(docs._doc[key]))) {
                    diff.push({
                        screenId: docs._doc.screenId,
                        projectId: docs._doc.projectId,
                        loggerType: key,
                        oldValue: docs._doc[key],
                        newValue: req.body[key],
                        changedBy : req.user[0]._id,
                        taskId : docs._doc._id
                    });
                }
            });
            TaskLoggerController.saveLogs(diff);
            Task.findByIdAndUpdate(taskId, {
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
        } else {
            resultObj.status = FAIL;
            resultObj.result = err || 'Error in Find Task';
            res.send(resultObj);
        }
    });

}

// Show Task View 
function _showTaskByProjectId(req, res) {
    var findObj = {
        projectId: req.params.projectId
    }
    if (req.user && req.user[0].userrole !== 'Admin') {
        findObj.developers = [req.user[0]._id];
    }
    Task.find(findObj).sort({
        enddate: 1,
        prority: -1
    }).select({
        '_id': '_id',
        'taskTitle': 'taskTitle',
        'phase': 'phase',
        'prority': 'prority',
        'enddate': 'enddate',
        'developers': 'developers'
    }).populate('developers').exec(function(err, docs) {
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


// Export Method
module.exports = {
    getTaskByProjectOrScreenId: _getTaskByProjectOrScreenId,
    saveTask: _saveTask,
    editTask: _editTask,
    showTaskByProjectId: _showTaskByProjectId
};