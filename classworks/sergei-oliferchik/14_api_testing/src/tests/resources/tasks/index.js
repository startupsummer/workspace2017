const taskFactory = require('./task.factory')

let mandatoryTask = taskFactory.mandatoryTask()
let advancedTask = taskFactory.advancedTask()
let supperAdvancedTask = taskFactory.supperAdvancedTask()

module.exports.mandatoryTask = mandatoryTask;
module.exports.advancedTask = advancedTask;
module.exports.supperAdvancedTask = supperAdvancedTask;
