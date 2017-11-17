$Myapp.controller("LoginController", function ($scope, EmpApi) {
    $scope.isLogin = false;
    $scope.UserName = null;
    $scope.Pass = null;
    $scope.Login = function () {
        var empToLogin = {
            'USERNAME': $scope.UserName,
            'PASS': $scope.Pass
        };
        EmpApi.Login(empToLogin)
            .success(function (response) {
                alert("Xin chao " + empToLogin.USERNAME);
                window.$IsLogin = true;
                $scope.isLogin = true;
            })
            .error(function (response) {
                alert("Sai Tên Đăng Nhập Hoặc Mật Khẩu!!");
                $scope.UserName = null;
                $scope.Pass = null;
            });
    };
    $scope.Logout = function () {
        isLogin = !isLogin;
    };
});