import "./App.css";
import { useEffect, useState } from "react";
import TaskItem from "./components/TaskItem";
import FilterButtons from "./components/FilterButtons";
import TaskCounter from "./components/TaskCounter";
import type { Task, Filter, SortOption } from "./types";
import SortButtons from "./components/SortButtons";
import Toast from "./components/Toast";


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
  const [toastMessage, setToastMessage] = useState("");

  async function addTask() {

    console.log("ADD CLICKED");
    
    if (newTask.trim() === "") return;

    const newTaskObject: Task = {
      id: crypto.randomUUID(),
      text: newTask.trim(),
      done: false,
      dueDate: newDueDate,
      priority: newPriority,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTaskObject),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }
      const savedTask = await response.json();

      setTasks((currentTasks) => [... currentTasks, savedTask]);

      setNewTask("");
      setNewDueDate("");
      setNewPriority("low");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  async function deleteTask(idToRemove: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `http://localhost:3000/tasks/${idToRemove}` ,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks((currentTasks) => 
        currentTasks.filter((task) => task.id !== idToRemove)
      );

      setToastMessage("Task deleted");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }


  async function toggleTask(idToToggle: string) {
    const task = tasks.find((task) => task.id === idToToggle);

    if (!task) return;

    try {
      const response = await fetch(
        `http://localhost:3000/tasks/${idToToggle}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            done: !task.done,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await response.json();

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === idToToggle ? updatedTask : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  async function saveTask(id: string, text: string, dueDate: string) {
    try {
      const response = await fetch(
        `http://localhost:3000/tasks/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: text.trim(),
            dueDate,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await response.json();

      setTasks((currentTasks) =>
        currentTasks.map((task) => 
          task.id === id ? updatedTask : task
        )
      );

      setToastMessage("Task updated");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (!toastMessage) return;

    const timer = setTimeout(() => {
      setToastMessage("");
    }, 2000);

    return () => clearTimeout(timer);
  }, [toastMessage]);

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

      <div className="task-input-row">
        <input
          className="new-task-input"
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Write a task"
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />

        <input
          type="date"
          value={newDueDate}
          onChange={(e) => setNewDueDate(e.target.value)}
        />

        <select
          className="priority-select"
          value={newPriority}
          onChange={(e) =>
          setNewPriority(e.target.value as "low" | "medium" | "high")}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>

        <button className="add-button" onClick={addTask}>Add</button>

      </div>

      <div className="task-controls">
        <TaskCounter
          completedTasks={completedTasks}
          totalTasks={tasks.length}
        />

        <FilterButtons
          filter={filter}
          setFilter={setFilter}
        />

        <SortButtons
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
      </div>
      
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

    {toastMessage && <Toast message={toastMessage} />}
    </div>     
  );
}


export default App;
