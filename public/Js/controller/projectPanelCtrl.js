angular.module('projectDev')
    .controller('projectPanelCtrl', projectPanelCtrl);
projectPanelCtrl.$inject = ['serverRequestService', '$mdDialog', '$q', '$mdSidenav', '$mdBottomSheet'];
// Project Dev Controller
function projectPanelCtrl(serverRequestService, $mdDialog, $q, $mdSidenav, $mdBottomSheet) {
    var projectPanel = this;
    projectPanel.headerText = 'Project Panel'
    projectPanel.editFlag = false;
    projectPanel.toggleUserPanel = _toggleUserPanel;
    projectPanel.giveAccessToUser = _giveAccessToUser;
    projectPanel.showAddEditProjectPopup = _showAddEditProjectPopup;
    projectPanel.showProrityProjectTaskView = _showProrityProjectTaskView;
    serverRequestService.serverRequest('getActiveProject', 'GET').then(_getActiveProject);
    serverRequestService.serverRequest('getUserWithoutAccess', 'GET').then(_getUserWithoutAccess);
    // Show Task Panel
    function _showProrityProjectTaskView(ev) {
        $mdDialog.show({
            templateUrl: 'views/projectTaskProrityView.html',
            targetEvent: ev,
            controller: 'projectTaskProrityCtrl',
            controllerAs : 'projectTaskPrority',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            fullscreen: true,
            locals : {
                projectList : projectPanel.projectDataSource
            }
        }).then(function(clickedItem) {
            console.log(clickedItem);
        });
    }
    // Give access to developer user
    function _giveAccessToUser(key) {
        serverRequestService.serverRequest('giveAccessToUser?id=' + projectPanel.userWithoutAccess[key]._id, 'GET').then(_updateUnaccessUserList(key));
    }
    // update list of un access user/developer
    function _updateUnaccessUserList(key) {
        projectPanel.userWithoutAccess.splice(key, 1);
    }
    // toggle right nev panel
    function _toggleUserPanel(navID) {
        $mdSidenav(navID)
            .toggle();
    }
    // User List
    function _getUserWithoutAccess(res) {
        projectPanel.userWithoutAccess = res.result;
    }
    // Set Grid Data Source
    function _getActiveProject(res) {
        projectPanel.projectDataSource = res.result.projectList;
        projectPanel.editFlag = res.result.editFlag;
    }
    // Open Add Edit Project Form
    function _showAddEditProjectPopup(ev, id) {
        $mdDialog.show({
                templateUrl: 'views/projectForm.html',
                targetEvent: ev,
                controller: 'addEditProjectCtrl',
                controllerAs: 'addEdit',
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                fullscreen: false,
                escapeToClose: true,
                locals: {
                    items: id
                }
            })
            .then(function(answer) {
                projectPanel.status = 'You said the information was "' + answer + '".';
            }, function() {
                projectPanel.status = 'You cancelled the dialog.';
                serverRequestService.serverRequest('getActiveProject', 'GET').then(_getActiveProject);
            });
    }
}
