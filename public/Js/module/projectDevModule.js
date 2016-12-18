angular.module('projectDev', ['ui.router', 'ngMaterial', 'ui-notification', 'ngFileUpload'])
    .config(['$mdThemingProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider', function($mdThemingProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
        // Configure a dark theme with primary foreground yellow
        var authCheck = ['serverRequestService', function(serverRequestService) {
            serverRequestService.authCheck();
        }];
        $mdThemingProvider.theme('docs-dark')
            .primaryPalette('yellow')
            .dark()
            .primaryPalette('green')
            .accentPalette('lime');
        $mdThemingProvider.theme('dark-grey')
            .primaryPalette('green')
            .dark()
            .primaryPalette('yellow')
            .accentPalette('red');
        $mdThemingProvider.theme('altTheme')
            .primaryPalette('green')
            .primaryPalette('purple')
            .accentPalette('blue');
        $mdThemingProvider.alwaysWatchTheme(true);
        $mdThemingProvider.setDefaultTheme('altTheme');
        $stateProvider.state('signin', {
            url: '/signin',
            templateUrl: 'views/LoginSignUpPage.html',
            controller: 'loginSignupCtrl',
            controllerAs: 'loginView',
            resolve: {
                authVerify: authCheck
            }
        });
        $stateProvider.state('noAccessUser', {
            url: '/noAccessUser',
            templateUrl: 'views/noAccessUser.html'
        });
        $stateProvider.state('projectPanel', {
            url: '/projectPanel',
            templateUrl: 'views/projectPanel.html',
            controller: 'projectPanelCtrl',
            controllerAs: 'projectPanel',
            resolve: {
                authVerify: authCheck
            }
        });
        $stateProvider.state('projectView', {
            url: '/projectPanel/:id',
            templateUrl: 'views/projectView.html',
            controller: 'projectViewCtrl',
            controllerAs: 'projectView',
            params: {
                project: null
            },
            resolve: {
                authVerify: authCheck
            }
        });
        $stateProvider.state('pageMap', {
            url: '/projectPanel/:id/pageMap',
            templateUrl: 'views/pageMap.html',
            controller: 'pageMapCtrl',
            controllerAs: 'pageMap',
            params: {
                project: null
            },
            resolve: {
                authVerify: authCheck
            }
        });
        $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        $urlRouterProvider.otherwise('/projectPanel');
    }]);