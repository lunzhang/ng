app.directive('circle', function () {
  return {
    restrict:'E',
    link:function (scope, element, attribute) {
      scope.$watch(attribute.x, function (x) {
        element.css('left', x + 'px');
      });
      scope.$watch(attribute.y, function (y) {
        element.css('top', y + 'px');
      });
      scope.$watch(attribute.color, function (color) {
        element.css('backgroundColor', color);
      });
      scope.$watch(attribute.size, function (size) {
        element.css('height', size+'px');
        element.css('width', size+'px');
        element.css('border-radius', size+'px');
      });
    }
  };
});
