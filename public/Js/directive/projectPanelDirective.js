angular.module('projectDev')
    .directive('projectPanelDir', function() {
        restrict: 'EA';
        return {
            templateUrl: 'views/projectPanel.html',
            controller: 'projectPanelCtrl',
            controllerAs : 'projectPanel',
            link: function(scope) {

            }
        };
    });