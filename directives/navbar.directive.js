app.directive('navbar', function () {
  return {
    restrict:'E',
    template: function(scope,element,attr){
      return '<nav class="navbar navbar-inverse navbar-fixed-top">'+
                  '<div class="container-fluid">'+
                    '<div class="navbar-header">'+
                      '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse">'+
                        '<span class="sr-only">Toggle navigation</span>'+
                        '<span class="icon-bar"></span>'+
                        '<span class="icon-bar"></span>'+
                        '<span class="icon-bar"></span>'+
                      '</button>'+
                    '</div>'+
                '<div class="collapse navbar-collapse" id="navbar-collapse">'+
                  '<ul class="nav navbar-nav navbar-right">'+
                  '<li>'+
                    '<a href="#/info">Home</a>'+
                  '</li>'+
                    '<li >'+
                      '<a href="#/flappypig">FlappyPig</a>'+
                    '</li>'+
                    '<li >'+
                      '<a href="#/nike">Nike</a>'+
                    '</li>'+
                    '<li >'+
                      '<a href="#/spybox/login">SpyBox</a>'+
                    '</li>'+
                    '<li >'+
                      '<a href="#/googlemap">GoogleMap</a>'+
                    '</li>'+
                    '<li>'+
                      '<a href="Lun.Zhang.Resume.pdf">Resume</a>'+
                    '</li>'+
                  '</ul>'+
                '</div>'+
              '</div>'+
            '</nav>';
    }
  };
});
