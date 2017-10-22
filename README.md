# date-template

1. Easy function of -30 lines of code
1. Date output in any format
1. Change the date type
1. No dependencies
 
### install
```$ npm install -S date-template```

### template

- ```%Y``` Year ****
- ```%M``` Month, from 1 to 12
- ```%D``` Day, from 1 to 31
- ```%Dw``` Day of the week 0-sunday, 6-saturday
- ```%h``` hourse
- ```%m``` minutes
- ```%s``` seconds
- ```%ms``` milliseconds
- ```%0``` [special prefix](#special-prefix) for all template types

### use

##### one parameter - template string

```javascript
var dateTemplate = require('date-template')

// return new Date

dateTemplate('%h:%m:%s')
// "20:9:7"

dateTemplate('%0h:%0m:%0s')
// "20:09:07"

dateTemplate('%h/%m/%s')
// "20/9/7"

dateTemplate('hourse:%h minutes:%m seconds:%s')
// "hourse:22 minutes:9 seconds:7"

dateTemplate('%0h:WOW:%0m')
// "20:WOW:09"
```

##### two parameters - Date object

```javascript
var dateTemplate = require('date-template')

// return other Date

var oldDate = new Date()
oldDate.setHours(oldDate.getHours() -3)

dateTemplate('%0h:%0m:%0s', oldDate)
// "17:09:07"

var milliseconds = +new Date()
// 1499015643673

dateTemplate('%0h:%0m:%0s', milliseconds)
// "20:14:03"

dateTemplate('%M %D %Y, %h:%m:%s', '2017-07-10T14:11:34+0300')
// "7 10 2017, 14:11:34"
```

##### three parameters - middleware function

middleware mount
```javascript
var dateTemplate = require('date-template')

// return Date to user format

var middlewareMount = (date) => {
  var mounth = [
    null,
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  date.M.value = mounth[ date.M.value ]
  return date
}

dateTemplate('Today is ~M~ ~D~, ~Y~', false, middlewareMount)
// "Today is July 2, 2017"
```

middleware Am/Pm
```javascript
var middlewareAmPm = (date) => {
  date.ampm = {
    key: /%am:pm/g,
    value: date.h.value / 12 > 1
      ? 'pm'
      : 'am'
  }

  date.h.value = date.h.value / 12 > 1
    ? date.h.value - 12
    : date.h.value

  return date
}

dateTemplate('%h:%0m %am:pm', false, middlewareAmPm)
// 8:09 pm
```

##### special prefix
```javascript
dateTemplate('%h:%m:%s')
// 9:9:9
dateTemplate('%0h:%0m:%0s')
// 09:09:09
```

### [benchmark](https://benchmarkjs.com/) compare moment js
[node js test](https://github.com/SergProduction/date-template/blob/master/test-benchmark.js)
```
dateTemplate("%M %D %Y, %h:%m:%s") x 162,318 ops/sec ±5.79% (83 runs sampled)

moment().format("MMMM Do YYYY, h:mm:ss a") x 104,363 ops/sec ±9.36% (77 runs sampled)

Fastest is dateTemplate("%M %D %Y, %h:%m:%s")
```

### source code
```javascript
var dateTemplate = function ( format, oldDate, middleware ) {
  var date = oldDate ? new Date(oldDate) : new Date();
  var tmp = {
    Y:  { key: /%0?Y/g,   value: date.getFullYear(),     }, // Year ****
    M:  { key: /%0?M/g,   value: date.getMonth() + 1,    }, // Month, from 1 to 12
    D:  { key: /%0?D/g,   value: date.getDate(),         }, // Day, from 1 to 31
    Dw: { key: /%0?Dw/g,  value: date.getDay(),          }, // Day of the week 0-sunday, 6-saturday
    h:  { key: /%0?h/g,   value: date.getHours(),        }, // hourse
    m:  { key: /%0?m/g,   value: date.getMinutes(),      }, // minutes;
    s:  { key: /%0?s/g,   value: date.getSeconds(),      }, // seconds
    ms: { key: /%0?ms/g,  value: date.getMilliseconds(), }, // milliseconds
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
```