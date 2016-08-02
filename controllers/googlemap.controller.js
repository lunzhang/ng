app.controller('googlemapController',['$scope', function($scope) {

  var mapProp = {
   center:new google.maps.LatLng(51.508742,-0.120850),
   zoom:5,
   mapTypeId:google.maps.MapTypeId.TERRAIN
 };

 var map=new google.maps.Map($('#map-container')[0],mapProp);

}]);
