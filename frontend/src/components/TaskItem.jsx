import React from "react";

function TaskItem({ task, onDelete, onToggle }) {
  
  const isOverdue = task.deadline && new Date(task.deadline) < new Date() && !task.completed;

  const formatDeadline = (dateString) => {
    if (!dateString) return null;
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="task-item">
      <div className="task-item-main">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <div>
          <span className={`task-item-title ${task.completed ? 'completed' : ''}`}>
            {task.title}
          </span>
          {task.deadline && (
            <div className={`task-item-deadline ${isOverdue ? 'overdue' : ''}`}>
                Due: {formatDeadline(task.deadline)}
            </div>
          )}
        </div>
      </div>
      <button onClick={() => onDelete(task.id)} className="btn btn-danger">
        Delete
      </button>
    </div>
  );
}

export default TaskItem;