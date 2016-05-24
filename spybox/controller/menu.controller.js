app.controller('spyboxMenuController', ['$scope', '$state', 'spy', function ($scope, $state, spy) {
        
        var socket = spy.socket;
        $scope.event = spy.event;
        $scope.username = spy.username;
        
        $scope.createRoom = function () {
            socket.emit('create');
        }
        
        $scope.joinRoom = function () {
            socket.emit('join', {
                roomId: $scope.roomId
            });
        }
        
        socket.on('roomId', function (data) {
            spy.room = data.room;
            spy.roomId = data.roomId;
            goInBox();
        });

        socket.on('room', function (room) {
            spy.roomId = $scope.roomId;
            spy.room = room;
            goInBox();
        });

        function goInBox(){
            socket.removeListener('roomId');
            socket.removeListener('room');
            $state.go('spyboxgame');
        }

        $scope.$watch(function () {
            return spy.event;
        }, function (newValue, oldValue) {
            $scope.event = spy.event;
        });

    }]);