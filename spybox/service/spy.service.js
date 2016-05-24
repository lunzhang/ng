app.service('spy', ['$rootScope',function ($rootScope) {
        
        this.roomId;
        this.username;
        this.event;
        this.socket = io.connect('localhost:3000');
        var self = this;
        
        this.isLoggedIn = function () {
            if (this.username) {
                return true;
            } else {
                return false;
            }
        }
        
        this.socket.on('disconnect', function () {
            console.log('disconnected client');
        });
        
        this.socket.on('event', function (event) {
            console.log(event);
            self.event = event;
            $rootScope.$apply();
        });
        
    }]);