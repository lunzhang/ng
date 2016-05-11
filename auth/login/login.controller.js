app.controller('loginController', ['$scope','$state','authentication',function ($scope,$state,authentication) { 

    $scope.credentials = {
        email : "",
        password : ""
    };
    
    $scope.onSubmit = function () {
        authentication
        .login($scope.credentials)
        .error(function (err) {
            alert(err);
        })
        .then(function () {
            $state.go('profile');
        });
    };

}]);