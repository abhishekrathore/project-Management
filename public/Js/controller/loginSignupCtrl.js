angular.module('projectDev')
    .controller('loginSignupCtrl', loginSignupCtrl);
loginSignupCtrl.$inject = ['serverRequestService', '$window', '$state', '$timeout', 'LOGIN_OR_SIGN_UP_CTRL_API_OBJECT'];
// Project Dev Controller
function loginSignupCtrl(serverRequestService, $window, $state, $timeout, LOGIN_OR_SIGN_UP_CTRL_API_OBJECT) {
    var loginView = this,
        popupRef,
        count = 0;
    loginView.OpenPopupWindow = _googleSignIn;

    function _googleSignIn() {
        popupRef = $window.open(LOGIN_OR_SIGN_UP_CTRL_API_OBJECT.userLogin, 'popup', 'width=300,height=200,left=10,top=150');
        _checkLogin()
    }

    function _checkLogin() {
        serverRequestService.serverRequest(LOGIN_OR_SIGN_UP_CTRL_API_OBJECT.isAuthenticate, 'GET', '', true).then(function(res) {
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
