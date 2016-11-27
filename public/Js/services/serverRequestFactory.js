angular.module('projectDev')
    .service('serverRequestService', serverRequestService);
serverRequestService.$inject = ['$http', '$q', 'Upload', 'Notification'];
// Project Dev Controller
function serverRequestService($http, $q, Upload, Notification) {
    var _THIS = this,
    OK = 'ok',
    FAIL = 'fail';
    _THIS.deleteDocument = _deleteDocument;
    _THIS.upload = _upload;
    _THIS.getDocument = _getDocument;
    _THIS.serverRequest = _serverRequest;
    _THIS.serverError = _serverError;
    _THIS.showNotification = _showNotification;
    // Server Error Function
    function _serverError (res) {
        console.log(res);
    };
    // Method for Do Server Request
    function _serverRequest (url, method, postData) {
    	var defer = $q.defer();
    	var data = postData || '';
        $http({
            method: method,
            url: url,
            data : data,
            headers : {
                'Content-Type' : 'application/json'
            }
        }).success(function(res) {
        	if(res.status === OK){
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
        var url = 'deleteDocument?name=' + selectedName + '&id=' + id;
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
                if (res && res.data && res.data.status === 'ok') {
                    defer.resolve(res.data.result);
                } else {
                    defer.resolve(null);
                }
            }, function(res) {
                _THIS.serverError(res);
                defer.resolve(null);
            }, function(evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ', progressPercentage, '% ', evt.config.data.logo);
            });
        }
        return defer.promise;
    };
    // Get Doc Data
    function _getDocument(filePath) {
        _THIS.serverRequest('files/' + filePath, 'GET').then(_getDocumentsResponse);
    }
    // function for Get Documents Response
    function _getDocumentsResponse(res) {
        console.log(res.result);
    }
    // local function for show notification
    function _showNotification(type, message, title, delay) {
        Notification[type]({
            message: message,
            title: title,
            delay: delay
        });
    }
    
}