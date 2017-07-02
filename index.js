/**
 * @function
 * @name dateTemplate
 * @param {string} format - %Y %M %Dw %D %h %m %s %ms, spicial prefix 0 - %0h
 * @param {(number|object)} oldDate - milliseconds time(unix) OR Date object
 * @param {function}  middleware
 * @return {string} date formatatting
**/
var dateTemplate = function ( format, oldDate, middleware ) {
  var date = oldDate ? new Date(oldDate) : new Date();
  var tmp = {
    Y:  { key: /%0?Y/g,   value: date.getFullYear(),      }, // Year ****
    M:  { key: /%0?M/g,   value: date.getMonth() + 1,     }, // Month, from 01 to 12
    D:  { key: /%0?D/g,   value: date.getDate(),          }, // Day, from 01 to 31
    Dw: { key: /%0?Dw/g,  value: date.getDay(),           }, // Day of the week 0-sunday, 6-saturday
    h:  { key: /%0?h/g,   value: date.getHours(),         }, // hourse
    m: { key: /%0?m/g,   value: date.getMinutes(),        }, // minutes;
    s:  { key: /%0?s/g,   value: date.getSeconds(),       }, // seconds
    ms:  { key: /%0?ms/g,  value: date.getMilliseconds(), }, // milliseconds
  }
  tmp = middleware ? middleware(tmp) : tmp
  Object.keys(tmp).forEach(function (el) {
    var current = tmp[el]
    format = format.replace( current.key, function (match) {
      if (match.indexOf('0') !== -1) {
        return String(current.value).length == 1
          ? '0' + current.value
          : current.value
      }
      return current.value
    })
  })
  return format
};

module.exports  = dateTemplate