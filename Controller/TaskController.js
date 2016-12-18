Task = require("../Model/Task"); // Require User Molel file
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
    console.log(req.body)
    Task.findByIdAndUpdate(taskId, {
        $set: req.body
    }, function(err, docs) {
        console.log(err, docs)
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

function _projectTaskView(req, res) {
    var findObj = {
        deleteflag: false,
        developers: [new ObjectId("58554d8f850bca11705f6195")]
    };
    Task.find(findObj).sort({ enddate: -1, prority: -1 }).exec(function(err, docs) {
        if (err) {
            resultObj.status = FAIL;
            resultObj.result = err;
        } else {
            var resultData = {};
            resultObj.status = OK;
            resultObj.result = {
                task: docs
            };
        };
        res.send(resultObj);
    });
    // Task.aggregate([{
    //     $match: findObj
    // }, { $sort: { 'enddate': '$enddate' } }, {
    //     $group: {
    //         _id: '$taskType',
    //         task: {
    //             $push: {
    //                 "_id": "$_id",
    //                 "taskTitle": "$taskTitle",
    //                 "enddate": "$enddate",
    //                 "projectId": "$projectId",
    //                 "taskType": "$taskType",
    //                 "remark": "$remark",
    //                 "status": "$status",
    //                 "developers": "$developers",
    //                 "phase": "$phase",
    //                 "prority": "$prority",
    //                 "screenId": "$screenId"
    //             }
    //         }
    //     }
    // }], function(err, docs) {
    //     if (err) {
    //         resultObj.status = FAIL;
    //         resultObj.result = err;
    //     } else {
    //         var resultData = {};
    //         resultObj.status = OK;
    //         resultObj.result = {
    //             task: docs
    //         };
    //     };
    //     res.send(resultObj);
    // });
}


// Export Method
module.exports = {
    getTaskByProjectOrScreenId: _getTaskByProjectOrScreenId,
    saveTask: _saveTask,
    editTask: _editTask,
    projectTaskView: _projectTaskView
};
