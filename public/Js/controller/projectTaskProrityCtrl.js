angular.module('projectDev')
    .controller('projectTaskProrityCtrl', projectTaskProrityCtrl);
projectTaskProrityCtrl.$inject = ['serverRequestService', 'projectList', '$mdDialog'];
// Project Dev Controller
function projectTaskProrityCtrl(serverRequestService, projectList, $mdDialog) {
    var projectTaskPrority = this;
    projectTaskPrority.projectList = projectList;
    projectTaskPrority.showTask = _showTask;
    projectTaskPrority.taskList = {};
    projectTaskPrority.showTaskFlag = {};
    projectTaskPrority.closePopup = _closePopup;

    function _showTask(index) {
    	var projectId = projectTaskPrority.projectList[index]._id;
    	projectTaskPrority.showTaskFlag[projectId] = !projectTaskPrority.showTaskFlag[projectId];
        if (projectTaskPrority.showTaskFlag[projectId]) {
            serverRequestService.serverRequest('/showTaskByProjectId/' + projectId, 'GET').then(function(res) {
                projectTaskPrority.taskList[projectId] = res.result;
                projectTaskPrority.toggle = !projectTaskPrority.toggle;
            }, serverRequestService.errorById);
        }

    }

    // Close Popup window
    function _closePopup(argument) {
        $mdDialog.cancel();
    }
}
