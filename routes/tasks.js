const express =require('express');
const { getAllTasks, getTask, createTask, updateTask, deleteTask, deleteTasks } = require('../controllers/tasks');
const router = express.Router()

router.route('/').get(getAllTasks).post(createTask).delete(deleteTasks);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router