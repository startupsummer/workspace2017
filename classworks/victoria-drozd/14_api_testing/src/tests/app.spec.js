require('app-module-path').addPath(`${__dirname}/../`)
const staffIndex = require('./resources/staff/index')
const tasksIndex = require('./resources/tasks/index')

const user = staffIndex()
tasksIndex(user)
