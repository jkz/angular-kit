angular.module('responsive', [
])
  .service('responsive', function ($window, $rootScope) {
    var service = {
      width: undefined,
      height: undefined,
      ratio: undefined,  // width : height
      orientation: undefined
    };

    service.update = function () {
      $rootScope.$apply(function () {
        service.width = $($window).width();
        service.height = $($window).height();
        service.ratio = service.width / service.height;
        service.orientation = service.ratio > 1 ? 'landscape' : 'portrait';
        console.log('$rootScope.update(');
        console.log('    width', service.width);
        console.log('    height', service.height);
        console.log('    ratio', service.ratio);
        console.log('    orientation', service.orientation);
        console.log(')');
      });
    };

    angular.element($window).bind('resize', service.update);

    return service;
  })
  .run( function (responsive) {
    console.log('responsive');
    responsive.update();
  });

