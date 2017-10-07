/// <reference path="E:\Web\Ban hang\EmployeeApp\EmployeeApp\Scripts\angular.js" />

var myapp = angular.module("myapp", ['ngRoute', 'EmployeeService']);

myapp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/Add',
            {
                templateUrl: 'Views/add.html',
                controller: 'AddController'
            }).when('/Edit',
            {
                templateUrl: 'Views/edit.html',
                controller: 'EditController'
            }).when('/Delete',
            {
                templateUrl: 'Views/delete.html',
                controller: 'DeleteController'
            }).when('/Home',
            {
                templateUrl: 'Views/home.html',
                controller: 'HomeController'
            }).otherwise({
                redirectTo: '/Home'
            });
    }
]);

myapp.controller("AddController",
    function ($scope, EmpApi) {
        $scope.addEmp = function () {
            var empToAdd = {
                'HOTEN': $scope.hoten,
                'GIOITINH': $scope.gioitinh,
                'NGAYSINH': $scope.ngaysinh,
                'DIACHI': $scope.diachi,
                'DIENTHOAI': $scope.dienthoai,
                'CHUCVU': $scope.chucvu

            };
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
    });
myapp.controller("EditController",
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
                    $scope.status = 'Unable to loa emp data' + error.message;
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
        }
    });
myapp.controller("DeleteController",
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

        $scope.DeleteEmp = function() {
            var empToDelete = {
                'MANV': $scope.selectedItem
            };

            EmpApi.DeleteEmployee(empToDelete)
                .success(function(response) {
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
myapp.controller("HomeController", function ($scope, EmpApi) {
    getEmployees();
    function getEmployees() {
        EmpApi.getEmployees().success(function (emps) {
            $scope.emps = emps;
        })
            .error(function (error) {
                $scope.status = 'Unable to load emp data: ' + error.message;
            });
    };

});