const express = require("express");
const Task = require("../models/taskModel");
const router = express.Router();

const {
  createTask,
  getTask,
  getTasks,
  deleteTask,
  updateTask,
} = require("../controllers/taskController");

router.get("/", getTasks);
router.get("/:id", getTask);
router.post("/", createTask);
router.delete("/:id", deleteTask);
router.patch("/:id", updateTask);

module.exports = router;
