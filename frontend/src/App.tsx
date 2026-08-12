import "./App.css";
import { useEffect, useState } from "react";
import TaskItem from "./components/TaskItem";
import FilterButtons from "./components/FilterButtons";
import TaskCounter from "./components/TaskCounter";
import type { Task, Filter, SortOption } from "./types";
import SortButtons from "./components/SortButtons";


function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [newPriority, setNewPriority] = useState<"low" | "medium" | "high">("medium");
  const [filter, setFilter] = useState<Filter>("all");
  const [sortOption, setSortOption] = useState<SortOption>("dueDate");

  function addTask() {
    if (newTask.trim() === "") return;

    setTasks([
      ...tasks,
      { id: crypto.randomUUID(), text: newTask.trim(), done: false, dueDate: newDueDate, priority: newPriority}
    ]);

    setNewTask("");
    setNewDueDate("");
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

  function saveTask(id: string, text: string, dueDate: string){
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, text: text.trim(), dueDate, }
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

  const sortedTasks = [...filteredTasks].sort((a, b) => {

    if (sortOption === "alphabetical") {
      return a.text.localeCompare(b.text);
    }

    if (sortOption === "newest") {
      return filteredTasks.indexOf(b) - filteredTasks.indexOf(a);
    }

    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;

    return a.dueDate.localeCompare(b.dueDate);
  });

  const tasksLeft = tasks.filter((task) => !task.done).length;
  const completedTasks = tasks.length - tasksLeft;

  return (
    <div className="container">
      <h1>Student Planner</h1>
      <p className="app-description">
        Welcome to my first fullstack-project!
        An app where you can organize your coursework, assignments,
         and deadlines in one place.
        Includes task management, due dates, filters and sorting options.</p>

      <hr className="section-divider" />  

      <h2>My tasks</h2>



      <input
        className="new-task-input"
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Skriv en oppgave"
        onKeyDown={(e) => e.key === "Enter" && addTask()}
      />

      <input
        type="date"
        value={newDueDate}
        onChange={(e) => setNewDueDate(e.target.value)}
      />

      <select
        value={newPriority}
        onChange={(e) =>
        setNewPriority(e.target.value as "low" | "medium" | "high")}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
      </select>

      <button className="add-button" onClick={addTask}>Add</button>

      
    <TaskCounter
      completedTasks={completedTasks}
      totalTasks={tasks.length}
    />

    <FilterButtons
      filter={filter}
      setFilter={setFilter}
    />

    <p>Filter: {filter}</p>

    <SortButtons
      sortOption={sortOption}
      setSortOption={setSortOption}
    />

    <ul>
      {sortedTasks.map((task) => (
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
