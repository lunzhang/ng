app.controller('socketController', function($scope) {
  var socket = io.connect('http://live-lunny93.rhcloud.com:8000/');  
  $('form').submit(function(){
    socket.emit('message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });
});
