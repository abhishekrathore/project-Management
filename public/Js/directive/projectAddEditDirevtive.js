angular.module('projectDev')
    .directive('addEditProjectDir', function() {
        restrict: 'EA';
        return {
            templateUrl: 'views/projectForm.html',
            controller: 'addEditProjectCtrl',
            controllerAs : 'projectForm',
            link: function(scope) {
                
            }
        };
    });