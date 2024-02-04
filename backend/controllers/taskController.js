const Task = require("../models/taskModel");
const mongoose = require("mongoose");

// Get all tasks
const getTasks = async (req, res) => {
  // const user_id = req.user._id;
  const tasks = await Task.find({});

  // const tasks = await Task
  // .find({ userId: user_id })
  // .sort({ createdAt: -1 });

  res.status(200).json(tasks);
};

// Get a single task
const getTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No such task found");
  }
  const task = await Task.findById(id);

  if (!task) {
    return res.status(404).send("No such task found");
  }
  res.status(200).json(task);
};

// Create new task
const createTask = async (req, res) => {
  const { taskId, title, description, category, dueDate, status } = req.body;

  let emptyFields = [];
  if (!taskId) {
    emptyFields.push("taskId");
  }
  if (!title) {
    emptyFields.push("title");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (!category) {
    emptyFields.push("category");
  }
  if (!dueDate) {
    emptyFields.push("dueDate");
  }
  if (!status) {
    emptyFields.push("status");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // add to the database
  try {
    // const userId = req.user._id;
    const task = await Task.create({
      taskId,
      title,
      description,
      category,
      dueDate,
      status,
      // userId
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No such task found");
  }

  const task = await Task.findOneAndDelete({ _id: id });

  if (!task) {
    return res.status(404).send("No such task found");
  }

  res.status(200).json(task);
};

// update a task
const updateTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No such task found");
  }

  const task = await Task.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  res.status(200).json(task);
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
};
