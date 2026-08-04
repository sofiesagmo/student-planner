import "./App.css";
import { useEffect, useState } from "react";

type Task = {
  id: string;
  text: string;
  done: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState("");

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

  function saveTask(){
    if (!editingTaskId) return;

    setTasks(
      tasks.map((task) => 
        task.id === editingTaskId
          ? {...task, text: editedText.trim()}
          : task 
      )
    );

    setEditingTaskId(null);
    setEditedText("");
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

    <div className="filter-buttons">
      <button className={filter === "all" ? "active-filter" : ""} onClick={() => setFilter("all")}>All</button>
      <button className={filter === "active" ? "active-filter" : ""} onClick={() => setFilter("active")}>Active</button>
      <button className={filter === "completed" ? "active-filter" : ""} onClick={() => setFilter("completed")}>Completed</button>
    </div>

    <p>Filter: {filter}</p>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id} className="task-item">
            <div className="task-left">
              <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
              />

              {editingTaskId === task.id ?(
                <input
                  className="edit-input"
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}/>
              ) : (
                <span className={`task-text ${task.done ? "done" : ""}`}>{task.text}</span>
              )}
            </div>

            <div className="task-actions">
              {editingTaskId === task.id ? (
                <>
                  <button 
                    className="save-button"
                    onClick={saveTask}>Save</button>

                  <button 
                    className="cancel-button"
                    onClick={() => {
                      setEditingTaskId(null);
                      setEditedText("");
                    }}>Cancel</button>
                </>
              ) : (
                <>
                  <button className="edit-button" onClick={() => {
                    setEditingTaskId(task.id);
                    setEditedText(task.text);
                  }}>Edit</button>

                  <button className="delete-button" onClick={() => deleteTask(task.id)}>X</button>
                </>
              )}
            </div>
            

          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
