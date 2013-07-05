angular.module('mardown', [
])
  .directive('markdown', function () {
    var converter = new Showdown.converter();
    return {
      restrict: 'AE',
      link: function (scope, element, attrs) {
        if (attrs.markdown) {
          scope.$watch(attrs.markdown, function (newVal) {
            var html = converter.makeHtml(newVal);
            element.html(html);
          });
        } else {
          var html = converter.makeHtml(element.text());
          element.html(html);
        }
      }
    };
  });
