 /// <reference path="E:\Web\Ban hang\EmployeeApp\EmployeeApp\Scripts\angular.js" />

var EmployeeService = angular.module('EmployeeService', []);

EmployeeService.factory('EmpApi',
    function($http) {
        var urlBase = "http://localhost:64122/api";
        var EmpApi = {};

        //get list all employee
        EmpApi.getEmployees = function() {
            return $http.get(urlBase + '/C_NHANVIEN');
        };
        //add new employee
        EmpApi.AddEmployee = function(emp) {

            return $http.post(urlBase + '/C_NHANVIEN', emp);

        }

        //edit employee
        EmpApi.EditEmployee = function(empToUpdate) {
            var request = $http({
                method: 'put',
                url: urlBase + '/C_NHANVIEN' + empToUpdate.MANV,
                data: empToUpdate
            });
            return request;
        };


        return EmpApi;
    });