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
                  '<li>'+
                    '<a href="https://lunzhang.github.io/ng2" target="_self">Ng2</a>'+
                  '</li>'+
                    '<li >'+
                      '<a href="#/projects">Projects</a>'+
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
