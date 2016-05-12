app.controller('registerController',['$scope','$state','authentication',function ($scope,$state,authentication) {
 
    $scope.credentials = {
        email : "",
        password : ""
    };
    
    $scope.onSubmit = function () {
        authentication
        .register($scope.credentials)
        .error(function (err) {
                console.log(err);
        })
        .then(function (data) {
            $state.go('profile');
        });
    };


}]);
