//myapp.controller("AddController",
$Myapp.controller("AddEmployeeController", ["$scope","$document",
    function ($scope, element, EmpApi) {
        $scope.addEmp = function () {
            var empToAdd = {
                'HOTEN': $scope.hoten,
                'GIOITINH': $scope.gioitinh,
                'NGAYSINH': $scope.ngaysinh,
                'DIACHI': $scope.diachi,
                'DIENTHOAI': $scope.dienthoai,
                'CHUCVU': $scope.chucvu

            };
            if ($validation.hasInvalid(element)) {
                return;
            }
            EmpApi.AddEmployee(empToAdd)
                .success(function (response) {
                    alert("user added");
                    $scope.hoten = null;
                    $scope.gioitinh = null;
                    $scope.ngaysinh = null;
                    $scope.diachi = null;
                    $scope.dienthoai = null;
                    $scope.chucvu = null;
                }).error(function (response) {
                    alert("error in  adding");
                });
        }
    }]);