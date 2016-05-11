app.controller('registerController', function ($scope,$location,authentication) {
 
    $scope.credentials = {
        email : "",
        password : ""
    };
    
    $scope.onSubmit = function () {
        authentication
        .register($scope.credentials)
        .error(function (err) {
            alert(err);
        })
        .then(function (data) {
            console.log(data);
            $state.go('profile');
        });
    };


});
