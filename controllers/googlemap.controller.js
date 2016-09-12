app.controller('googlemapController',['$scope', function($scope) {

  $scope.latitude = 40.764869;
  $scope.longitude = -73.972769;

  var initPosition = {lat:$scope.latitude,lng:$scope.longitude};
  var mapProp = {
    center:initPosition,
    zoom:10,
    mapTypeId:google.maps.MapTypeId.TERRAIN,
    disableDoubleClickZoom:true
  };
  var map=new google.maps.Map($('#map')[0],mapProp);
  var marker = new google.maps.Marker({
    position: initPosition,
    animation: google.maps.Animation.DROP,
    map: map,
    title: 'Current Position',
    draggable:true
  });
  var infowindow = new google.maps.InfoWindow({
    content: getInfoContent()
  });

  marker.addListener('click',function(){
    infowindow.open(map, marker);
  });
  marker.addListener('drag', function(){
    $scope.latitude = marker.getPosition().lat();
    $scope.longitude = marker.getPosition().lng();
    infowindow.setContent(getInfoContent());
    $scope.$apply();
  });

  map.addListener('click',function(e){
    var lat = e.latLng.lat();
    var lng = e.latLng.lng();
    $scope.latitude = lat;
    $scope.longitude = lng;
    marker.setPosition({
      lat:lat,
      lng:lng
    });
    infowindow.setContent(getInfoContent());
    $scope.$apply();
  });

  $scope.positionChanged = function(){
    var lat = parseFloat($scope.latitude);
    var lng = parseFloat($scope.longitude);
    if(lat && lng){
      map.setCenter({
        lat:lat,
        lng:lng
      });
    }
  };

  function getInfoContent(){
    return '<div>Latitude:'+$scope.latitude+'</div>'+
    '<div>Longitude: '+$scope.longitude+'</div>';
  }

}]);
