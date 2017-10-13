/// <reference path="E:\Web\Ban hang\EmployeeApp\EmployeeApp\Scripts\angular.js" />

(function (angular) {
    window.$Myapp = angular.module("myapp", ['ngRoute', 'EmployeeService','validation']);

 $Myapp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/AddEmployee',
            {
                templateUrl: 'form/add.employee.html',
                controller: 'AddEmployeeController'
            }).when('/EditEmployee',
            {
                templateUrl: 'form/edit.employee.html',
                controller: 'EditEmployeeController'
            }).when('/DeleteEmployee',
            {
                templateUrl: 'form/delete.employee.html',
                controller: 'DeleteEmployeeController'
            }).when('/ListEmployee',
            {
                templateUrl: 'form/list.employee.html',
                controller: 'ListEmployeeController'
            }).otherwise({
                redirectTo: '/ListEmployee'
            });
    }
]);
})(window.angular);
