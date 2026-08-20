import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

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

app.listen(PORT, () => {
    console.log(`Server running on http:localhost:${PORT}`);
});