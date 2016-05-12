app.controller('nikeController',['$scope','$window','$http',function ($scope, $window, $http) {
    
    var oldShoes = $window.localStorage.getItem('oldShoes');
    var prevNewShoes = $window.localStorage.getItem('prevNewShoes');
    var currentShoes = [];
    var newShoes = [];
    var dataURL = 'http://store.nike.com/html-services/gridwallData?country=US&lang_locale=en_US&gridwallPath=mens-clearance-shoes/47Z7puZoi3&sortOrder=publishdate|desc';
    var counter = 0;
    
    if (!oldShoes) {
        oldShoes = [];
    } else {
        oldShoes = JSON.parse(oldShoes);
    }
    if (!prevNewShoes) {
        prevNewShoes = [];
    } else {
        prevNewShoes = JSON.parse(prevNewShoes);
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
                    for (var i = 0; i < currentShoes.length; i++) {
                        var currentShoe = currentShoes[i];
                        currentShoe.newPrice = parseInt(currentShoe.localPrice.replace('$', ''));
                        currentShoe.oldPrice = parseInt(currentShoe.overriddenLocalPrice.replace('$', ''));  
                        var exist = false;

                        for (var j = 0; j < oldShoes.length; j++) {
                            var oldShoe = oldShoes[j];
                            if (currentShoe.title == oldShoe.title) {
                                exist = true;
                            }
                        }
                        
                        if (!exist) {
                            newShoes.push(currentShoe);
                        }
                    }
                                   
                    if (newShoes.length > 0) {
                        $window.localStorage.setItem('prevNewShoes', JSON.stringify(newShoes));
                        $window.localStorage.setItem('oldShoes', JSON.stringify(currentShoes));  
                    }
                    else {
                        newShoes = prevNewShoes;
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

}]);
