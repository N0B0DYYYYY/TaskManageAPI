import React, { useEffect, useState } from "react";
import api from "../api/api.js";
import TaskItem from "./TaskItem.jsx";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks when component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/api/tasks/");
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, []);

  // Delete task
  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/tasks/${id}/`);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Toggle completed status
  const handleToggle = async (id) => {
    const task = tasks.find((t) => t.id === id);
    try {
      const res = await api.patch(`/api/tasks/${id}/`, {
        completed: !task.completed,
      });
      setTasks(tasks.map((t) => (t.id === id ? res.data : t)));
    } catch (err) {
      console.error("Error toggling task:", err);
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;
