const Router = require('koa-router')
const router = new Router()

const files = require('./files')

const tasksController = require('./tasks.controller')

router.get('/', tasksController.list)
router.post('/', tasksController.create)

router.get('/:id', tasksController.byId)
router.put('/:id', tasksController.update)

router.post('/:id/participators/:staffId', tasksController.addParticipator)
router.delete('/:id/participators/:staffId', tasksController.removeParticipator)

router.use('/:id/files', files.routes(), files.allowedMethods())

module.exports = router.routes()
