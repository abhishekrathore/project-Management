angular.module('projectDev')
    .directive('addEditProjectDir', function() {
        restrict: 'EA';
        return {
            scope: {

            },
            templateUrl: 'views/projectForm.html',
            controller: ['$scope', function($scope) {
                $scope.developerDataSource = [{
                    userId: 1,
                    name: 'Abhishek'
                }, {
                    userId: 2,
                    name: 'Deeksha'
                }, {
                    userId: 3,
                    name: 'Kuldeep'
                }, {
                    userId: 4,
                    name: 'Lokesh'
                }, {
                    userId: 5,
                    name: 'Shubham'
                }];
                $scope.createEditProject = _submitEvent;
                
                function _submitEvent() {
                    console.log($scope.project)
                }
            }],
            link: function(scope) {

            }
        };
    });