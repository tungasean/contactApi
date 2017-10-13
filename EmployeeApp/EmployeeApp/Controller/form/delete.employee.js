$Myapp.controller("DeleteEmployeeController",
    function ($scope, EmpApi) {
        $scope.selectedItem = "Select Employee";
        $scope.isDeleteItemVisible = false;
        getEmployees();
        function getEmployees() {
            EmpApi.getEmployees().success(function (emps) {
                    $scope.emps = emps;
                })
                .error(function (error) {
                    $scope.status = 'Unable to load emp data: ' + error.message;
                });
        };

        $scope.dropboxitemselected = function (item) {
            $scope.isDeleteItemVisible = true;
            $scope.selectedItem = item.MANV;
            $scope.hoten = item.HOTEN;
            $scope.gioitinh = item.GIOITINH;
            $scope.ngaysinh = item.NGAYSINH;
            $scope.diachi = item.DIACHI;
            $scope.dienthoai = item.DIENTHOAI;
            $scope.chucvu = item.CHUCVU;
        };

        $scope.DeleteEmp = function () {
            var empToDelete = {
                'MANV': $scope.selectedItem
            };

            EmpApi.DeleteEmployee(empToDelete)
                .success(function (response) {
                    alert("user deleted");
                    $scope.hoten = null;
                    $scope.gioitinh = null;
                    $scope.ngaysinh = null;
                    $scope.diachi = null;
                    $scope.dienthoai = null;
                    $scope.chucvu = null;
                    $scope.SelectedItem = "Select Employee";
                    $scope.isDeleteItemVisible = false;
                })
                .error(function (response) {
                    alert("error in deleting");
                });
        };
    });