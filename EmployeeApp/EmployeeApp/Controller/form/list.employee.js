$Myapp.controller("ListEmployeeController", function ($scope, EmpApi) {
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