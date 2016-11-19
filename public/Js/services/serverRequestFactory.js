angular.module('projectDev')
    .service('serverRequestService', serverRequestService);
serverRequestService.$inject = ['$http', '$q'];
// Project Dev Controller
function serverRequestService($http, $q) {
    var _THIS = this,
    OK = 'ok',
    FAIL = 'fail';
    // Server Error Function
    _THIS.serverError = function (res) {
        console.log(res)
    };
    // Method for Do Server Request
    _THIS.serverRequest = function(url, method, postData) {
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

    
}