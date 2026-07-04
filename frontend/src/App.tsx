import "./App.css";
import { useEffect, useState } from "react";

type Task = {
  text: string;
  done: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState("");

  function addTask() {
    if (newTask.trim() === "") return;

    setTasks([
      ...tasks,
      { text: newTask.trim(), done: false }
    ]);

    setNewTask("");
  }

  function deleteTask(indexToRemove: number) {
    setTasks(tasks.filter((_, index: number) => index !== indexToRemove));
  }

  function toggleTask(indexToToggle: number) {
    setTasks(
      tasks.map((task: Task, index: number) =>
        index === indexToToggle
          ? { ...task, done: !task.done }
          : task
      )
    );
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="container">
      <h1>Student Planner</h1>
      <p>Velkommen til mitt første fullstack-prosjekt!</p>

      <h2>Mine oppgaver</h2>

      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Skriv en oppgave"
        onKeyDown={(e) => e.key === "Enter" && addTask()}
      />

      <button onClick={addTask}>Legg til</button>

      <ul>
        {tasks.map((task: Task, index: number) => (
          <li key={index} className="task-item">
            <div className="task-left">
              <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(index)}
              />

              <span className={task.done ? "done" : ""}>
                {task.text}
              </span>
            </div>


            <button onClick={() => deleteTask(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
