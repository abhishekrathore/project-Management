angular.module('projectDev')
    .service('serverRequestService', serverRequestService);
serverRequestService.$inject = ['$http', '$q', 'Upload', 'Notification', '$state', '$mdDialog', 'SERVER_REQUEST_SERVICE_API_OBJECT'];
// Project Dev Controller
function serverRequestService($http, $q, Upload, Notification, $state, $mdDialog, SERVER_REQUEST_SERVICE_API_OBJECT) {
    var _THIS = this,
        OK = 'ok',
        FAIL = 'fail'
    UNAUTHORIZED = 'unauthorized',
        NOACCESS = 'noaccess';
    _THIS.deleteDocument = _deleteDocument;
    _THIS.upload = _upload;
    _THIS.getDocument = _getDocument;
    _THIS.serverRequest = _serverRequest;
    _THIS.serverError = _serverError;
    _THIS.showNotification = _showNotification;
    _THIS.authCheck = _authCheck;
    _THIS.errorById = _errorById;
    // Server Error Function
    function _serverError(res) {};
    // Method for Do Server Request
    function _serverRequest(url, method, postData, isAuthenticateFlag) {
        var defer = $q.defer();
        var data = postData || '';
        $http({
            method: method,
            url: url,
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function(res) {
            if (res.status === OK) {
                defer.resolve(res);
            } else if (res.status === UNAUTHORIZED && !isAuthenticateFlag) {
                $mdDialog.cancel();
                $state.go('signin')
                defer.reject(res);
            } else if (res.status === NOACCESS) {
                $mdDialog.cancel();
                $state.go('noAccessUser');
                defer.resolve(res);
            } else {
                _THIS.serverError(res);
                defer.reject(res);
            }
        }).error(function(res, status, headers, config) {
            _THIS.serverError(res);
            defer.reject(res);
        });
        return defer.promise;
    };
    // Delete Selected Doc
    function _deleteDocument(selectedName, id) {
        var defer = $q.defer();
        var url = SERVER_REQUEST_SERVICE_API_OBJECT.deleteDocument + selectedName + '&id=' + id;
        var deleteDocumentReq = _THIS.serverRequest(url, 'GET').then(function(res) {
            defer.resolve(res);
        }, function(res) {
            defer.reject(res);
        });
        return defer.promise;
    }
    // upload on file select or drop 
    function _upload(file, url, fieldType) {
        var defer = $q.defer();
        if (file) {
            var data = {};
            data.url = url;
            data.data = {};
            data.data[fieldType] = file;
            data.header = {
                'Content-Type': undefined
            };
            Upload.upload(data).then(function(res) {
                if (res && res.data && res.data.status === OK) {
                    defer.resolve(res.data.result);
                } else if (res && res.data && res.data.status === UNAUTHORIZED){
                    $mdDialog.cancel();
                    $state.go('signin')
                    defer.resolve(null);
                } else {
                    defer.resolve(null);
                }
            }, function(res) {
                _THIS.serverError(res);
                defer.resolve(null);
            }, function(evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            });
        }
        return defer.promise;
    };
    // Get Doc Data
    function _getDocument(fileName) {
        var defer = $q.defer();
        $http({
            method: 'GET',
            url: SERVER_REQUEST_SERVICE_API_OBJECT.getDocument + fileName,
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function(res) {
            defer.resolve(res);
        }).error(function(res, status, headers, config) {
            defer.reject(res);
        });
        return defer.promise;
    }

    // user Auth Service 
    function _authCheck() {
        var defer = $q.defer();
        _THIS.serverRequest(SERVER_REQUEST_SERVICE_API_OBJECT.isAuthenticate, 'GET').then(function(res) {
            _THIS.accessFlag = res.result.accessFlag;
            _THIS.userProfilePic = res.result.profileUrl;
            defer.resolve(res);
        }, function(res) {
            $state.go('signin');
            defer.reject(res);
        });
        return defer.promise;
    }
    // local function for show notification
    function _showNotification(type, message, title, delay) {
        Notification[type]({
            message: message,
            title: title,
            delay: delay
        });
    }

    // Error By ID
    function _errorById(res) {
        if (res.status === 'fail' && res.result.kind === 'ObjectId') {
            $state.go('projectPanel');
        }
    }

}
