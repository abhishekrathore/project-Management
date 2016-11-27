angular.module('projectDev')
    .controller('projectPanelCtrl', projectPanelCtrl);
projectPanelCtrl.$inject = ['$scope', 'serverRequestService', '$mdDialog', '$q', '$mdSidenav'];
// Project Dev Controller
function projectPanelCtrl($scope, serverRequestService, $mdDialog, $q, $mdSidenav) {
    var _THIS = this;
    $scope.toggleUserPanel = _toggleUserPanel;
    $scope.giveAccessToUser = _giveAccessToUser;
    $scope.showAddEditProjectPopup = _showAddEditProjectPopup;
    serverRequestService.serverRequest('getActiveProject', 'GET').then(_getActiveProject);
    serverRequestService.serverRequest('getUserWithoutAccess', 'GET').then(_getUserWithoutAccess);
    // Give access to developer user
    function _giveAccessToUser (key) {
        serverRequestService.serverRequest('giveAccessToUser?id=' + $scope.userWithoutAccess[key]._id, 'GET').then(_updateUnaccessUserList(key));
    }
    // update list of un access user/developer
    function _updateUnaccessUserList (key) {
        $scope.userWithoutAccess.splice( key, 1 );
    }
    // toggle right nev panel
    function _toggleUserPanel(navID) {
      $mdSidenav(navID)
                .toggle();
    }
    // User List
    function _getUserWithoutAccess(res) {
        $scope.userWithoutAccess = res.result;
    }
    // Set Grid Data Source
    function _getActiveProject(res) {
        $scope.projectDataSource = res.result;
    }
    // Open Add Edit Project Form
    function _showAddEditProjectPopup(ev, id) {
        $mdDialog.show({
                templateUrl: 'views/projectForm.html',
                targetEvent: ev,
                controller: 'addEditProjectCtrl',
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                fullscreen: true,
                escapeToClose: true,
                locals: {
                    items: id
                }
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';

            }, function() {
                $scope.status = 'You cancelled the dialog.';
                serverRequestService.serverRequest('getActiveProject', 'GET').then(_getActiveProject);
            });
    }
}