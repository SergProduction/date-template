const Bench = require('benchmark')
const dateTemplate = require('./index')
const moment = require('moment')

function dateTemplateTest() {
  dateTemplate('%M %D %Y, %h:%m:%s')
}

function momentTest() {
  moment().format('MMMM Do YYYY, h:mm:ss a')
}

const suite = new Bench.Suite

suite
.add('dateTemplate("%M %D %Y, %h:%m:%s")', dateTemplateTest)
.add('moment().format("MMMM Do YYYY, h:mm:ss a")', momentTest)
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run()