app.controller('infoController', function($scope,$interval,$document) {
  //global variables
  var width  = jQuery(document).outerWidth();
  var height = jQuery(document).outerHeight();

  var area = width*height;
  if(area<750000){
    var numCircle = 10;
  }
  else{
    var numCircle = 22;
  }
  var animator;

  $scope.$watch( function(){
    return jQuery(document).outerHeight();
  }, function(value) {
    height = value;
    $scope.circles = [];
    addObjects(numCircle);
  });

  $scope.$watch( function(){
    return jQuery(document).outerWidth();
  }, function(value) {
    width = value;
    $scope.circles = [];
    addObjects(numCircle);
  });

  $scope.circles = [];

  addObjects(numCircle);

  //animate the objects in the array
  animator = $interval(function(){
    move($scope.circles);
    collision($scope.circles);
  },30);

  //updates circles location
  function move(objects) {
    for (var index = 0; index < objects.length; index++) {
      var now = new Date().getTime();
      var object = objects[index];
      var elapsed = (object.timestamp || now) - now;
      var maxX = width-object.size;
      var maxY = height-object.size;
      object.timestamp = now;
      object.x += elapsed * object.velX;
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
        object.y = 0;
        object.velY *= -1;
      }
    }
  };

  //check for collision
  function collision(objects){
    for(var index = 0; index < objects.length; index++){
      var object = objects[index];
      object.detectCollision(objects);
    }
  };

  function addObjects(numCircle){
    //populate circles
    for(var id = 0; id < numCircle;id++){
      $scope.circles.push(createObject(id));
    }
  }

  //creates an object
  function createObject(id) {
    var maxVelocity = .1;
    var size = 22;
    var maxX = width-size;
    var maxY = height-size;
    return {
      id:id,
      size:size,
      color:'white',
      x:(Math.random() * maxX),
      y:(Math.random() * maxY),
      maxVelocity: maxVelocity,
      velX:Math.random() * maxVelocity * (Math.random() < 0.5 ? -1 : 1),
      velY:Math.random() * maxVelocity * (Math.random() < 0.5 ? -1 : 1),
      detectCollision: function(objects){
        for(var index = 0; index < objects.length; index++){
          var object = objects[index];
          if(object !=this ){
            var dx = object.x - this.x;
            var dy = object.y - this.y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            var maxDistance = object.size/2 + this.size/2;
            if (distance < maxDistance) {
              while(distance < maxDistance){
                object.x += object.velX;
                object.y += object.velY;
                this.x += this.velX;
                this.y += this.velY;
                dx = object.x - this.x;
                dy = object.y - this.y;
                distance = Math.sqrt(dx * dx + dy * dy);
              }
              this.velX *=-1;
              this.velY *=-1;
              object.velX *=-1;
              object.velY *=-1;
            }
          }
        }
      }
    };
  };

});
