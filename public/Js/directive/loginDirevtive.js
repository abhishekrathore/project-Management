angular.module('projectDev')
.directive('loginDirective',function(){
	restrict: 'EA';
	return {
	    templateUrl:'views/LoginSignUpPage.html',
	    controller: 'loginSignupCtrl',
        controllerAs : 'login',
		link:function (scope){
		}
	};
});