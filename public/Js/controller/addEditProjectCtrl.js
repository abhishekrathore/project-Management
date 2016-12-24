angular.module('projectDev')
    .controller('addEditProjectCtrl', addEditProjectCtrl);
addEditProjectCtrl.$inject = ['$scope', 'serverRequestService', '$mdDialog', '$q', 'items'];
// Project Dev Controller
function addEditProjectCtrl($scope, serverRequestService, $mdDialog, $q, items) {
    var _THIS = this;
    $scope.project = {};
    $scope.project.documentArray = [];
    $scope.documentArray = [];
    $scope.deleteLogoFlag = true;
    $scope.minDate = new Date();
    $scope.project.startdateCn = $scope.minDate;
    $scope.dateChange = _dateChange;
    serverRequestService.serverRequest('/getDeveloperList', 'GET').then(_setDeveloperDropdown);
    $scope.createEditProject = _saveProjectDetail;
    $scope.closePopup = _closePopup;
    $scope.deleteLogo = _deleteLogo;
    $scope.uploadDocs = _uploadDocs;
    $scope.getDocument = serverRequestService.getDocument;
    $scope.uploadLogo = _uploadLogo;
    $scope.deleteDocs = _deleteDocs;
    $scope.addEditButtonFlag = false;
    $scope.editProjectDetail = _editProjectDetail;
    _fillProjectDetail();
    // Function for Get Project Detail
    function _fillProjectDetail() {
        if (items) {
            $scope.addEditButtonFlag = true;
            serverRequestService.serverRequest('/getProjectDetailByProjectId/' + items, 'GET').then(_getProjectDetail);
        }
    }
    // Success fucntion of Get Project Detail Function
    function _getProjectDetail(res) {
        $scope.project = res.result;
        $scope.project.startdateCn = new Date(res.result.startdate);
        $scope.project.enddateCn = new Date(res.result.enddate);
        $scope.documentArray = angular.copy($scope.project.documentArray);
        $scope.logoImage = $scope.project.logoImageId;
        $scope.projectForm.$setUntouched();
        $scope.projectForm.$setPristine();
    }
    // Fill Developer Drop Down Data Source
    function _setDeveloperDropdown(res) {
        $scope.developerDataSource = res.result;
    }
    // _dateChange Function
    function _dateChange(argument) {
        $scope.minDate = $scope.project.startdateCn;
    }
    // Upload Logo function for click
    function _uploadLogo() {
        $scope.deleteLogoFlag = true;
        $scope.submitDisable = true;
        serverRequestService.upload($scope.logoImageVar, '/uploadDocs', 'doc').then(function(res) {
            if (res) {
                $scope.project.logoImageId = res._id;
            }
            $scope.logoImage = res;
            $scope.submitDisable = false;
        });
    }
    // Close Popup window
    function _closePopup(argument) {
        $mdDialog.cancel();
    }
    // Upload Docs for View
    function _uploadDocs() {
        $scope.deleteLogoFlag = true;
        $scope.submitDisable = true;
        serverRequestService.upload($scope.documentInput, '/uploadDocs', 'doc').then(function(res) {
            if (res) {
                $scope.submitDisable = false;
                $scope.documentArray.push(angular.copy(res));
                $scope.project.documentArray.push(angular.copy(res._id));
            }
        });
    }
    // Delete Docs
    function _deleteDocs(key) {
        if ($scope.documentArray[key]) {
            $scope.deleteLogoFlag = false;
            serverRequestService.deleteDocument($scope.documentArray[key].docName, $scope.documentArray[key]._id).then(function() {
                $scope.documentArray.splice(key, 1);
                $scope.project.documentArray.splice(key, 1);
                $scope.deleteLogoFlag = true;
            });
        }
    }
    // Delete Logo Button at view
    function _deleteLogo() {
        if ($scope.logoImage.docName) {
            $scope.deleteLogoFlag = false;
            serverRequestService.deleteDocument($scope.logoImage.docName, $scope.logoImage._id).then(function() {
                $scope.logoImage = null;
                $scope.project.logoImageId = null;
                $scope.deleteLogoFlag = true;
            });
        }
    }
    // Save Project Detail in DB
    function _saveProjectDetail() {
        if ($scope.projectForm.$valid) {
            $scope.project.startdate = $scope.project.startdateCn;
            $scope.project.enddate = $scope.project.enddateCn;
            serverRequestService.serverRequest('createNewProject', 'POST', $scope.project).then(function(res) {
                serverRequestService.showNotification('success', 'Porject Save successfully', 'Save', 2000);
                $mdDialog.cancel();
            }, function(res) {
                angular.forEach(res.result.errors, function(value) {
                    serverRequestService.showNotification('error', value.message, value.path, 4000);
                });
            });
        } else {
            $scope.projectForm.$setSubmitted();
        }
    }
    // Edit Project Detail in DB 
    function _editProjectDetail() {
        var uploadObj = {};
        if ($scope.projectForm.$valid) {
            $scope.project.startdate = $scope.project.startdateCn;
            $scope.project.enddate = $scope.project.enddateCn;
            serverRequestService.serverRequest('editProjectDetail/' + items, 'PUT', $scope.project).then(function(res) {
                serverRequestService.showNotification('success', 'Porject Update successfully', 'Update', 2000);
                $mdDialog.cancel();
            }, function(res) {
                angular.forEach(res.result.errors, function(value) {
                    serverRequestService.showNotification('error', value.message, value.path, 4000);
                });
            });
        } else {
            $scope.projectForm.$setSubmitted();
        }
    }
}