angular.module('markdown', [
])
  .directive('markdown', function ($http) {
    var converter = new Showdown.converter();
    return {
      restrict: 'AE',
      link: function (scope, element, attrs) {
        if (attrs.src) {
          scope.$watch(attrs.src, function (newVal) {
            $http({method: 'GET', url: newVal}).
            success(function(data, status, headers, config) {
                var html = converter.makeHtml(data);
                element.html(html);
            }).
            error(function(data, status, headers, config) {
                //SOMETHING WITH DEFAULT
            });
          });
        }
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
