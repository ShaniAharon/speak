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
    let criteria = _buildCriteria(filterBy)

    const collection = await dbService.getCollection('task')
    var tasks = await collection.find(criteria).toArray()
    return tasks
  } catch (err) {
    logger.error('cannot find tasks', err)
    throw err
  }
}

async function getById(taskId) {
  try {
    const collection = await dbService.getCollection('task')
    const task = collection.findOne({ _id: ObjectId(taskId) })
    return task
  } catch (err) {
    logger.error(`while finding task ${taskId}`, err)
    throw err
  }
}
async function getByUserId(id) {
  try {
    const collection = await dbService.getCollection('task')
    const task = collection.findOne({ userId: id })
    return task
  } catch (err) {
    logger.error(`while finding task ${taskId}`, err)
    throw err
  }
}

async function remove(taskId) {
  try {
    const collection = await dbService.getCollection('task')
    await collection.deleteOne({ _id: ObjectId(taskId) })
    return taskId
  } catch (err) {
    logger.error(`cannot remove task ${taskId}`, err)
    throw err
  }
}

async function add(task) {
  try {
    const collection = await dbService.getCollection('task')
    const addedTask = await collection.insertOne(task)
    return addedTask.ops[0]
  } catch (err) {
    logger.error('cannot insert task', err)
    throw err
  }
}

async function addMsg(taskId, msg) {
  const task = await getById(taskId)
  task.msgs.push(msg)
  update(task)
}

async function update(task) {
  try {
    var id = ObjectId(task._id)
    delete task._id
    const collection = await dbService.getCollection('task')
    await collection.updateOne({ _id: id }, { $set: { ...task } })
    task._id = id
    return task
  } catch (err) {
    logger.error(`cannot update task ${task._id}`, err)
    throw err
  }
}

function _buildCriteria(filterBy) {
  const criteria = {}
  console.log('filterBy', filterBy);
  // by name
  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    criteria.title = { $regex: regex } // need to be the key name
  }

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
