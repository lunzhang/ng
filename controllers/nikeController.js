app.controller('nikeController', function ($scope, $window, $http) {
    
    var oldShoes = $window.localStorage.getItem('oldShoes');
    var currentShoes = [];
    var newShoes = [];
    var dataURL = 'http://store.nike.com/html-services/gridwallData?country=US&lang_locale=en_US&gridwallPath=mens-clearance-shoes/47Z7puZoi3&sortOrder=publishdate|desc';
    var counter = 0;
    
    if (oldShoes.length > 0) {
        oldShoes = JSON.parse(oldShoes);
    }
        
    getShoes(dataURL);

    function getShoes(url) {
      
        $.ajax({
            url: url,
            dataType: 'JSONP',
            jsonpCallback: 'callback',
            type: 'GET',
            success: function (data) {

                if (data.nextPageDataService && counter < 10) {
                    dataURL = data.nextPageDataService;
                    currentShoes = currentShoes.concat(data.sections[0].products);
                    getShoes(dataURL);
                    counter++;
                }
                else {                    
                    $window.localStorage.setItem('oldShoes', JSON.stringify(currentShoes));                    
                    
                    for (var i = 0; i < currentShoes.length; i++) {
                        if (currentShoes[i].title != oldShoes[i].title) {
                            newShoes.push(currentShoes[i]);
                        }
                    }

                    $scope.oldShoes = oldShoes;
                    $scope.newShoes = newShoes;
                    $scope.currentShoes = currentShoes;
                    $scope.showCurrent = true;
                    $scope.showNew = false;
                    $scope.$apply();
                 
                }
            }
        });

    }

    $scope.toggleShoes = function (){
        if ($scope.showCurrent) {
            $scope.showCurrent = false;
            $scope.showNew = true;
        }
        else {
            $scope.showNew = false;
            $scope.showCurrent = true;
        }

    }






});
