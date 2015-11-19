var app = angular.module('app', ['ngRoute']);
app.config(function($routeProvider) {
  $routeProvider
  // route for the home page
  .when('/info', {
    templateUrl: 'templates/info.html',
    controller: 'infoController'
  })
  .when('/blog', {
    templateUrl: 'templates/blog.html',
    controller: 'blogController'
  })
  .otherwise({ redirectTo: '/info'});
});
