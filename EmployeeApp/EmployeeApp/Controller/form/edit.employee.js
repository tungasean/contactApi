$Myapp.controller("EditEmployeeController",
    function ($scope, EmpApi) {
                $scope.SelectedItem = "Select Employee";
                $scope.isDeleteItemVisible = false;
                getEmployees();

                function getEmployees() {
                    EmpApi.getEmployees()
                        .success(function(emps) {
                            $scope.emps = emps;
                        })
                        .error(function(error) {
                            $scope.status = 'Unable to load emp data' + error.message;
                        });
                };

                $scope.dropboxitemselected = function(item) {
                    $scope.isDeleteItemVisible = true;
                    $scope.SelectedItem = item.MANV;
                    $scope.hoten = item.HOTEN;
                    $scope.gioitinh = item.GIOITINH;
                    $scope.ngaysinh = item.NGAYSINH;
                    $scope.diachi = item.DIACHI;
                    $scope.dienthoai = item.DIENTHOAI;
                    $scope.chucvu = item.CHUCVU;
                };

                $scope.UpdateEmp = function() {
                    var empToUpdate = {
                        'MANV': $scope.SelectedItem,
                        'HOTEN': $scope.hoten,
                        'GIOITINH': $scope.gioitinh,
                        'NGAYSINH': $scope.ngaysinh,
                        'DIACHI': $scope.diachi,
                        'DIENTHOAI': $scope.dienthoai,
                        'CHUCVU': $scope.chucvu
                    };

                    EmpApi.EditEmployee(empToUpdate)
                        .success(function(reponse) {
                            alert("user updated");
                            $scope.hoten = null;
                            $scope.gioitinh = null;
                            $scope.ngaysinh = null;
                            $scope.diachi = null;
                            $scope.dienthoai = null;
                            $scope.chucvu = null;
                            $scope.SelectedItem = "Select Employee";
                            $scope.isDeleteItemVisible = false;
                            getEmployees();
                        })
                        .error(function(response) {
                            alert("error in updating");
                        });
                };
        });