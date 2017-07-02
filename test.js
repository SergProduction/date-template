var dateTemplate = require('./index')

for(let i=0; i<20; i++) console.log('logger time', dateTemplate('%ms'), i )
