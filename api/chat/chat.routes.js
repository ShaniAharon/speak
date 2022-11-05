const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getChats, getChatById, addChat, updateChat, removeChat, getChatByUserId } = require('./chat.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getChats)
router.get('/:id', getChatById)
router.get('/:id/user', getChatByUserId)
// router.post('/', addChat)
// router.put('/:id', updateChat)
// router.delete('/:id', removeChat)
// requireAuth, requireAdmin,
// requireAuth, requireAdmin,
// requireAuth, requireAdmin,
router.post('/', addChat)
router.put('/:id', updateChat)
router.delete('/:id', removeChat)

module.exports = router
