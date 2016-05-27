app.controller('spyboxGameController', ['$scope', '$state', 'spy', function ($scope, $state, spy) {
        
        var socket = spy.socket;
        var textarea = $('#input-box');
        var messageBox = $('#message-box');
        var timer;
        $scope.gameStart = false;
        $scope.messages = [];
        $scope.spy = spy;
        var vote;

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
        
        socket.on('start', function (data) {
            $scope.timeLeft = 15;
            $scope.rotation = 0;
            $scope.gameStart = true;
            $scope.wordsBox = data.wordsBox;
            $scope.currentInterrogater = spy.room[0];
            if (spy.username == data.spy.name) {
                $scope.note = "You are the spy";
            }
            else {
                $scope.note = $scope.wordsBox.word;
            }
            $scope.$apply();
            timer = setInterval(function () {
                if ($scope.timeLeft > 1) {
                    $scope.timeLeft--;
                }
                else {
                    $scope.currentInterrogater = spy.room[spy.room.indexOf($scope.currentInterrogater) + 1];
                    if (!$scope.currentInterrogater) {
                        $scope.currentInterrogater = spy.room[0];
                        $scope.rotation += 1;
                    }
                    if ($scope.rotation == 2) {
                        $scope.hurry = "You have 10 seconds to make a decision";
                        $scope.timeLeft = 10;
                        $scope.rotation += 1;
                    } else if ($scope.rotation > 2) {
                        socket.emit('end', {    
                            roomId: spy.roomId,
                            forced: false
                        });
                    } else {
                        $scope.timeLeft = 15;
                    }
                }
           
                $scope.$apply();
            }, 1000);
        });
        
        socket.on('end', function (note) {
            clearInterval(timer);
            $scope.note = note;
            $scope.gameStart = false;
            $scope.wordsBox = {};
            $scope.$apply();
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
            socket.removeListener('start');
            socket.removeListener('end');
            socket.emit('leave', {
                roomId: spy.roomId
            });
            spy.roomId = undefined;
            spy.room = undefined;
            clearInterval(timer);
            $state.go('spyboxmenu');
        }
    
        $scope.startGame = function () {
            socket.emit('start', spy.roomId);
        }
        
        $scope.stopGame = function (){
            socket.emit('end', {
                roomId: spy.roomId,
                forced:true 
            });
        }

        $scope.voteSpy = function (name){
            if (vote) {
                socket.emit('vote', {
                    roomId : spy.roomId,
                    voter: spy.username,
                    voted: name,
                    prevVote:vote
                });
            } else {
                socket.emit('vote', {
                    roomId : spy.roomId,
                    voter: spy.username,
                    voted: name
                });
            }
            vote = name;
        }

    }]);