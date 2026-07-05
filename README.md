# Task Manager API

A simple REST API for managing a to-do list. Built for Project 2 (Backend API Development).

## What it does

The API lets a client create, read, update, and delete tasks. Each task has
a title, an optional description, and a completed flag. Data is stored in
memory (a plain JavaScript array), so it resets whenever the server restarts.
There is no database in this project on purpose — the goal here is to get
the API logic right first.

## Project structure

```
task-manager-api/
├── server.js                 # starts the server, wires everything together
├── routes/
│   └── taskRoutes.js         # maps URLs + HTTP methods to controller functions
├── controllers/
│   └── taskController.js     # handles requests, validates input, sends responses
└── data/
    └── taskStore.js          # in-memory "database" and the functions that touch it
```

## Setup

```
npm install
npm start
```

The server runs on `http://localhost:3000` by default.

## Endpoints

| Method | Route             | Description              |
|--------|-------------------|--------------------------|
| GET    | /api/tasks        | Get all tasks            |
| GET    | /api/tasks/:id     | Get a single task by id  |
| POST   | /api/tasks        | Create a new task        |
| PUT    | /api/tasks/:id     | Update an existing task  |
| DELETE | /api/tasks/:id     | Delete a task            |

### Example: create a task

```
POST /api/tasks
Content-Type: application/json

{
  "title": "Finish project 2",
  "description": "Build and test the API"
}
```

Response (201 Created):

```
{
  "id": 3,
  "title": "Finish project 2",
  "description": "Build and test the API",
  "completed": false
}
```

### Validation

`title` is required and must be a non-empty string. Leaving it out, or
sending an empty/whitespace string, returns a `400 Bad Request` with an
error message instead of creating the task.

### Error handling

- `400` — invalid input (e.g. missing title)
- `404` — task or route doesn't exist
- `204` — successful delete (no content to return)
