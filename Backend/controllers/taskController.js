const Task = require("../model/taskModel");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { deleted: false },
    });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createTask = async (req, res) => {
  const { name, description, dueDate } = req.body;

  try {
    const newTask = await Task.create({
      taskName: name,
      description: description,
      due_date: dueDate,
    });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const editTask = async (req, res) => {
  const { id } = req.params;
  const { name, description, dueDate } = req.body;

  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    task.taskName = name || task.taskName;
    task.description = description || task.description;
    task.due_date = dueDate || task.due_date;

    await task.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    task.deleted = true;
    await task.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const markTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    task.status = "Completed";
    await task.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  editTask,
  deleteTask,
  markTask,
};
