app.controller('infoController', function($scope,$timeout,$interval) {
  //global variables
   var width  = window.innerWidth;
   var height = window.innerHeight;
   var animator;
   $scope.stillCircle = []

   for(var i = 0; i < 30;i++){
     $scope.stillCircle.push(createObject());
   }

   //animate the objects in the array
animator = $interval(function(){
  tick($scope.stillCircle);
},30);
function tick(objects) {
    var now = new Date().getTime();
    for (var index = 0; index < 5; index++) {
      var object = objects[index];
      var elapsed = (object.timestamp || now) - now;
      var maxX = width-object.size;
      var maxY = height-object.size;
      object.timestamp = now;
      object.x += elapsed * object.velX ;
      object.y += elapsed * object.velY;
      if (object.x > maxX) {
        object.x = maxX;
        object.velX *= -1;
      }
      else if (object.x < 0) {
        object.x = 0
        object.velX *= -1;
      }
      if (object.y > maxY) {
        object.y = maxY;
        object.velY *= -1;
      }
      else if (object.y < 0) {
        object.y = 43;
        object.velY *= -1;
      }
    }
  };

   //creates an object
function createObject() {
  var maxVelocity = .15;
  var size = 5;
  var maxX = width-size;
  var maxY = height-size;
  return {
    size:size,
    color:'white',
    x:(Math.random() * maxX),
    y:(Math.random() * maxY),
    velX:(Math.random() * maxVelocity),
    velY:(Math.random() * maxVelocity)
  };
};

});
