angular.module('projectDev')
    .controller('loginSignupCtrl', loginSignupCtrl);
loginSignupCtrl.$inject = ['serverRequestService', '$window', '$state', '$timeout'];
// Project Dev Controller
function loginSignupCtrl(serverRequestService, $window, $state, $timeout) {
    var loginView = this,
        popupRef,
        count = 0;
    loginView.OpenPopupWindow = _googleSignIn;

    function _googleSignIn() {
        serverRequestService.serverRequest('/userLogin', 'GET');
        popupRef = $window.open("https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2FuserLoginCallback&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.login%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.profile.emails.read&client_id=702764497550-9dt3j01t9pdt0jqfhf44e3f0pcijo5cn.apps.googleusercontent.com", "popup", "width=300,height=200,left=10,top=150");
        _checkLogin()
    }

    function _checkLogin() {
        serverRequestService.serverRequest('/isAuthenticate', 'GET', '', true).then(function(res) {
            popupRef.close();
            if(res.status === 'ok')
            $state.go('projectPanel');
        }, function(res) {
            $timeout(function() {
                _checkLogin()
            }, 1000);
        });
    }
}
