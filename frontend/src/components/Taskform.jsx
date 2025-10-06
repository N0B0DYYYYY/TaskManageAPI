import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function TaskForm() {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/tasks/", { title, completed: false });
      navigate("/"); // go back to task list
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  return (
    <div>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default TaskForm;
