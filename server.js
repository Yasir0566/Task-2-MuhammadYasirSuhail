const express = require("express");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Needed so Express can read JSON bodies sent with POST/PUT requests.
app.use(express.json());

// Simple health check route to confirm the server is alive.
app.get("/", (req, res) => {
  res.status(200).json({ message: "Task Manager API is running." });
});

app.use("/api/tasks", taskRoutes);

// Catch-all for routes that don't exist.
app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
