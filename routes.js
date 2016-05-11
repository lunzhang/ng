app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/info');
    
    $stateProvider
  .state('info', {
        url: '/info',
        templateUrl: 'templates/info.html',
        controller: 'infoController'
    })
  .state('blog', {
        url: '/blog',
        templateUrl: 'templates/blog.html',
        controller: 'blogController'
    })
  .state('socket', {
        url: '/socket',
        templateUrl: 'templates/socket.html',
        controller: 'socketController'
    })
   .state('d3', {
        url: '/d3',
        templateUrl: 'templates/d3.html',
        controller: 'd3Controller'
    })
    .state('babylon', {
        url: '/babylon',
        templateUrl: 'templates/babylon.html',
        controller: 'babylonController'
    })
    .state('flappypig', {
        url: '/flappypig',
        templateUrl: 'templates/flappypig.html',
        controller: 'flappypigController'
    })
     .state('nike', {
        url: '/nike',
        templateUrl: 'templates/nike.html',
        controller: 'nikeController'
    })
    .state('login', {
        url: '/login',
        templateUrl: 'auth/login/login.view.html',
        controller: 'loginController'
    })
    .state('register', {
        url: '/register',
        templateUrl: 'auth/register/register.view.html',
        controller: 'registerController'
    })
    .state('profile', {
        url: '/profile',
        templateUrl: 'auth/profile/profile.view.html',
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

