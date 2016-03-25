var app = angular.module('app', ['ngRoute','luegg.directives']);

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
  .when('/socket', {
    templateUrl: 'templates/socket.html',
    controller: 'socketController'
    })
   .when('/d3', {
        templateUrl: 'templates/d3.html',
        controller: 'd3Controller'
    })
    .when('/babylon', {
        templateUrl: 'templates/babylon.html',
        controller: 'babylonController'
    })
    .when('/flappypig', {
        templateUrl: 'templates/flappypig.html',
        controller: 'flappypigController'
    })
  .otherwise({ redirectTo: '/flappypig'});
});
