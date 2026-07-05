const taskStore = require("../data/taskStore");

// Kept separate from the route handlers below so each handler stays
// focused on request/response logic instead of mixing in data checks.
function validateTaskInput(title) {
  if (title === undefined || title === null) {
    return "Title is required.";
  }

  if (typeof title !== "string" || title.trim().length === 0) {
    return "Title must be a non-empty string.";
  }

  return null; // no errors
}

function getAllTasks(req, res) {
  const tasks = taskStore.getAllTasks();
  res.status(200).json(tasks);
}

function getTaskById(req, res) {
  const id = Number(req.params.id);
  const task = taskStore.getTaskById(id);

  if (!task) {
    return res.status(404).json({ error: "Task not found." });
  }

  res.status(200).json(task);
}

function createTask(req, res) {
  const { title, description } = req.body;

  const validationError = validateTaskInput(title);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const newTask = taskStore.addTask(title.trim(), description || "");
  res.status(201).json(newTask);
}

function updateTask(req, res) {
  const id = Number(req.params.id);
  const { title, description, completed } = req.body;

  // Only validate the title if the request is actually trying to change it.
  if (title !== undefined) {
    const validationError = validateTaskInput(title);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }
  }

  const updatedTask = taskStore.updateTask(id, { title, description, completed });

  if (!updatedTask) {
    return res.status(404).json({ error: "Task not found." });
  }

  res.status(200).json(updatedTask);
}

function deleteTask(req, res) {
  const id = Number(req.params.id);
  const wasDeleted = taskStore.deleteTask(id);

  if (!wasDeleted) {
    return res.status(404).json({ error: "Task not found." });
  }

  res.status(204).send();
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
