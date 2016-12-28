TaskLogger = require("../Model/TaskLogger"); // Require User Molel file
//var mongoose = require("mongoose");
var resultObj = {
        status: ''
    },
    FAIL = 'fail',
    OK = 'ok';
var ObjectId = require('mongoose').Types.ObjectId;

function _saveLogs(logsArray) {
    var newLog;
    for (var i = 0; i < logsArray.length; i++) {
        newLog = new TaskLogger(logsArray[i]);
        newLog.save();
    }
}

function _getLogsOfTask (req, res) {
    TaskLogger.find({deleteflag : false}).populate('projectId', 'projectName').populate('changedBy', 'name').populate('taskId', 'taskTitle').exec(function (err, docs) {
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
    saveLogs : _saveLogs,
    getLogsOfTask : _getLogsOfTask
};