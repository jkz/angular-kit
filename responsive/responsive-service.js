angular.module('responsive')
  .service('responsive', function ($window, $rootScope) {
    var service = {
      width: undefined,
      height: undefined,
      ratio: undefined,  // width : height
      orientation: undefined,
    };

  /*
     {
      breakpoints: {
        width: {
          tiny: 320,
          small: 480,
          medium: 768,
          large: 1024,
          huge: 1280,
        },
      },
      grow = [],
      shrink = [],
      addBreakpoint: function ( breakpoint ) {
        var defaults = {
          name: undefined,
          min: undefined,
          max: undefined,
        }
        if (breakpoints[breakpoint.name]
            || (breakpoint.min === undefined
            && breakpoint.max === undefined)) {
          return;
        } else if (breakpoint.min !== undefined) {
          service.grow.push(breakpoint);
          service.sort(function (x, y) { return x.min - y.min });
        } else if (breakpoint.max !== undefined) {
          service.shrink.push(breakpoint) = breakpoint;
          service.sort(function (x, y) { return x.max - y.max });
        }
        service.breakpoints[name] = breakpoint;
      },
      removeBreakpoint: function ( name ) {
        var breakpoint = breakpoints[name]

        if (!breakpoint) {
          return;
        }

        function removeFromArray(array, el) {
          var index = array.indexOf(el);
          if (index > -1) {
            array.splice(index, 1);
          }
        }

        removeFromArray(breakpoints.grow, breakpoint);
        removeFromArray(breakpoints.shrink, breakpoint);
        delete breakpoints[name];
      }
    };
    */

    function updateSize() {
      scope.$apply(function () {
        scope.width = $($window).width();
        scope.height = $($window).height();
        scope.ratio = scope.width / scope.height;
        scope.orientation = scope.ratio > 1 ? 'landscape' : 'portrait';
      }
    }

    angular.element($window).bind('resize', updateSize);

});
