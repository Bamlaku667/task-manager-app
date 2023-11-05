const express =require('express');
const { getAllTasks, getTask, createTask, updateTask, deleteTask, deleteTasks } = require('../controllers/tasks');
const asyncWrapper = require('../middlewares/async');
const router = express.Router()

router.route('/').get(asyncWrapper(getAllTasks)).post(asyncWrapper(createTask)).delete(asyncWrapper(deleteTasks));
router.route('/:id').get(asyncWrapper(getTask)).patch(asyncWrapper(updateTask)).delete(asyncWrapper(deleteTask));

module.exports = router