angular.module('projectDev')
.directive('projectHeader',function(){
	restrict: 'EA';
	return {
	    templateUrl:'views/projectHeaderView.html',
	    scope : {
	    	headerText : '=',
	    	isBack : '=',
	    	backEvent : '@'
	    },
	    controller: 'projectHeaderCtrl',
        controllerAs : 'projectHeader',
		link:function (scope, ele, attr, ctrl){
			ctrl.headerText = scope.headerText;
			ctrl.isBack = scope.isBack;
			ctrl.backEvent = scope.backEvent;
		}
	};
});