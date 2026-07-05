// In-memory storage for tasks.
// Project 2 is about API logic, not databases, so a plain array works fine
// as a stand-in. It resets every time the server restarts.

let tasks = [
  { id: 1, title: "Learn Express basics", description: "Go through the official docs", completed: false },
  { id: 2, title: "Build first API endpoint", description: "Create a GET route", completed: true },
];

let nextId = 3;

function getAllTasks() {
  return tasks;
}

function getTaskById(id) {
  return tasks.find((task) => task.id === id);
}

function addTask(title, description) {
  const newTask = {
    id: nextId,
    title,
    description,
    completed: false,
  };

  nextId += 1;
  tasks.push(newTask);
  return newTask;
}

function updateTask(id, updates) {
  const task = getTaskById(id);
  if (!task) {
    return null;
  }

  if (updates.title !== undefined) task.title = updates.title;
  if (updates.description !== undefined) task.description = updates.description;
  if (updates.completed !== undefined) task.completed = updates.completed;

  return task;
}

function deleteTask(id) {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    return false;
  }

  tasks.splice(taskIndex, 1);
  return true;
}

module.exports = {
  getAllTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
};
