import React, { useEffect, useState, useMemo } from 'react';
import api from '../api/api.js';
import TaskForm from '../components/TaskForm.jsx';
import TaskItem from '../components/TaskItem.jsx';

export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const load = async () => {
        try {
            const res = await api.get('/tasks/');
            setTasks(res.data);
        } catch (err) {
            console.error("Error loading tasks:", err);
        } finally {
            if (loading) setLoading(false);
        }
    };

    useEffect(() => {
        load();
        const intervalId = setInterval(load, 5000);
        return () => clearInterval(intervalId);
    }, []);

    const { upcomingTasks, pastDueTasks } = useMemo(() => {
        const now = new Date();
        const upcoming = [];
        const pastDue = [];

        const sorted = [...tasks].sort((a, b) => {
            if (!a.deadline) return 1;
            if (!b.deadline) return -1;
            return new Date(a.deadline) - new Date(b.deadline);
        });

        for (const task of sorted) {
            const deadline = task.deadline ? new Date(task.deadline) : null;
            if (deadline && deadline < now && !task.completed) {
                pastDue.push(task);
            } else {
                upcoming.push(task);
            }
        }
        
        return { upcomingTasks: upcoming, pastDueTasks: pastDue };
    }, [tasks]);

    const handleCreate = task => setTasks(prev => [task, ...prev]);
    const handleUpdate = updated => setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
    
    const handleDelete = async (id) => {
        try {
            await api.delete(`/tasks/${id}/`);
            setTasks(prev => prev.filter(t => t.id !== id));
        } catch (err) {
            console.error("Error deleting task:", err);
        }
    };

    const handleToggle = async (id) => {
        const task = tasks.find(t => t.id === id);
        if (task) {
            try {
                const res = await api.patch(`/tasks/${id}/`, { completed: !task.completed });
                handleUpdate(res.data);
            } catch (err) {
                console.error("Error toggling task:", err);
            }
        }
    };

    const renderTaskList = (taskList) => (
        taskList.map(t => (
            <TaskItem key={t.id} task={t} onToggle={handleToggle} onDelete={handleDelete}/>
        ))
    );

    return (
        <div className="tasks-container">
            <h1>Your Tasks</h1>
            <TaskForm onCreate={handleCreate} />
            {loading ? ( <div>Loading...</div> ) : (
                <>
                    {pastDueTasks.length > 0 && (
                        <section>
                            <h2 className="past-due-header">Past Due</h2>
                            {renderTaskList(pastDueTasks)}
                        </section>
                    )}
                    <section>
                        <h2>Upcoming</h2>
                        {upcomingTasks.length > 0 ? renderTaskList(upcomingTasks) : <p>You're all caught up!</p>}
                    </section>
                </>
            )}
        </div>
    );
}