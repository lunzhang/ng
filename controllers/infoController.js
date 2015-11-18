app.controller('infoController', function($scope,$interval) {
  //global variables
  var width  = window.innerWidth;
  var height = window.innerHeight;
  var animator;
  var numCircle = 30;
  movingCircle=[0,1,2,3,4];
  $scope.stillCircle = []

  for(var i = 0; i < numCircle;i++){
    $scope.stillCircle.push(createObject());
  }
  for(var i = 0; i < 5;i++){
    $scope.stillCircle[i].color = '#EF2020';
  }

  //animate the objects in the array
  animator = $interval(function(){
    tick($scope.stillCircle);
  },30);
  function tick(objects) {
    var now = new Date().getTime();
    for (var index = 0; index < 5; index++) {
      var object = objects[movingCircle[index]];
      var elapsed = (object.timestamp || now) - now;
      var maxX = width-object.size;
      var maxY = height-object.size;
      object.timestamp = now;
      object.x += elapsed * object.velX;
      object.y += elapsed * object.velY;
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
        newObject.color = '#EF2020';
        object.x = (Math.random() * maxX);
        object.y = (Math.random() * maxY);
        object.color = 'white';

      }
    }
  };

  //creates an object
  function createObject() {
    var maxVelocity = .05;
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
