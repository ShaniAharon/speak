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

    const collection = await dbService.getCollection('chat')
    var chats = await collection.find(criteria).toArray()
    return chats
  } catch (err) {
    logger.error('cannot find chats', err)
    throw err
  }
}

async function getById(chatId) {
  try {
    const collection = await dbService.getCollection('chat')
    const chat = collection.findOne({ _id: ObjectId(chatId) })
    return chat
  } catch (err) {
    logger.error(`while finding chat ${chatId}`, err)
    throw err
  }
}
async function getByUserId(id) {
  try {
    const collection = await dbService.getCollection('chat')
    const chat = collection.findOne({ userId: id })
    return chat
  } catch (err) {
    logger.error(`while finding chat ${chatId}`, err)
    throw err
  }
}

async function remove(chatId) {
  try {
    const collection = await dbService.getCollection('chat')
    await collection.deleteOne({ _id: ObjectId(chatId) })
    return chatId
  } catch (err) {
    logger.error(`cannot remove chat ${chatId}`, err)
    throw err
  }
}

async function add(chat) {
  try {
    const collection = await dbService.getCollection('chat')
    const addedChat = await collection.insertOne(chat)
    return addedChat.ops[0]
  } catch (err) {
    logger.error('cannot insert chat', err)
    throw err
  }
}

async function addMsg(chatId, msg) {
  const chat = await getById(chatId)
  chat.msgs.push(msg)
  update(chat)
}

async function update(chat) {
  try {
    var id = ObjectId(chat._id)
    delete chat._id
    const collection = await dbService.getCollection('chat')
    await collection.updateOne({ _id: id }, { $set: { ...chat } })
    chat._id = id
    return chat
  } catch (err) {
    logger.error(`cannot update chat ${chat._id}`, err)
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
