

type Task = {
  id: string;
  text: string;
  done: boolean;
};

type TaskItemProps = {
  task: Task;
};

function TaskItem({ task }: TaskItemProps) {
  return (
    <li className="task-item">
      <span>{task.text}</span>
    </li>
  );
}

export default TaskItem;