const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const userService = require('../user/user.service')

module.exports = {
  query,
  addReview,
  remove,
}

async function query(filterBy = {}) {
  const collection = await dbService.getCollection('review')

  const reviews = await collection
    .aggregate([
      { $match: _buildCriteria(filterBy) },
      {
        $lookup: {
          from: 'user',
          foreignField: '_id',
          localField: 'userId',
          as: 'user',
        },
      },
      { $unwind: '$user' }, // [{.....}] ==> {.....}
      {
        $lookup: {
          from: 'toy',
          foreignField: '_id',
          localField: 'toyId',
          as: 'toy',
        },
      },
      { $unwind: '$toy' }, // [{.....}] ==> {.....}
      {
        $project: {
          _id: 1,
          content: 1,
          rate: 1,
          user: { _id: 1, username: 1 },
          toy: { _id: 1, name: 1, price: 1 },
        },
      },
    ])
    .toArray()
  return reviews
}

async function addReview({ userId, toyId, content, rate }) {
  const reviewToAdd = {
    userId: ObjectId(userId),
    toyId: ObjectId(toyId),
    content,
    rate,
  }

  const collection = await dbService.getCollection('review')
  const addedReviewData = await collection.insertOne(reviewToAdd)
  reviewToAdd._id = addedReviewData.insertedId
  return reviewToAdd
}

async function remove(reviewId) {
  try {
    const collection = await dbService.getCollection('review')
    const criteria = { _id: ObjectId(reviewId) }
    await collection.deleteOne(criteria)
  } catch (err) {
    logger.error(`cannot remove review ${reviewId}`, err)
    throw err
  }
}

function _buildCriteria(filterBy) {
  console.log(filterBy)
  if (filterBy.userId) {
    return { userId: ObjectId(filterBy.userId) }
  } else if (filterBy.toyId) {
    return { toyId: ObjectId(filterBy.toyId) }
  }
  return {}
}
