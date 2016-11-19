angular.module('projectDev', ['ngRoute', 'ngMaterial', 'ui-notification', 'ngFileUpload'])
    .config(['$mdThemingProvider', function($mdThemingProvider) {
    // Configure a dark theme with primary foreground yellow
    $mdThemingProvider.theme('docs-dark')
      .primaryPalette('yellow')
      .dark()
      .primaryPalette('pink')
      .accentPalette('red');
    $mdThemingProvider.alwaysWatchTheme(true);
  }]);