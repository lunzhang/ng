app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/info');

    $stateProvider
    .state('info', {
        url: '/info',
        templateUrl: 'templates/info.view.html',
        controller: 'infoController'
    })
  .state('googlemap', {
        url: '/googlemap',
        templateUrl: 'templates/googlemap.view.html',
        controller: 'googlemapController'
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
    })
    .state('spyboxmenu', {
        url:'/spybox/menu',
        templateUrl: 'spybox/template/menu.view.html',
        controller: 'spyboxMenuController',
        resolve: {authenticate:spyboxAuthenticate}
    })
    .state('spyboxgame', {
        url: '/spybox/game',
        templateUrl: 'spybox/template/game.view.html',
        controller: 'spyboxGameController',
        resolve: { authenticate: spyboxAuthenticate }
    })
    .state('spyboxlogin', {
        url: '/spybox/login',
        templateUrl: 'spybox/template/login.view.html',
        controller: 'spyboxLoginController'
    });

    function spyboxAuthenticate($q, spy, $state, $timeout){
        if (spy.isLoggedIn()) {
            return $q.when();
        } else {
            $timeout(function () {
                $state.go('spyboxlogin')
            })
            return $q.reject();
        }
    }

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
