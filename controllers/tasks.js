const Task = require("../models/task");
const asyncWrapper = require("../middlewares/async");
const {createCustomError, CustomAPIError} = require('../errors/custom-error');
const getAllTasks = async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
};

const getTask = async (req, res, next) => {
  const taskId = await req.params.id;
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    const message = `no task with id ${taskId}`
    return next(createCustomError(message, 404));
  }
  res.status(200).json({ task });
};

const deleteTasks = async (req, res) => {
  const result = await Task.deleteMany({});
  if (result.deletedCount > 0) {
    return res.status(200).json({ message: "all tasks deleted successfully" });
  } else {
    return res.status(404).json({ message: "no task found" });
  }
};
const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
};

const updateTask = async (req, res) => {
  let taskId = req.params.id;
  const task = await Task.findByIdAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    const message = `no task with id ${taskId}`
    return next(createCustomError(message, 404));
  }

  res.status(200).json({ task });
};

const deleteTask = async (req, res) => {
  try {
    const taskId = await req.params.id;
    const task = await Task.findOne({ _id: taskId });
    if (!task) {
      const message = `no task with id ${taskId}`
      return next(createCustomError(message, 404));
    }
    await Task.deleteOne({ _id: taskId }).then(() => {
      res.status(200).json({ task });
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  deleteTasks,
};
