angular.module('projectDev')
    .controller('addEditTaskCtrl', addEditTaskCtrl);
addEditTaskCtrl.$inject = ['serverRequestService','$mdDialog', 'items'];
// Project Dev Controller
function addEditTaskCtrl(serverRequestService, $mdDialog, items) {
    var addEditTask = this;
    addEditTask.addEditButtonFlag = false;
    if(items && items.taskDetail) {
        addEditTask.task = items.taskDetail;
        addEditTask.task.enddateCn = new Date(items.taskDetail.enddate);
        addEditTask.addEditButtonFlag = true;
    }
    addEditTask.minDate = new Date();
    addEditTask.maxDate = items.maxDate;
    addEditTask.closePopup = _closePopup;
    addEditTask.createTask = _createTask;
    addEditTask.editTask = _editTask;
    serverRequestService.serverRequest('getUserByProjectId/' + items.projectId, 'GET').then(_setDeveloperDropdown);
    // Set User List in DD
    function _setDeveloperDropdown (res) {
        addEditTask.developerDataSource = res.result;
    }
    // Close Popup window
    function _closePopup(argument) {
        $mdDialog.cancel();
    }
    function _createTask () {
        if(addEditTask.taskForm.$valid) {
            addEditTask.task.enddate = addEditTask.task.enddateCn;
            addEditTask.task.projectId = items.projectId;
            addEditTask.task.screenId = items.screenId;
            addEditTask.task.taskType = items.type;
            serverRequestService.serverRequest('/saveTask', 'POST', addEditTask.task).then(function(res) {
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
        if(addEditTask.taskForm.$valid) {
            addEditTask.task.projectId = items.projectId;
            addEditTask.task.screenId = items.screenId;
            addEditTask.task.taskType = items.type;
            serverRequestService.serverRequest('/editTask/' + addEditTask.task._id, 'PUT', addEditTask.task).then(function(res) {
                serverRequestService.showNotification('success', 'Task Update successfully', 'Update', 2000);
                $mdDialog.cancel();
            }, function(res) {
                angular.forEach(res.result.errors, function(value) {
                    serverRequestService.showNotification('error', value.message, value.path, 4000);
                });
            });
        } else {

        }
    }
}