import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../api/api.js";

function TaskForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const taskData = { title, completed: false };
      if (deadline) {
        taskData.deadline = deadline.toISOString();
      }
      const res = await api.post("/api/tasks/", taskData);
      if (onCreate) {
        onCreate(res.data);
      }
      setTitle("");
      setDeadline(null);
    } catch (err) {
      console.error("Error creating task:", err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="task-form-inputs">
            <input
              type="text"
              placeholder="Add a new task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="form-input"
            />
            <DatePicker
              selected={deadline}
              onChange={(date) => setDeadline(date)}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              placeholderText="Add a deadline"
              className="date-picker-input"
              wrapperClassName="date-picker-wrapper"
            />
            <button type="submit" className="btn btn-primary">Add Task</button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;