app.controller('profileController', function ($scope,authentication) { 

    authentication.getProfile()
    .success(function (data) {
        $scope.user = data;
    })
      .error(function (e) {
        console.log(e);
    });
});