import React from "react";

function TaskItem({ task, onDelete, onToggle }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "8px",
      border: "1px solid #ddd",
      marginBottom: "5px"
    }}>
      <div>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span style={{
          marginLeft: "8px",
          textDecoration: task.completed ? "line-through" : "none"
        }}>
          {task.title}
        </span>
      </div>

      <button onClick={() => onDelete(task.id)} style={{ color: "red" }}>
        Delete
      </button>
    </div>
  );
}

export default TaskItem;
