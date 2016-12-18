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
        popupRef = $window.open('/userLogin', 'popup', 'width=300,height=200,left=10,top=150');
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
