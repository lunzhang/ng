app.controller('socketController', function($scope) {
  var socket = io();  
  $('form').submit(function(){
    socket.emit('message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });
});
