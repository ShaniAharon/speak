const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
  remove,
  query,
  getById,
  add,
  update,
  addMsg,
  getByUserId
}

async function query(filterBy) {
  try {
    const criteria = _buildCriteria(filterBy)
    // const criteria = {}

    const collection = await dbService.getCollection('report')
    var reports = await collection.find(criteria).toArray()
    return reports
  } catch (err) {
    logger.error('cannot find reports', err)
    throw err
  }
}

async function getById(reportId) {
  try {
    const collection = await dbService.getCollection('report')
    const report = collection.findOne({ _id: ObjectId(reportId) })
    return report
  } catch (err) {
    logger.error(`while finding report ${reportId}`, err)
    throw err
  }
}
async function getByUserId(id) {
  try {
    const collection = await dbService.getCollection('report')
    const report = collection.findOne({ userId: id })
    return report
  } catch (err) {
    logger.error(`while finding report ${reportId}`, err)
    throw err
  }
}

async function remove(reportId) {
  try {
    const collection = await dbService.getCollection('report')
    await collection.deleteOne({ _id: ObjectId(reportId) })
    return reportId
  } catch (err) {
    logger.error(`cannot remove report ${reportId}`, err)
    throw err
  }
}

async function add(report) {
  try {
    const collection = await dbService.getCollection('report')
    const addedReport = await collection.insertOne(report)
    return addedReport.ops[0]
  } catch (err) {
    logger.error('cannot insert report', err)
    throw err
  }
}

async function addMsg(reportId, msg) {
  const report = await getById(reportId)
  report.msgs.push(msg)
  update(report)
}

async function update(report) {
  try {
    var id = ObjectId(report._id)
    delete report._id
    const collection = await dbService.getCollection('report')
    await collection.updateOne({ _id: id }, { $set: { ...report } })
    report._id = id
    return report
  } catch (err) {
    logger.error(`cannot update report ${report._id}`, err)
    throw err
  }
}

function _buildCriteria(filterBy) {
  const criteria = {}

  // by name
  const regex = new RegExp(filterBy.name, 'i')
  criteria.name = { $regex: regex }

  // filter by inStock
  if (filterBy.inStock) {
    criteria.inStock = { $eq: JSON.parse(filterBy.inStock) }
  }

  // filter by labels
  if (filterBy.labels?.length) {
    criteria.labels = { $in: filterBy.labels }
  }

  return criteria
}
