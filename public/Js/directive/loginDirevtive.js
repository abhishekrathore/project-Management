angular.module('projectDev')
.directive('loginDirective',function(){
	restrict: 'EA';
	return {
	    templateUrl:'views/LoginSignUpPage.html',
		link:function (scope){
		}
	};
});