const express = require("express");
const Task = require("../models/taskModel");
const router = express.Router();
const mockTasks = require("../draft/mockData.json");
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

// const insertMockData = async () => {
//   try {
//     const insertedData = await Task.insertMany(mockTasks);
//     return Promise.resolve(insertedData);
//   } catch (error) {
//     return Promise.reject(error);
//   }
// };

// insertMockData()
//   .then((data) => {
//     console.log({ data });
//   })
//   .catch((error) => console.log({ error }));

module.exports = router;
