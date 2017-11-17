 /// <reference path="E:\Web\Ban hang\EmployeeApp\EmployeeApp\Scripts\angular.js" />

var EmployeeService = angular.module('EmployeeService', []);

EmployeeService.factory('EmpApi',
    function($http) {
        var urlBase = "http://localhost:64122/api";
        var EmpApi = {};
// Nhan Vien
        //get list all employee
        EmpApi.getEmployees = function() {
            return $http.get(urlBase + '/NHANVIEN');
        };
        //add new employee
        EmpApi.AddEmployee = function(emp) {

            return $http.post(urlBase + '/NHANVIEN', emp);

        }

        //edit employee
        EmpApi.EditEmployee = function(empToUpdate) {
            var request = $http({
                method: 'put',
                url: urlBase + '/NHANVIEN/' + empToUpdate.MANV,
                data: empToUpdate
            });
            return request;
        };

        //delete employee
        EmpApi.DeleteEmployee = function (empToDelete) {
            var request = $http({
                method: 'delete',
                url: urlBase + '/NHANVIEN/' + empToDelete.MANV,
            });
            return request;
        };

//Account
        EmpApi.Login = function(user) {
            var request = $http({
                method: 'put',
                url: urlBase + '/ACCOUNTS?USERNAME=' + user.USERNAME + '&PASS=' + user.PASS
            });
            return request;
        };
        return EmpApi;
    });