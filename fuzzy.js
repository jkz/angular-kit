angular.module('fuzzy', [])
/*
 * This filter takes any one or two times and gives a human friendly
 * representation of the difference.
 */
.service('$time', function () {
    /*
    units.second = foo(units.millisecond * 1000, 'second', 'seconds');
    units.minute = foo(units.second * xxx, 'minute', 'minutes');
    units.hour = foo(units.minute * xxx, 'hour', 'hours');
    units.day = foo(units.xxx * xxx, 'day', 'days');
    units.week = foo(units.xxx * xxx, 'week', 'weeks');
    units.month = foo(units.xxx * xxx, 'month', 'months');
    units.year = foo(units.xxx * xxx, 'year', 'years');
    units.decade = foo(units.xxx * xxx, 'decade', 'decades');
    units.century = foo(units.xxx * xxx, 'century', 'centuries');
    */
    var MILLISECOND = 1,
        SECOND = 1000 * MILLISECOND,
        MINUTE = 60 * SECOND,
        HOUR   = 60 * MINUTE,
        DAY    = 24 * HOUR,
        WEEK   = 7 * DAY,
        YEAR   = 365.25 * DAY,
        MONTH  = YEAR / 12,
        DECADE = 10 * YEAR,
        CENTURY = 10 * DECADE,
        MILLENIUM = 10 * CENTURY;
    return {
        MILLISECOND: MILLISECOND,
        SECOND: SECOND,
        MINUTE: MINUTE,
        HOUR: HOUR,
        DAY: DAY,
        WEEK: WEEK,
        YEAR: YEAR,
        MONTH: MONTH,
        DECADE: DECADE,
        CENTURY: CENTURY,
        MILLENIUM: MILLENIUM,

        units: {
          second: {value: SECOND, single: 'second', plural: 'seconds' },
          minute: {value: MINUTE, single: 'minute', plural: 'minutes' },
          hour: {value: HOUR, single: 'hour', plural: 'hours'},
          day: {value: DAY, single: 'day', plural: 'days'},
          week: {value: WEEK, single: 'week', plural: 'weeks'},
          month: {value: MONTH, single: 'month', plural: 'months'},
          year: {value: YEAR, single: 'year', plural: 'years'},
          decade: {value: DECADE, single: 'decade', plural: 'decades'},
          century: {value: CENTURY, single: 'century', plural: 'centuries'},
          millenium: {value: MILLENIUM, single: 'millenium', plural: 'millenia'}
        },

        i18n: {
          present: 'now',
          future: {
            prefix: 'next',
            suffix: 'from now'
          },
          past: {
            prefix: 'last',
            suffix: 'ago'
          }
        },

        MONTHS: {
            full: ["\x00", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            short: ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        },
        DAYS: {
            full: ["\x02", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            short: ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        },

        format: function(date, format, utc) {
            // taken from
            // http://stackoverflow.com/questions/14638018/current-time-formatting-with-javascript
            var MMMM = ["\x00", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var dddd = ["\x02", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

            function ii(i, len) {
                var s = i + "";
                len = len || 2;
                while (s.length < len) {
                    s = "0" + s;
                }
                return s;
            }

            var y = utc ? date.getUTCFullYear() : date.getFullYear();
            format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
            format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
            format = format.replace(/(^|[^\\])y/g, "$1" + y);

            var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
            format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
            format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
            format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
            format = format.replace(/(^|[^\\])M/g, "$1" + M);

            var d = utc ? date.getUTCDate() : date.getDate();
            format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
            format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
            format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
            format = format.replace(/(^|[^\\])d/g, "$1" + d);

            var H = utc ? date.getUTCHours() : date.getHours();
            format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
            format = format.replace(/(^|[^\\])H/g, "$1" + H);

            var h = H > 12 ? H - 12 : H === 0 ? 12 : H;
            format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
            format = format.replace(/(^|[^\\])h/g, "$1" + h);

            var m = utc ? date.getUTCMinutes() : date.getMinutes();
            format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
            format = format.replace(/(^|[^\\])m/g, "$1" + m);

            var s = utc ? date.getUTCSeconds() : date.getSeconds();
            format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
            format = format.replace(/(^|[^\\])s/g, "$1" + s);

            var f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
            format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
            f = Math.round(f / 10);
            format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
            f = Math.round(f / 10);
            format = format.replace(/(^|[^\\])f/g, "$1" + f);

            var T = H < 12 ? "AM" : "PM";
            format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
            format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));

            var t = T.toLowerCase();
            format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
            format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));

            var tz = -date.getTimezoneOffset();
            var K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
            if (!utc) {
                tz = Math.abs(tz);
                var tzHrs = Math.floor(tz / 60);
                var tzMin = tz % 60;
                K += ii(tzHrs) + ":" + ii(tzMin);
            }
            format = format.replace(/(^|[^\\])K/g, "$1" + K);

            var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
            format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
            format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);

            format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
            format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);

            format = format.replace(/\\(.)/g, "$1");

            return format;
        }
    };
})
.factory('fuzzyFilterFactory', function ($time) {
    return function () {
        var pairs = Array.prototype.slice.call(arguments);
        return function (timestamp) {
            var moment = new Date(timestamp);
            var delta = Math.abs(new Date() - moment);
            var format = pairs[pairs.length - 1][0];
            pairs.some(function (el) {
                if (delta < el[0]) {
                    format = el[1];
                    return true;
                }
            })
            return $time.format(moment, format);
        }
    }
})
.filter('fuzzydelta', function ($time) {
  return function (then, now) {
    var is_now = !!now;

    then = then ? new Date(then) : new Date();
    now = now ? new Date(now) : new Date();

    var delta = Math.abs(now - then),
        direction = then > now ? $time.i18n.future : $time.i18n.past;

    if (delta < $time.SECOND) {
      return $time.i18n.present;
    }

    var unit = delta < $time.MINUTE && $time.units.second ||
               delta < $time.HOUR && $time.units.minute ||
               delta < $time.DAY && $time.units.hour ||
               delta < $time.WEEK && $time.units.day ||
               delta < $time.WEEK * 4 && $time.units.week ||
               delta < $time.YEAR && $time.units.month ||
               delta < $time.DECADE && $time.units.year ||
               delta < $time.CENTURY && $time.units.decade ||
               delta < $time.MILLENIUM && $time.units.century ||
               $time.units.millenium;

    var count = Math.floor(delta / unit.value);

    return count <= 1 ?
           'a ' + unit.single + ' ' + direction.suffix :
           count.toString() + ' ' + unit.plural + ' ' + direction.suffix;
  };
})

.filter('fuzzymoment', function ($time, fuzzyFilterFactory) {
    return fuzzyFilterFactory(
        [$time.DAY, 'HH:MM'],
        [$time.WEEK, 'dddd'],
        [$time.YEAR, 'dd MMMM'],
        ['MMMM']
    );
})
;

