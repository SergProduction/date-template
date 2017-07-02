var dateTemplate = require('./index')

/*
*one parameter
*/
console.log( dateTemplate('%0h:%0m:%0s') )
// "22:20:07"

console.log( dateTemplate('%h:%m:%s') )
// "22:20:7"

console.log( dateTemplate('%0h/%0m/%0s') )
// "22/20/07"

console.log( dateTemplate('hourse:%0h minutes:%0m seconds:%0s') )
// "hourse:22 minutes:20 seconds:07"

console.log( dateTemplate('%0h:WOW:%0m') )
// "22:WOW:20"

/*
*two parameter
*/
var oldDate = new Date()
oldDate.setHours(-3)

console.log( dateTemplate('%0h:%0m:%0s', oldDate) )
// "19:20:31"

var unixDate = +new Date()
// 1497382646504

console.log( dateTemplate('%0h:%0m:%0s', unixDate) )
// "22:39:03"

/*
*three parameter
*/
var middlewareMounth = (date) => {
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

console.log( dateTemplate('Today is %M %D, %Y', false, middlewareMounth) )
// "Today is June 13, 2017"

var middlewareMounthAmPm = (date) => {
  date.h.value = date.h.value % 12
    ? date.h.value - 12 + 'pm'
    : date.h.value + 'am'
  return date
}
console.log( dateTemplate('%h: %0m', false, middlewareMounthAmPm) )
// 8pm: 24