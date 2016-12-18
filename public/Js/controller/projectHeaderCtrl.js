angular.module('projectDev')
    .controller('projectHeaderCtrl', projectHeaderCtrl);
projectHeaderCtrl.$inject = ['serverRequestService'];
// Project Dev Controller
function projectHeaderCtrl(serverRequestService) {
    var projectHeader = this;
    projectHeader.logOutUser = _logOutUser;
    // Logout in back end
    function _logOutUser () {
    	serverRequestService.serverRequest('/logout', 'GET');
    }
}