const express = require('express')
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getTasks, getTaskById, addTask, updateTask, removeTask, getTaskByUserId } = require('./task.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getTasks)
router.get('/:id', getTaskById)
router.get('/:id/user', getTaskByUserId)
// router.post('/', addTask)
// router.put('/:id', updateTask)
// router.delete('/:id', removeTask)
// requireAuth, requireAdmin,
// requireAuth, requireAdmin,
// requireAuth, requireAdmin,
router.post('/', addTask)
router.put('/:id', updateTask)
router.delete('/:id', removeTask)

module.exports = router
