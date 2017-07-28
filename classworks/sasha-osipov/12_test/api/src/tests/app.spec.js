const { tasks } = require('./resources/tasks')
const { users } = require('./resources/users')

const test = async () => {
    await Promise.resolve(tasks())
    await Promise.resolve(users())
}

test()



