import React, { useEffect, useState } from 'react';
import api from '../api/api.js';
import TaskItem from '../components/TaskItem.jsx';

export default function AllTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    // this function fetches the tasks from your backend
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await api.get('/tasks/');
                // we sort the tasks by deadline to show newest first
                const sortedTasks = res.data.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
                setTasks(sortedTasks);
            } catch (err) {
                console.error("Error fetching tasks:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    // this is the new function to handle deleting a task
    const handleDelete = async (id) => {
        try {
            await api.delete(`/tasks/${id}/`);
            // this removes the task from the list on the screen
            setTasks(prevTasks => prevTasks.filter(t => t.id !== id));
        } catch (err) {
            console.error("Error deleting task:", err);
        }
    };

    // and this is the new function for the checkmark
    const handleToggle = async (id) => {
        const task = tasks.find(t => t.id === id);
        if (task) {
            try {
                const res = await api.patch(`/tasks/${id}/`, { completed: !task.completed });
                // this updates the task in the list with the new completed status
                setTasks(prevTasks => prevTasks.map(t => (t.id === id ? res.data : t)));
            } catch (err) {
                console.error("Error toggling task:", err);
            }
        }
    };

    return (
        <div className="tasks-container">
            <h1>All Tasks</h1>
            <p>Here is a list of all the tasks in the system.</p>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div style={{ marginTop: '20px' }}>
                    {tasks.length > 0 ? (
                        tasks.map(t => (
                            // we now pass the real functions to the TaskItem
                            <TaskItem 
                                key={t.id} 
                                task={t} 
                                onToggle={handleToggle} 
                                onDelete={handleDelete}
                            />
                        ))
                    ) : (
                        <p>No tasks found.</p>
                    )}
                </div>
            )}
        </div>
    );
}