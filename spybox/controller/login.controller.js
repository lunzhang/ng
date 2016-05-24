app.controller('spyboxLoginController', ['$scope','spy','$state', function ($scope,spy,$state) {
        var socket = spy.socket;
        $scope.start = function () {
            if ($scope.username) {
                spy.username = $scope.username;
                socket.emit('spy', spy.username);
                $state.go('spyboxmenu');
            }
            else {
                $('input').focus();
            }
        }
    
    }]);