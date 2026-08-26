import express from "express";
import cors from "cors";

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

const tasks: Task[] = [];

app.get("/", (req, res) => {
    res.json({ message: "Student Planner API is running!"});
});

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/tasks", (req, res) => {
    const task: Task = req.body;

    tasks.push(task);

    res.status(201).json(task);
});

app.delete("/tasks/:id", (req, res) => {
    const taskId = req.params.id;

    const taskIndex = tasks.findIndex(
        (task) => task.id === taskId
    );

    if (taskIndex === -1) {
        res.status(404).json({message: "Task not found"});
        return;
    }

    tasks.splice(taskIndex, 1);

    res.status(204).send();
});

app.patch("/tasks/:id", (req, res) => {
  const taskId = req.params.id;

  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    res.status(404).json({ message: "Task not found" });
    return;
  }

  if (req.body.text !== undefined) {
    task.text = req.body.text;
  }

  if (req.body.done !== undefined) {
    task.done = req.body.done;
  }

  if (req.body.dueDate !== undefined) {
    task.dueDate = req.body.dueDate;
  }

  if (req.body.priority !== undefined) {
    task.priority = req.body.priority;
  }

  res.json(task);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});