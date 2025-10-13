import React, { useEffect, useState } from 'react';
import api from '../api/api.js';
import TaskItem from '../components/TaskItem.jsx';

export default function AllTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await api.get('tasks/');
                setTasks(res.data);
            } catch (err) {
                console.error("Error fetching tasks:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

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
                            <TaskItem 
                                key={t.id} 
                                task={t} 
                                onToggle={() => {}} 
                                onDelete={() => {}}
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