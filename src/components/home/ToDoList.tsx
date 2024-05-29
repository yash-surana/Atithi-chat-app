import React, { useState } from 'react';
import './style.css'; // Import the CSS file for styling

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const ToDoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Send event invites', completed: true },
    { id: 2, text: 'Send event invites', completed: true },
    { id: 3, text: 'Send event invites', completed: false },
    { id: 4, text: 'Send event invites', completed: false },
  ]);
  const [newTaskText, setNewTaskText] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false); // New state for input visibility

  const handleToggle = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleAddTask = () => {
    if (newTaskText.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTaskText, completed: false }]);
      setNewTaskText('');
      setIsInputVisible(false); // Hide the input box after adding the task
    }
  };

  const handleShowInput = () => {
    setIsInputVisible(true); // Show the input box
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h3>To-Do List</h3>
        <div className="todo-icon"></div>
      </div>
      <ul className="todo-list">
        {tasks.map(task => (
          <li key={task.id} className="todo-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggle(task.id)}
              className="todo-checkbox"
            />
            <span className={task.completed ? 'completed' : ''}>{task.text}</span>
            <button onClick={() => handleDelete(task.id)} className="todo-delete">🗑</button>
          </li>
        ))}
      </ul>
      {isInputVisible ? (
        <div className="todo-add">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="New task"
            className="todo-input"
          />
          <button onClick={handleAddTask} className="todo-add-button">Add Task</button>
        </div>
      ) : (
        <button onClick={handleShowInput} className="todo-add-button">Add Task</button>
      )}
    </div>
  );
};

export default ToDoList;
