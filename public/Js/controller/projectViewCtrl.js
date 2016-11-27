angular.module('projectDev')
    .controller('projectViewCtrl', projectViewCtrl);
projectViewCtrl.$inject = ['$scope', 'serverRequestService', '$stateParams','$location'];
// Project Dev Controller
function projectViewCtrl($scope, serverRequestService, $stateParams, $location) {
    if(!$stateParams.id || !$stateParams.project) {
        $location.path('/projectPanel');
    }
    var _THIS = this;
    _THIS.project = {};
    _THIS.project = angular.copy($stateParams.project);
}