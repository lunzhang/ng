app.service('authentication', function ($http,$window,user) {
    
    this.saveToken = function (token) {
        user.token=token;
    };
    
    this.getToken = function () {
        return user.token;
    };
    
    this.isLoggedIn = function () {
        var token = this.getToken();
        var payload;
        if (token) {
            payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);
            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };
    
    this.currentUser = function () {
        if (isLoggedIn()) {
            var token = getToken();
            var payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);
            return {
                email : payload.email,
                name : payload.name
            };
        }
    };
    
    this.register = function (user) {
        var that = this;
        return $http.post('/api/register', user).success(function (data) {
            that.saveToken(data.token);
        }); 
    };
    
    this.login = function (user) {
        var that = this;
        return $http.post('/api/login', user).success(function (data) {
            that.saveToken(data.token);
        });
    };
    
    this.logout = function () {
        user.token = undefined;
    };
    
    this.getProfile = function () {
        var that = this;
        return $http.get('/api/profile', {
            headers: {
                Authorization: 'Bearer ' + that.getToken()
            }
        });
    };
    
});