angular.module('projectDev')
    .controller('projectViewCtrl', projectViewCtrl);
projectViewCtrl.$inject = ['serverRequestService', '$stateParams','$state'];
// Project Dev Controller
function projectViewCtrl(serverRequestService, $stateParams, $state) {
    if(!$stateParams.id) { // || !$stateParams.project
        $state.go('projectPanel');
    }
    var projectView = this;
    serverRequestService.serverRequest('/checkProjectId/' + $stateParams.id, 'GET').then('',serverRequestService.errorById);
    projectView.projectId = $stateParams.id;
    projectView.headerText = 'Project View',
    projectView.backState = serverRequestService.backState;
}