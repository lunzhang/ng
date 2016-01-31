app.controller('socketController', function($scope,$timeout) {
  var socket = io.connect('http://live-lunny93.rhcloud.com:8000/');
  var textarea = $('#input-box');
  var messageBox = $('#message-box');
  $scope.messages=[];

  textarea.on('keydown',function(event){
    if(event.keyCode == 13 && !event.shiftKey){
      socket.emit('message', textarea.val());
      textarea.val('');
      return false;
    }
  });

  socket.on('message', function(msg){
      $scope.messages.push(msg);
      $scope.$apply();
  });

});
