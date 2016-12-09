angular.module('projectDev')
    .controller('pageMapCtrl', pageMapCtrl);
pageMapCtrl.$inject = ['$scope', 'serverRequestService', '$stateParams', '$location'];
// Project Dev Controller
function pageMapCtrl($scope, serverRequestService, $stateParams, $location) {
    if (!$stateParams.id) { //|| !$stateParams.project
        $location.path('/projectPanel');
    }
    var _THIS = this;
    _THIS.project = {};
    _THIS.screenView = {};
    _THIS.screenView.screenName = '';
    _THIS.screenView.projectId = $stateParams.id;
    _THIS.project = angular.copy($stateParams.project);
    _THIS.renderNewScreen = _renderNewScreen;
    _THIS.uploadScreen = _uploadScreen;
    _THIS.getDocument = serverRequestService.getDocument;
    _THIS.saveScreenView = _saveScreenView;
    _THIS.getScreenDetail = _getScreenDetail;
    _THIS.taskGridHeader = serverRequestService.taskGridHeader;
    serverRequestService.serverRequest('getActiveScreens/' + $stateParams.id, 'GET').then(_getActiveScreens);
    $scope.$watch('screenForm', function(newVal) {
        if (newVal) {
            _renderNewScreen();
        }
    });
    // Render New Screen
    function _renderNewScreen() {
        _THIS.screenView = {};
        _THIS.screenView.projectId = $stateParams.id;
        _THIS.screenImage = null;
        _THIS.disableInput = false;
        _THIS.activeButton = {};
        _THIS.defaultActive = 'dark-grey';
        $scope.screenForm.screenView.$error.required = true;
    }
    // Upload New Screen Shoot
    function _uploadScreen() {
        serverRequestService.upload(_THIS.screenImageVar, '/uploadDocs', 'doc').then(function(res) {
            if (res) {
                _THIS.screenView.docId = res._id;
                _THIS.screenView.docPath = res.docPath;
            }
            _THIS.screenImage = res;
        });
    }
    // Active Screen Api Response
    function _getActiveScreens(res) {
        _THIS.activeScreenArray = res.result;
    }
    // Get Screen Detail
    function _getScreenDetail(index) {
        _THIS.activeButton = {};
        _THIS.activeButton[index] = 'dark-grey';
        _THIS.defaultActive = '';
        serverRequestService.serverRequest('/getScreenDetail/' + _THIS.activeScreenArray[index]._id, 'GET').then(_getScreenDetailResponse);
    }
    // _getScreenDetailResponse
    function _getScreenDetailResponse(res) {
        _THIS.disableInput = true;
        _THIS.screenView = res.result;
        _THIS.screenImage = res.result.docId;
        _THIS.screenView.docId = res.result.docId._id;
        $scope.screenForm.screenView.$error.required = undefined;
        $scope.screenForm.$valid = true;

    }
    // Render New Screen
    function _saveScreenView() {
        if ($scope.screenForm.$valid && !_THIS.screenView._id) {
            serverRequestService.serverRequest('saveScreen/', 'POST', _THIS.screenView).then(function(res) {
                serverRequestService.showNotification('success', 'Porject Screen Save successfully', 'Save', 2000);
                _THIS.activeScreenArray.push(res.result);
                _getScreenDetail(_THIS.activeScreenArray.length - 1);
            });
        } else if ($scope.screenForm.screenName.$valid && _THIS.screenView._id) {
            serverRequestService.serverRequest('updateScreen/' + _THIS.screenView._id, 'PUT', _THIS.screenView).then(function(res) {
                serverRequestService.showNotification('success', 'Porject Screen Update successfully', 'Update', 2000);
            });
        } else {
            $scope.screenForm.$setSubmitted();
        }
    }
}