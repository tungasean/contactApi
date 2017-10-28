$Myapp.controller("LoginController", function ($scope, EmpApi) {
    isLogin = false;
    $scope.Login = function () {
        isLogin = !isLogin;
    };
    $scope.Logout = function () {
        isLogin = !isLogin;
    };
});