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
    setTasks(tasks.filter((task) => task.id !== idToRemove));
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
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <div className="task-left">
              <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
              />

              {editingTaskId === task.id ?(
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}/>
              ) : (
                <span className={task.done ? "done" : ""}>{task.text}</span>
              )}
            </div>


            {editingTaskId === task.id ? (
              <>
                <button onClick={saveTask}>Lagre</button>

                <button 
                  onClick={() => {
                    setEditingTaskId(null);
                    setEditedText("");
                  }}>Avbryt</button>
              </>
            ) : (
              <>
                <button onClick={() => deleteTask(task.id)}>X</button>

                <button onClick={() => {
                  setEditingTaskId(task.id);
                  setEditedText(task.text);
                }}>Edit</button>

              </>
            )}
            
            

          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
