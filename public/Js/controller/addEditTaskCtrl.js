angular.module('projectDev')
    .controller('addEditTaskCtrl', addEditTaskCtrl);
addEditTaskCtrl.$inject = ['serverRequestService', '$mdDialog', 'items', 'ADD_EDIT_TASK_CTRL_API_OBJECT'];
// Project Dev Controller
function addEditTaskCtrl(serverRequestService, $mdDialog, items, ADD_EDIT_TASK_CTRL_API_OBJECT) {
    var addEditTask = this;
    addEditTask.addEditButtonFlag = false;
    if (items && items.taskDetail) {
        addEditTask.task = items.taskDetail;
        addEditTask.task.enddateCn = new Date(items.taskDetail.enddate);
        addEditTask.minDate = addEditTask.task.enddateCn;
        addEditTask.minDate.setHours(0, 0, 0, 0);
        addEditTask.addEditButtonFlag = true;
    } else {
        addEditTask.minDate = new Date();
        addEditTask.minDate.setHours(0, 0, 0, 0);
    }
    addEditTask.maxDate = items.maxDate;
    addEditTask.closePopup = _closePopup;
    addEditTask.createTask = _createTask;
    addEditTask.editTask = _editTask;
    serverRequestService.serverRequest(ADD_EDIT_TASK_CTRL_API_OBJECT.getUserByProjectId + items.projectId, 'GET').then(_setDeveloperDropdown);
    // Set User List in DD
    function _setDeveloperDropdown(res) {
        addEditTask.developerDataSource = res.result;
    }
    // Close Popup window
    function _closePopup(argument) {
        $mdDialog.cancel();
    }

    function _createTask() {
        if (addEditTask.taskForm.$valid) {
            addEditTask.task.enddate = addEditTask.task.enddateCn;
            addEditTask.task.projectId = items.projectId;
            addEditTask.task.screenId = items.screenId;
            addEditTask.task.taskType = items.type;
            serverRequestService.serverRequest(ADD_EDIT_TASK_CTRL_API_OBJECT, saveTask, 'POST', addEditTask.task).then(function(res) {
                serverRequestService.showNotification('success', 'Task Save successfully', 'Save', 2000);
                $mdDialog.cancel();
            }, function(res) {
                angular.forEach(res.result.errors, function(value) {
                    serverRequestService.showNotification('error', value.message, value.path, 4000);
                });
            });
        } else {
            addEditTask.taskForm.$setSubmitted();
        }
    }

    function _editTask() {
        if (addEditTask.taskForm.$valid) {
            addEditTask.task.projectId = items.projectId;
            addEditTask.task.screenId = items.screenId;
            addEditTask.task.taskType = items.type;
            addEditTask.task.enddate = items.taskDetail.enddateCn;
            serverRequestService.serverRequest(ADD_EDIT_TASK_CTRL_API_OBJECT.editTask + addEditTask.task._id, 'PUT', addEditTask.task).then(function(res) {
                serverRequestService.showNotification('success', 'Task Update successfully', 'Update', 2000);
                $mdDialog.cancel();
            }, function(res) {
                if (res && res.result && res.result.errors) {
                    angular.forEach(res.result.errors, function(value) {
                        serverRequestService.showNotification('error', value.message, value.path, 4000);
                    });
                }
            });
        } else {

        }
    }
}