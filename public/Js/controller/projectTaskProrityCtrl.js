angular.module('projectDev')
    .controller('projectTaskProrityCtrl', projectTaskProrityCtrl);
projectTaskProrityCtrl.$inject = ['serverRequestService', '$mdDialog','PROJET_TASK_PRORITY_CTRL_API_OBJECT'];
// Project Dev Controller
function projectTaskProrityCtrl(serverRequestService, $mdDialog, PROJET_TASK_PRORITY_CTRL_API_OBJECT) {
    var projectTaskPrority = this;
    projectTaskPrority.showTask = _showTask;
    projectTaskPrority.taskList = {};
    projectTaskPrority.showTaskFlag = {};
    projectTaskPrority.closePopup = _closePopup;
    projectTaskPrority.currentDate = new Date().setHours(0, 0, 0, 0);
    serverRequestService.serverRequest(PROJET_TASK_PRORITY_CTRL_API_OBJECT.getActiveProject, 'GET').then(_getActiveProject);
    projectTaskPrority.headerText = 'Task View';
    projectTaskPrority.backEvent = {
        stateName : 'projectPanel'
    };
    projectTaskPrority.oneDay = 1000*60*60*24;
    projectTaskPrority.getOverDueDate = _getOverDueDate;
    projectTaskPrority.convertDate = _convertDate;  

    
    function _convertDate (date) {
        return new Date (date).getTime();
    }
    function _getOverDueDate (difference) {
        return Math.round(difference/projectTaskPrority.oneDay)
    }
    function _getActiveProject (res) {
        projectTaskPrority.projectList = res.result.projectList;
    }
    function _showTask(index) {
    	var projectId = projectTaskPrority.projectList[index]._id;
    	projectTaskPrority.showTaskFlag[projectId] = !projectTaskPrority.showTaskFlag[projectId];
        if (projectTaskPrority.showTaskFlag[projectId]) {
            serverRequestService.serverRequest(PROJET_TASK_PRORITY_CTRL_API_OBJECT.showTaskByProjectId + projectId, 'GET').then(function(res) {
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
