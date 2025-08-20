import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import './TaskPage.css';

export default function TaskPage() {

    const navigate = useNavigate(); // Hook for navigation

    const [title, setTitle] = useState("");
    const [tasks, setTasks] = useState([]);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTitle, setEditingTitle] = useState("");

    const token = localStorage.getItem("token");

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login"); // redirect to login page
    };

    // Get all tasks
    useEffect(() => {
        const fetchTasks = async () => {
            if (!token) return;
            const response = await fetch("http://localhost:5000/api/tasks/tasks", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            });
            const allTasks = await response.json();
            setTasks(allTasks);
        };
        fetchTasks();
    }, [token]);

    // Add task
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/tasks/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ title })
        });
        const newTask = await response.json();
        setTasks([...tasks, newTask]);
        setTitle("");
    };

    // Update task
    const handleUpdate = async (taskId) => {
        const response = await fetch(`http://localhost:5000/api/tasks/tasks/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ title: editingTitle })
        });
        const updatedTask = await response.json();
        setTasks(tasks.map(t => t._id === taskId ? updatedTask : t));
        setEditingTaskId(null);
    };

    // Delete task
    const handleDelete = async (taskId) => {
        await fetch(`http://localhost:5000/api/tasks/tasks/${taskId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(tasks.filter(t => t._id !== taskId));
    };


    const handleComplete = async (taskId) => {
        const response = await fetch(`http://localhost:5000/api/tasks/tasks/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ completed: true })
        })

        const updatedTask = await response.json();
        setTasks(tasks.map(t => t._id === taskId ? updatedTask : t));

    }

    return (

        <div style={{ backgroundColor: "#87ceeb",height:"100vh",padding: "40px 0"   }}>
            <div className="task-container">

                {/* Logout Button */}
                <div style={{ textAlign: 'right', marginBottom: '10px' }}>
                    <button onClick={handleLogout} style={{ backgroundColor: '#dc3545', color: 'white' }}>
                        Logout
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter task"
                        required
                    />
                    <button type="submit">Add Task</button>
                </form>

                <ul className="tasksList">
                    {tasks.map((task) => (
                        <li key={task._id}>
                            {editingTaskId === task._id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editingTitle}
                                        onChange={(e) => setEditingTitle(e.target.value)}
                                    />
                                    <button onClick={() => handleUpdate(task._id)}>Save</button>
                                    <button onClick={() => setEditingTaskId(null)}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    {task.title}

                                    <span className={task.completed ? "status-completed" : "status-pending"}>
                                        {task.completed ? "(Completed)" : "(Pending)"}
                                    </span>

                                    {task.completed === false && (
                                        <button onClick={() => handleComplete(task._id)}>
                                            Mark as Complete
                                        </button>
                                    )}

                                    <button onClick={() => { setEditingTitle(task.title); setEditingTaskId(task._id) }}>
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(task._id)}>Delete</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    );
}
