const logger = require('../../services/logger.service')
const reportService = require('./report.service')

module.exports = {
  getReports,
  getReportById,
  addReport,
  updateReport,
  removeReport,
  getReportByUserId
}

// LIST
async function getReports(req, res) {
  try {
    const filterBy = req.query
    const reports = await reportService.query(filterBy)
    res.json(reports)
  } catch (err) {
    logger.error('Failed to get reports', err)
    res.status(500).send({ err: 'Failed to get reports' })
  }
}

// READ
async function getReportById(req, res) {
  try {
    const { id } = req.params
    const report = await reportService.getById(id)
    res.json(report)
  } catch (err) {
    logger.error('Failed to get report', err)
    res.status(500).send({ err: 'Failed to get report' })
  }
}
async function getReportByUserId(req, res) {
  try {
    const { id } = req.params
    const report = await reportService.getByUserId(id)
    res.json(report)
  } catch (err) {
    logger.error('Failed to get report', err)
    res.status(500).send({ err: 'Failed to get report' })
  }
}

// CREATE
async function addReport(req, res) {
  try {
    const report = req.body
    const addedReport = await reportService.add(report)
    res.json(addedReport)
  } catch (err) {
    logger.error('Failed to add report', err)
    res.status(500).send({ err: 'Failed to add report' })
  }
}

// UPDATE
async function updateReport(req, res) {
  try {
    const report = req.body
    const updatedReport = await reportService.update(report)
    res.json(updatedReport)
  } catch (err) {
    logger.error('Failed to update report', err)
    res.status(500).send({ err: 'Failed to update report' })
  }
}

// DELETE
async function removeReport(req, res) {
  try {
    const { id } = req.params
    const removedId = await reportService.remove(id)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove report', err)
    res.status(500).send({ err: 'Failed to remove report' })
  }
}
