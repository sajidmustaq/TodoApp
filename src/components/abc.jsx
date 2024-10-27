// src/TodoApp.js
import React, { useState } from 'react';
import './TodoApp.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const TodoApp = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
      setTask('');
    }
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="todo-container">
      <h2>My To-Do List</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}><i className="fas fa-plus"></i></button>
      </div>
      <ul className="task-list">
        {tasks.map((t) => (
          <li key={t.id} className={t.completed ? 'completed' : ''}>
            <span onClick={() => toggleComplete(t.id)}>
              <i className={t.completed ? 'fas fa-check-circle' : 'far fa-circle'}></i> {t.text}
            </span>
            <button onClick={() => deleteTask(t.id)}>
              <i className="fas fa-trash"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
