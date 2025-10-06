import React, { useEffect, useState } from 'react';
import api from '../api/api';
import TaskForm from '../components/Taskform';
import TaskItem from '../components/Taskitem';

export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    

    const load = async () => {
        try{
            const res = await api.get('tasks/');
            setTasks(res.data);
        }
        catch (err) {
          console.error("error loading tasks:", err);
        }
        finally {
          if (loading){
            setLoading(false);
          }
        }    
    }

    useEffect(() => {
        load();
        const intervalId = setInterval(load, 1000); return () => clearInterval(intervalId)
    }, []);

    const handleCreate = task => setTasks(prev => [task, ...prev]);
    const handleUpdate = updated => setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
    const handleDelete = async (id) => {
      try {
        await api.delete(`/tasks/${id}/`);
      }
      catch (err) {
        console.error("Error deleteing task:", err);
      }
    }

    const handleToggle = async (id) => {
        const task = tasks.find(t => t.id === id);
        if (task) {
            try {
                const res = await api.patch(`tasks/${id}/`, { completed: !task.completed });
                handleUpdate(res.data);
            } catch (err) {
                console.error("Error toggling task:", err);
            }
        }
    };

     return (
    <div>
      <h1>Your Tasks</h1>
      <TaskForm onCreate={handleCreate} />
      {loading ? <div>Loading...</div> : (
        <div>
          {tasks.map(t => (
            <TaskItem key={t.id} task={t} onToggle={handleToggle} onDelete={handleDelete}/>
          ))}
        </div>
      )}
    </div>
  );
}
