angular.module('projectDev')
    .controller('projectTaskLoggerCtrl', projectTaskLoggerCtrl);
projectTaskLoggerCtrl.$inject = ['serverRequestService','PROJET_TASK_LOGGER_CTRL_API_OBJECT'];
// Project Dev Controller
function projectTaskLoggerCtrl(serverRequestService, PROJET_TASK_LOGGER_CTRL_API_OBJECT) {
    var projectTaskLogger = this;
    serverRequestService.serverRequest(PROJET_TASK_LOGGER_CTRL_API_OBJECT.getLogsOfTask, 'GET').then(_getLogsOfTask);
    projectTaskLogger.headerText = 'Task Logs';
    projectTaskLogger.backEvent = {
        stateName : 'projectPanel'
    };

    // Get Logs of Task View
    function _getLogsOfTask (res) {
        projectTaskLogger.logsArray = res.result
    }
}
