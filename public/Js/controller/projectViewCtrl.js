angular.module('projectDev')
    .controller('projectViewCtrl', projectViewCtrl);
projectViewCtrl.$inject = ['serverRequestService', '$stateParams','$state'];
// Project Dev Controller
function projectViewCtrl(serverRequestService, $stateParams, $state) {
    if(!$stateParams.id) { // || !$stateParams.project
        $state.go('projectPanel');
    } else {
    	serverRequestService.serverRequest('/checkProjectId/' + $stateParams.id, 'GET').then('',serverRequestService.errorById);
    }
    console.log($state)
    var projectView = this;
    projectView.projectId = $stateParams.id;
    projectView.headerText = 'Project View';
    projectView.backEvent = {
        stateName : 'projectPanel'
    };
}