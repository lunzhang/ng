app.controller('socketController', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {

        var socket = io.connect('localhost:3000');
        var textarea = $('#input-box');
        var messageBox = $('#message-box');

        textarea.on('keydown', function (event) {
            if (event.keyCode == 13 && !event.shiftKey) {
                socket.emit('message', textarea.val());
                textarea.val('');
                return false;
            }
        });

        socket.on('message', function (msg) {
            $scope.messages.push(msg);
            $scope.$apply();
        });

    }]);
