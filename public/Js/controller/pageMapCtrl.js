angular.module('projectDev')
    .controller('pageMapCtrl', pageMapCtrl);
pageMapCtrl.$inject = ['$scope', 'serverRequestService', '$stateParams', '$state', '$mdDialog', '$mdSidenav'];
// Page Maps Controller
function pageMapCtrl($scope, serverRequestService, $stateParams, $state, $mdDialog, $mdSidenav) {
    if (!$stateParams.id) {
        $state.go('projectPanel');
    }
    var pageMap = this;
    pageMap.headerText = 'Project Screens';
    pageMap.project = {};
    pageMap.screenView = {};
    pageMap.screenView.screenName = '';
    pageMap.screenView.projectId = $stateParams.id;
    pageMap.project = angular.copy($stateParams.project);
    pageMap.renderNewScreen = _renderNewScreen;
    pageMap.uploadScreen = _uploadScreen;
    pageMap.getDocument = serverRequestService.getDocument;
    pageMap.saveScreenView = _saveScreenView;
    pageMap.getScreenDetail = _getScreenDetail;
    pageMap.showAddTaskPopup = _showAddTaskPopup;
    pageMap.toggleSideNav = _toggleSideNav;
    serverRequestService.serverRequest('/checkProjectId/' + $stateParams.id, 'GET').then(_getMaxDate,serverRequestService.errorById);
    serverRequestService.serverRequest('getActiveScreens/' + $stateParams.id, 'GET').then(_getActiveScreens, serverRequestService.errorById);
    $scope.$watch('screenForm', function(newVal) {
        if (newVal) {
            _renderNewScreen();
        }
    });
    function _getMaxDate (res) {
        pageMap.maxDate = new Date(res.result.enddate);
    }
    // Render New Screen
    function _renderNewScreen() {
        pageMap.screenView = {};
        pageMap.screenView.projectId = $stateParams.id;
        pageMap.screenImage = null;
        pageMap.disableInput = false;
        pageMap.activeButton = {};
        pageMap.defaultActive = 'dark-grey';
        $scope.screenForm.screenView.$error.required = true;
    }
    // Upload New Screen Shoot
    function _uploadScreen() {
        serverRequestService.upload(pageMap.screenImageVar, '/uploadDocs', 'doc').then(function(res) {
            if (res) {
                pageMap.screenView.docId = res._id;
                pageMap.screenView.docPath = res.docPath;
            }
            pageMap.screenImage = res;
        });
    }
    // Active Screen Api Response
    function _getActiveScreens(res) {
        pageMap.activeScreenArray = res.result;
    }
    // Get Screen Detail
    function _getScreenDetail(index) {
        pageMap.activeButton = {};
        pageMap.activeButton[index] = 'dark-grey';
        pageMap.editIndex = index;
        pageMap.defaultActive = '';
        serverRequestService.serverRequest('/getScreenDetail/' + pageMap.activeScreenArray[index]._id, 'GET').then(_getScreenDetailResponse);
        _getTaskList(pageMap.activeScreenArray[index]._id);
    }
    // _getScreenDetailResponse
    function _getScreenDetailResponse(res) {
        pageMap.disableInput = true;
        pageMap.screenView = res.result;
        pageMap.screenImage = res.result.docId;
        pageMap.screenView.docId = res.result.docId._id;
        $scope.screenForm.screenView.$error.required = undefined;
        $scope.screenForm.$valid = true;
    }
    // Render New Screen
    function _saveScreenView() {
        if ($scope.screenForm.$valid && !pageMap.screenView._id) {
            serverRequestService.serverRequest('saveScreen/', 'POST', pageMap.screenView).then(function(res) {
                serverRequestService.showNotification('success', 'Porject Screen Save successfully', 'Save', 2000);
                pageMap.activeScreenArray.push(res.result);
                _getScreenDetail(pageMap.activeScreenArray.length - 1);
            });
        } else if ($scope.screenForm.screenName.$valid && pageMap.screenView._id) {
            serverRequestService.serverRequest('updateScreen/' + pageMap.screenView._id, 'PUT', pageMap.screenView).then(function(res) {
                serverRequestService.showNotification('success', 'Porject Screen Update successfully', 'Update', 2000);
                pageMap.activeScreenArray[pageMap.editIndex] = pageMap.screenView;
                pageMap.disableInput = true;
            });
        } else {
            $scope.screenForm.$setSubmitted();
        }
    }
    // toggle right nev panel
    function _toggleSideNav(navID) {
        $mdSidenav(navID)
            .toggle();
    }
    // Add Edit Task Window
    // Open Add Edit Project Form
    function _showAddTaskPopup(ev, type, taskDetail) {
        $mdDialog.show({
                templateUrl: 'views/addEditTaskForm.html',
                targetEvent: ev,
                controller: 'addEditTaskCtrl',
                controllerAs: 'addEditTask',
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                fullscreen: false,
                escapeToClose: true,
                locals: {
                    items: {
                        projectId: pageMap.screenView.projectId,
                        type: type,
                        taskDetail: taskDetail,
                        screenId: pageMap.screenView._id,
                        maxDate : pageMap.maxDate
                    }
                }
            })
            .then(function(answer) {
                pageMap.status = 'You said the information was "' + answer + '".';
            }, function() {
                pageMap.status = 'You cancelled the dialog.';
                _getTaskList(pageMap.screenView._id);
            });
    }

    function _getTaskList(screenId) {
        var id = screenId;
        serverRequestService.serverRequest('/getTaskByProjectOrScreenId/' + pageMap.screenView.projectId + '/' + screenId, 'GET').then(_getTaskByProjectOrScreenId);
    }

    function _getTaskByProjectOrScreenId(res) {
        pageMap.eventList = res.result.events;
        pageMap.taskArray = res.result.task;
    }
}