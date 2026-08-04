import { useState } from "react";

type Task = {
  id: string;
  text: string;
  done: boolean;
};

type TaskItemProps = {
  task: Task;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  saveTask: (id: string, text: string) => void;
};

function TaskItem({
  task,
  toggleTask,
  deleteTask,
  saveTask,
}: TaskItemProps) {

const [isEditing, setIsEditing] = useState(false);
const [editedText, setEditedText] = useState(task.text);


  return (
    <li className="task-item">
    <div className="task-left">
      <input
            type="checkbox"
            checked={task.done}
            onChange={() => toggleTask(task.id)}
        />

      {isEditing ? (
        <input
            className="edit-input"
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onKeyDown={(e) => {
            if (e.key === "Enter") {
                if (editedText.trim() === "") return;

                saveTask(task.id, editedText);
                setIsEditing(false);
            }
            }}
        />
        ) : (
        <span className={`task-text ${task.done ? "done" : ""}`}>
            {task.text}
        </span>
        )}
      </div>

      <div className="task-actions">
        {isEditing ? (
            <>
                <button
                className="save-button"
                onClick={() => {
                    if (editedText.trim() === "") return;

                    saveTask(task.id, editedText);
                    setIsEditing(false);
                }}
                >
                Save
                </button>

                <button
                className="cancel-button"
                onClick={() => {
                    setIsEditing(false);
                    setEditedText(task.text);
                }}
                >
                Cancel
                </button>
            </>
            ) : (
            <button
                className="edit-button"
                onClick={() => setIsEditing(true)}
            >
                Edit
            </button>
            )}

        <button
          className="delete-button"
          onClick={() => deleteTask(task.id)}
        >
          X
        </button>
      </div>
    </li>
  );
}

export default TaskItem;