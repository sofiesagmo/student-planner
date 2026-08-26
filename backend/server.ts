import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

type Task = {
    id: string;
    text: string;
    done: boolean;
    dueDate: string;
    priority: "low" | "medium" | "high";
    createdAt: string; 
};


app.get("/", (req, res) => {
    res.json({ message: "Student Planner API is running!"});
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await db.orm.public.Task.all();

    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const task = await db.orm.public.Task.create({
      id: req.body.id,
      text: req.body.text,
      done: req.body.done,
      dueDate: req.body.dueDate,
      priority: req.body.priority,
      createdAt: req.body.createdAt,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Failed to create task" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    await db.orm.public.Task
      .where({ id: taskId })
      .delete();

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Failed to delete task" });
  }
});

app.patch("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    const updatedTask = await db.orm.public.Task
      .where({ id: taskId })
      .update({
        done: req.body.done,
        text: req.body.text,
        dueDate: req.body.dueDate,
      });

    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Failed to update task" });
  }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});