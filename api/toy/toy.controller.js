const logger = require('../../services/logger.service')
const toyService = require('./toy.service')

module.exports = {
  getToys,
  getToyById,
  addToy,
  updateToy,
  removeToy,
}

// LIST
async function getToys(req, res) {
  try {
    const filterBy = req.query
    const toys = await toyService.query(filterBy)
    res.json(toys)
  } catch (err) {
    logger.error('Failed to get toys', err)
    res.status(500).send({ err: 'Failed to get toys' })
  }
}

// READ
async function getToyById(req, res) {
  try {
    const { id } = req.params
    const toy = await toyService.getById(id)
    res.json(toy)
  } catch (err) {
    logger.error('Failed to get toy', err)
    res.status(500).send({ err: 'Failed to get toy' })
  }
}

// CREATE
async function addToy(req, res) {
  try {
    const toy = req.body
    const addedToy = await toyService.add(toy)
    res.json(addedToy)
  } catch (err) {
    logger.error('Failed to add toy', err)
    res.status(500).send({ err: 'Failed to add toy' })
  }
}

// UPDATE
async function updateToy(req, res) {
  try {
    const toy = req.body
    const updatedToy = await toyService.update(toy)
    res.json(updatedToy)
  } catch (err) {
    logger.error('Failed to update toy', err)
    res.status(500).send({ err: 'Failed to update toy' })
  }
}

// DELETE
async function removeToy(req, res) {
  try {
    const { id } = req.params
    const removedId = await toyService.remove(id)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove toy', err)
    res.status(500).send({ err: 'Failed to remove toy' })
  }
}
