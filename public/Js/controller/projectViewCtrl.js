angular.module('projectDev')
    .controller('projectViewCtrl', projectViewCtrl);
projectViewCtrl.$inject = ['serverRequestService', '$stateParams','$state', 'PROJET_VIEW_CTRL_API_OBJECT'];
// Project Dev Controller
function projectViewCtrl(serverRequestService, $stateParams, $state, PROJET_VIEW_CTRL_API_OBJECT) {
    if(!$stateParams.id) { // || !$stateParams.project
        $state.go('projectPanel');
    } else {
    	serverRequestService.serverRequest(PROJET_VIEW_CTRL_API_OBJECT.checkProjectId + $stateParams.id, 'GET').then('',serverRequestService.errorById);
    }
    var projectView = this;
    projectView.projectId = $stateParams.id;
    projectView.headerText = 'Project View';
    projectView.backEvent = {
        stateName : 'projectPanel'
    };
}