import { useState } from "react";
import type { Task } from "../types";

type TaskItemProps = {
  task: Task;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  saveTask: (id: string, text: string, dueDate: string) => void;
};

function TaskItem({
  task,
  toggleTask,
  deleteTask,
  saveTask,
}: TaskItemProps) {

const [isEditing, setIsEditing] = useState(false);
const [editedText, setEditedText] = useState(task.text);
const [editedDueDate, setEditedDueDate] = useState(task.dueDate);

function formatDate(date: string) {
  if (!date) return "";

  const [year, month, day] = date.split("-");

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  ).toLocaleDateString("no-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function isOverdue(dueDate: string, done: boolean) {
  if (!dueDate || done) return false;

  const [year, month, day] = dueDate.split("-");

  const due = new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return due < today;
}

  return (
    <li className="task-item">

    <span className={`priority-badge priority-${task.priority}`}>{task.priority}</span>

    <div className="task-left">
      <input
            type="checkbox"
            checked={task.done}
            onChange={() => toggleTask(task.id)}
        />

      {isEditing ? (
        <div className="edit-fields">
          <input
              className="edit-input"
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onKeyDown={(e) => {
              if (e.key === "Enter") {
                  if (editedText.trim() === "") return;

                  saveTask(task.id, editedText, editedDueDate);
                  setIsEditing(false);
              }
              }}
          />
          <input
            className="edit-date-input"
            type="date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
          />
        </div>
        ) : (
          <div className="task-content">
            <span className={`task-text ${task.done ? "done" : ""}`}>
              {task.text}
            </span>

            {task.dueDate && (
              <p className={`task-date ${isOverdue(task.dueDate, task.done) ? "overdue" : ""}`}>
                {isOverdue(task.dueDate, task.done)
                  ? `Overdue: ${formatDate(task.dueDate)}`
                  : `${formatDate(task.dueDate)}`}
              </p>
            )}

          </div>
          )}
        </div>

      <div className="task-actions">
        {isEditing ? (
            <>
                <button
                className="save-button"
                onClick={() => {
                    if (editedText.trim() === "") return;

                    saveTask(task.id, editedText, editedDueDate);
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
                    setEditedDueDate(task.dueDate);
                }}
                >
                Cancel
                </button>
            </>
            ) : (
            <button
                className="edit-button"
                onClick={() => {
                  setEditedText(task.text);
                  setEditedDueDate(task.dueDate);
                  setIsEditing(true);
                }}
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