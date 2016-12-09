Task = require("../Model/Task"); // Require User Molel file
var resultObj = {
        status: ''
    },
    FAIL = 'fail',
    OK = 'ok';
// Make a function for find user by querry
function _getTaskByScreenId(req, res) {
    var findObj = {
        deleteFlag: false,
        screenID: req.params.id
    };
    Task.find(findObj, function(err, docs) {
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
    Project.findByIdAndUpdate(taskId, {
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


// Export Method
module.exports = {
    getTaskByScreenId: _getTaskByScreenId,
    saveTask : _saveTask,
    editTask: _editTask
};