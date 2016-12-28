angular.module('projectDev')
    .controller('projectHeaderCtrl', projectHeaderCtrl);
projectHeaderCtrl.$inject = ['serverRequestService', '$state', 'PROJET_HEADER_CTRL_API_OBJECT'];
// Project Dev Controller
function projectHeaderCtrl(serverRequestService, $state, PROJET_HEADER_CTRL_API_OBJECT) {
    var projectHeader = this;
    projectHeader.logOutUser = _logOutUser;
    projectHeader.userProfilePic = serverRequestService.userProfilePic;
    projectHeader.backState = _backState;
    // Logout in back end
    function _logOutUser () {
    	serverRequestService.serverRequest(PROJET_HEADER_CTRL_API_OBJECT.logout, 'GET');
    }
    // go to previous State
    function _backState () {
    	$state.go(projectHeader.backEvent.stateName, projectHeader.backEvent.paramObj)
    }
}