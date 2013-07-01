'use strict';

angular.module('rest')
  .factory('restFactory', function ($http) {
    /*
     * resource offers both an api to fetch data and containers to read them
     * from.
     */
    return {
      resource: function(resource, options) {

        var data = {
            current: {},
            list: [],
            index: {},
        };

        data.api = {
          get: function (params, callback) {
            data.current = data.index[params[options.uid]];
          },
          query: function (params, callback) {
            $http.get(resource)
              .success(function (resp) {
                  if (resp.status != 200) {
                  } else {
                    data.list = resp.data;
                    angular.forEach(resp.data, function (value) {
                      console.log('INDEX', value[options.uid], value);
                      data.index[value[options.uid]] = value;
                    });
                    console.log('DATA', data);
                  }
                })
              .error(function (resp) {
                    console.log('ERROR', resp);
              });
          },
        };

        data.api.query();

        return data;
      }
    }
  });
