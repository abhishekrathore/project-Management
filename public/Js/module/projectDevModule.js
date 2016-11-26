angular.module('projectDev', ['ui.router', 'ngMaterial', 'ui-notification', 'ngFileUpload'])
    .config(['$mdThemingProvider', '$stateProvider', '$urlRouterProvider','$httpProvider', function($mdThemingProvider, $stateProvider, $urlRouterProvider,$httpProvider) {
            // Configure a dark theme with primary foreground yellow
            $mdThemingProvider.theme('docs-dark')
                .primaryPalette('yellow')
                .dark()
                .primaryPalette('pink')
                .accentPalette('red');
            $mdThemingProvider.alwaysWatchTheme(true);
            $stateProvider.state('signin', {
                url: '/signin',
                templateUrl: 'views/LoginSignUpPage.html',
                controller: 'loginSignupCtrl',
                resolve : {
                	authVerify : function () {
                		console.log('vj')
                	}
                }
            });
            $stateProvider.state('projectPanel', {
                url: '/projectPanel',
                templateUrl: 'views/projectPanel.html',
                controller: 'projectPanelCtrl',
                controllerAs : 'projectPanel',
                resolve : {
                	authVerify : function () {
                		console.log('vj')
                	}
                }
            });
            $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
            $urlRouterProvider.otherwise('/projectPanel');
    }]);