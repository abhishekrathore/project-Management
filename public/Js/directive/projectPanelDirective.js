angular.module('projectDev')
    .directive('projectPanelDir', function() {
        restrict: 'EA';
        return {
            scope: {

            },
            templateUrl: 'views/projectPanel.html',
            controller: ['$scope', '$mdDialog', function($scope, $mdDialog) {
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
                $scope.showAddEditProjectPopup = function(ev) {
                    $mdDialog.show({
                            template: '<md-dialog>' +
                                '<div add-edit-project-dir> </div>'+
                                '</md-dialog>',
                            targetEvent: ev,
                            clickOutsideToClose: false,
                            fullscreen: true,
                            escapeToClose: true
                        })
                        .then(function(answer) {
                            $scope.status = 'You said the information was "' + answer + '".';
                        }, function() {
                            $scope.status = 'You cancelled the dialog.';
                        });
                };

                function _submitEvent() {
                    console.log($scope.project)
                }
            }],
            link: function(scope) {

            }
        };
    });