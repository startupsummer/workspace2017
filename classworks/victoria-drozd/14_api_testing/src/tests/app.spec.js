require('app-module-path').addPath(`${__dirname}/../`)
const testStaff = require('./resources/staff')
const testTasks = require('./resources/tasks')


testStaff()
testTasks()