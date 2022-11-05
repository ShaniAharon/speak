const express = require('express')
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getReports, getReportById, addReport, updateReport, removeReport, getReportByUserId } = require('./report.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getReports)
router.get('/:id', getReportById)
router.get('/:id/user', getReportByUserId)
// router.post('/', addReport)
// router.put('/:id', updateReport)
// router.delete('/:id', removeReport)
// requireAuth, requireAdmin,
// requireAuth, requireAdmin,
// requireAuth, requireAdmin,
router.post('/', addReport)
router.put('/:id', updateReport)
router.delete('/:id', removeReport)

module.exports = router
