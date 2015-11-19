app.controller('infoController', function($scope,$interval) {
  //global variables
  var width  = window.innerWidth;
  var height = window.innerHeight;
  var animator;
  var numCircle = 30;
  movingCircle=[0,1];
  $scope.stillCircle = []

  for(var i = 0; i < numCircle;i++){
    $scope.stillCircle.push(createObject());
  }


  //animate the objects in the array
  animator = $interval(function(){
    tick($scope.stillCircle);
  },30);
  function tick(objects) {
    var now = new Date().getTime();
    for (var index = 0; index < 2; index++) {
      var object = objects[movingCircle[index]];
      var elapsed = (object.timestamp || now) - now;
      var maxX = width-object.size;
      var maxY = height-object.size;
      object.timestamp = now;
      object.x += elapsed * object.velX;
      object.y += elapsed * object.velY;
      object.size += object.sizeCounter;
      if(object.size > 50){
        object.sizeCounter = -.05;
      }
      else if(object.size < 1){
          object.sizeCounter = .05;
      }
      if (object.x > maxX || object.x < 0 || object.y > maxY || object.y < 0) {
        var randomCircle = Math.floor(Math.random() * numCircle);
        while(movingCircle.indexOf(randomCircle)>-1){
          randomCircle = Math.floor(Math.random() * numCircle);
        }
        movingCircle[index] = randomCircle;
        var newObject = objects[randomCircle];
        var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        newObject.velX = plusOrMinus * newObject.velX;
        newObject.velY = plusOrMinus * newObject.velY;
        object.x = (Math.random() * maxX);
        object.y = (Math.random() * maxY);
        object.color = 'white';

      }
    }
  };

  //creates an object
  function createObject() {
    var maxVelocity = .05;
    var size = (Math.random() * 20)+5;
    var maxX = width-size;
    var maxY = height-size;
    return {
      size:size,
      sizeCounter:.05,
      color:'white',
      x:(Math.random() * maxX),
      y:(Math.random() * maxY),
      velX:(Math.random() * maxVelocity),
      velY:(Math.random() * maxVelocity)
    };
  };

});
