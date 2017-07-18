console.log('index')

const a = require('./a')
const b = require('./b')
const c = require('./c')

const colors = require('colors/safe')

console.log('c:', c)

a.someFunction()
b.anotherFunction()
b.secondFunction()

console.log(colors.rainbow('OMG Rainbows!'))
