import "./App.css";
import { useEffect, useState } from "react";
import TaskItem from "./components/TaskItem";
import FilterButtons from "./components/FilterButtons";

type Task = {
  id: string;
  text: string;
  done: boolean;
};

type Filter = "all" | "active" | "completed";

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  
  function addTask() {
    if (newTask.trim() === "") return;

    setTasks([
      ...tasks,
      { id: crypto.randomUUID(), text: newTask.trim(), done: false }
    ]);

    setNewTask("");
  }

  function deleteTask(idToRemove: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return; 
    
    setTasks(
      tasks.filter((task) => 
        task.id !== idToRemove
    ));
  }

  function toggleTask(idToToggle: string) {
    setTasks(
      tasks.map((task) =>
        task.id === idToToggle
          ? { ...task, done: !task.done }
          : task
      )
    );
  }

  function saveTask(id: string, text: string){
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, text: text.trim() }
          : task
      )
    );
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all"){
      return true;
    } 
    if (filter === "active"){
      return !task.done;
    }

    return task.done;
  });

  const tasksLeft = tasks.filter((task) => !task.done).length;
  const completedTasks = tasks.length - tasksLeft;

  return (
    <div className="container">
      <h1>Student Planner</h1>
      <p>Velkommen til mitt første fullstack-prosjekt!</p>

      <h2>Mine oppgaver</h2>



      <input
        className="new-task-input"
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Skriv en oppgave"
        onKeyDown={(e) => e.key === "Enter" && addTask()}
      />

      <button className="add-button" onClick={addTask}>Add</button>

      
    <p className="task-counter">{completedTasks} / {tasks.length} completed</p>

    <FilterButtons
      filter={filter}
      setFilter={setFilter}
    />

    <p>Filter: {filter}</p>


    <ul>
      {filteredTasks.map((task) => (
        <TaskItem
         key={task.id} 
         task={task} 
         toggleTask={toggleTask}
         deleteTask={deleteTask}
         saveTask={saveTask}
         />
      ))}
    </ul>
    </div>     
  );
}

export default App;
