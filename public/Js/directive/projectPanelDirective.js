angular.module('projectDev')
    .directive('projectPanelDir', function() {
        restrict: 'EA';
        return {
            scope: {

            },
            templateUrl: 'views/projectPanel.html',
            controller: ['$scope', function($scope) {
                $scope.projectDataSource = [{
                    projectId: 1,
                    name: 'Inour'
                }, {
                    projectId: 2,
                    name: 'FireHeart'
                }, {
                    projectId: 3,
                    name: 'The Loha Man'
                }, {
                    projectId: 4,
                    name: 'Sikandar'
                }, {
                    projectId: 5,
                    name: 'Zombie'
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