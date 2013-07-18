angular.module('fuzzy', [])
/*
 * This filter takes any one or two times and gives a human friendly
 * representation of the difference.
 */
.filter('fuzzytime', function () {
    //TODO config
    var i18n = {
      relative: {
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
      static: {
        present: 'that moment',
        future: {
          suffix: 'later'
        },
        past: {
          suffix: 'earlier'
        }
      }
    };

    var words = i18n.relative;

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

  return function (then, now) {
    var is_now = !!now;

    then = then ? new Date(then) : new Date();
    now = now ? new Date(now) : new Date();


    var delta = Math.abs(now - then),
        direction = then > now ? words.future : words.past;

    console.log('FUZZY', then, now, delta, direction);


    if (delta < SECOND) {
      return words.present;
    }

    var unit = delta < MINUTE && [SECOND, 'second', 'seconds'] ||
               delta < HOUR && [MINUTE, 'minute', 'minutes'] ||
               delta < DAY && [HOUR, 'hour', 'hours'] ||
               delta < WEEK && [DAY, 'day', 'days'] ||
               delta < WEEK * 4 && [WEEK, 'week', 'weeks'] ||
               delta < YEAR && [MONTH, 'month', 'months'] ||
               delta < DECADE && [YEAR, 'year', 'years'] ||
               delta < CENTURY && [DECADE, 'decade', 'decades'] ||
               delta < MILLENIUM && [CENTURY, 'century', 'centuries'] ||
               [MILLENIUM, 'millenium', 'millenia'];

    var count = Math.floor(delta / unit[0]);

    return count <= 1 ?
           //direction.prefix + ' ' + unit[1] :
           'a ' + unit[1] + ' ' + direction.suffix :
           count.toString() + ' ' + unit[2] + ' ' + direction.suffix;
  };
})
;

