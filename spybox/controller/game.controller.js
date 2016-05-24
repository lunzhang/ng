app.controller('spyboxGameController', ['$scope', '$state', 'spy', function ($scope, $state, spy) {
        
        var socket = spy.socket;
        var textarea = $('#input-box');
        var messageBox = $('#message-box');
        $scope.messages = [];
        $scope.spy = spy;
        
        socket.on('room', function (room) {
            spy.room = room;
            $scope.$apply();
        });
                
        socket.on('message', function (msg) {
            $scope.messages.push(msg);
            $scope.$apply();
        });
        
        socket.on('kick', function (name) {
            if (spy.username == name) {
                $scope.leaveBox();
                spy.event = 'You got kicked';
            }
        });

        textarea.on('keydown', function (event) {
            if (event.keyCode == 13 && !event.shiftKey) {
                socket.emit('message', {
                    roomId : spy.roomId,
                    message: textarea.val()
                });
                textarea.val('');
                return false;
            }
        });
        
        $scope.kickSpy = function (name){
            socket.emit('kick', {
                roomId: spy.roomId,
                name:name
            });
        }

        $scope.leaveBox = function () {
            socket.removeListener('room');
            socket.removeListener('message');
            socket.removeListener('kick');
            socket.emit('leave', {
                roomId: spy.roomId
            });
            spy.roomId = undefined;
            spy.room = undefined;
            $state.go('spyboxmenu');
        }
    
        $scope.startGame = function () { 
            socket.emit('start', spy.roomId);
        }
    }]);