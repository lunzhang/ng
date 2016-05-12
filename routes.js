app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/info');
    
    $stateProvider
  .state('info', {
        url: '/info',
        templateUrl: 'templates/info.view.html',
        controller: 'infoController'
    })
  .state('blog', {
        url: '/blog',
        templateUrl: 'templates/blog.view.html',
        controller: 'blogController'
    })
  .state('socket', {
        url: '/socket',
        templateUrl: 'templates/socket.view.html',
        controller: 'socketController'
    })
   .state('d3', {
        url: '/d3',
        templateUrl: 'templates/d3.view.html',
        controller: 'd3Controller'
    })
    .state('babylon', {
        url: '/babylon',
        templateUrl: 'templates/babylon.view.html',
        controller: 'babylonController'
    })
    .state('flappypig', {
        url: '/flappypig',
        templateUrl: 'templates/flappypig.view.html',
        controller: 'flappypigController'
    })
     .state('nike', {
        url: '/nike',
        templateUrl: 'templates/nike.view.html',
        controller: 'nikeController'
    })
    .state('login', {
        url: '/login',
        templateUrl: 'auth/templates/login.view.html',
        controller: 'loginController'
    })
    .state('register', {
        url: '/register',
        templateUrl: 'auth/templates/register.view.html',
        controller: 'registerController'
    })
    .state('profile', {
        url: '/profile',
        templateUrl: 'auth/templates/profile.view.html',
        controller: 'profileController',
        resolve: { authenticate: authenticate }
    });
    
    function authenticate($q, authentication, $state,$timeout) {
        if (authentication.isLoggedIn()) {
            return $q.when()
        } else {
            $timeout(function () {
                $state.go('login')
            })
            return $q.reject()
        }
    }
});

