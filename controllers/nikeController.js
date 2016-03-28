app.controller('nikeController', function ($scope, $window, $http) {
    
    var shoes = [];
    var dataURL = 'http://store.nike.com/html-services/gridwallData?country=US&lang_locale=en_US&gridwallPath=mens-clearance-shoes';
    
    
    getShoes(dataURL);

    function getShoes(url) {
      
        $.ajax({
            url: url,
            dataType: 'JSONP',
            jsonpCallback: 'callback',
            type: 'GET',
            success: function (data) {
                if (data.nextPageDataService) {
                    dataURL = data.nextPageDataService;
                    getShoes(dataURL);
                    console.log(shoes);
                }
                shoes.concat(data.sections[0].products);
            }
        });

    }






});
