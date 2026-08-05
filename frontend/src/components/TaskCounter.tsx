
type TaskCounterProps = {
  completedTasks: number;
  totalTasks: number;
};

function TaskCounter({
  completedTasks,
  totalTasks,
}: TaskCounterProps) {
  return (
    <p className="task-counter">
      {completedTasks} / {totalTasks} completed
    </p>
  );
}

export default TaskCounter;