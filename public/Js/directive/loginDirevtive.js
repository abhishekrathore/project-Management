angular.module('projectDev')
.directive('loginDirective',function(){
	restrict: 'EA';
	return {
		scope:{
			
		},
	    templateUrl:'views/LoginSignUpPage.html',
		link:function (scope){
		}
	};
});