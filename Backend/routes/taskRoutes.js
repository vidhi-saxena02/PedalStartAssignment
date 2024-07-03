const express = require("express");
const {
  getTasks,
  createTask,
  editTask,
  deleteTask,
  markTask,
} = require("../controllers/taskController");

const router = express.Router();

router.get("/tasks", getTasks);
router.post("/tasks", createTask);
router.put("/tasks/:id", editTask);
router.delete("/tasks/:id", deleteTask);
router.put("/tasks/:id/completed", markTask);

module.exports = router;
