var app = angular.module('app', ['ngRoute']);
app.config(function($routeProvider) {
  $routeProvider
  // route for the home page
  .when('/info', {
    templateUrl: 'templates/info.html',
    controller: 'infoController'
  })
  .otherwise({ redirectTo: '/info'});
});
