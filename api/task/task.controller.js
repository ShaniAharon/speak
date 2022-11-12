const logger = require('../../services/logger.service')
const taskService = require('./task.service')
const cloudinary = require('cloudinary');

module.exports = {
  getTasks,
  getTaskById,
  addTask,
  updateTask,
  removeTask,
  getTaskByUserId
}

// LIST
async function getTasks(req, res) {
  try {
    const filterBy = req.query
    const tasks = await taskService.query(filterBy)
    res.json(tasks)
  } catch (err) {
    logger.error('Failed to get tasks', err)
    res.status(500).send({ err: 'Failed to get tasks' })
  }
}

// READ
async function getTaskById(req, res) {
  try {
    const { id } = req.params
    const task = await taskService.getById(id)
    res.json(task)
  } catch (err) {
    logger.error('Failed to get task', err)
    res.status(500).send({ err: 'Failed to get task' })
  }
}
async function getTaskByUserId(req, res) {
  try {
    const { id } = req.params
    const task = await taskService.getByUserId(id)
    res.json(task)
  } catch (err) {
    logger.error('Failed to get task', err)
    res.status(500).send({ err: 'Failed to get task' })
  }
}

// CREATE
async function addTask(req, res) {
  try {
    const task = req.body
    const addedTask = await taskService.add(task)
    res.json(addedTask)
  } catch (err) {
    logger.error('Failed to add task', err)
    res.status(500).send({ err: 'Failed to add task' })
  }
}

// UPDATE
async function updateTask(req, res) {
  try {
    const task = req.body
    const updatedTask = await taskService.update(task)
    res.json(updatedTask)
  } catch (err) {
    logger.error('Failed to update task', err)
    res.status(500).send({ err: 'Failed to update task' })
  }
}

// DELETE
async function removeTask(req, res) {
  try {
    const { id } = req.params
    const { publicVideoId } = req.body
    cloudinary.v2.uploader
      .destroy(publicVideoId, { resource_type: 'video' })
      .then(result => console.log(result));
    const removedId = await taskService.remove(id)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove task', err)
    res.status(500).send({ err: 'Failed to remove task' })
  }
}
