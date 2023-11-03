const Task = require("../models/task");
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getTask = async (req, res) => {
  try {
    const taskId = await req.params.id;
    const task = await Task.findOne({ _id: taskId });
    if (!task) {
      return res.status(404).json({ message: "task not found" });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteTasks = async (req, res) => {
  try {
    const result = await Task.deleteMany({});
    if (result.deletedCount > 0) {
      return res
        .status(200)
        .json({ message: "all tasks deleted successfully" });
    } else {
      return res.status(404).json({ message: "no task found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const updateTask = async (req, res) => {
  try {
    let taskId = req.params.id;
    const task = await Task.findByIdAndUpdate({ _id: taskId }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res
        .status(404)
        .json({ message: `task with id ${taskId} not found` });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = await req.params.id;
    const task = await Task.findOne({ _id: taskId });
    if (!task) {
      return res
        .status(404)
        .json({ message: `task not found with id ${taskId}` });
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
