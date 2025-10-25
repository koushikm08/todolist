import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './todoApp.css';
import Clock from './clock';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/todos") 
      .then(res => setTodos(res.data))
      .catch(err => console.error(err));
  }, []);

  const fetchTodos = () => {
    axios.get("http://localhost:5000/api/todos")
      .then(res => setTodos(res.data))
      .catch(err => console.error("Error fetching todos:", err));
  };

  const addTodo = async () => {
    if (!title.trim()) return alert("Title is required");

    try {
      await axios.post("http://localhost:5000/api/todos", {
        title,
        description
      });
      fetchTodos();
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("Error adding todo:", err.response?.data || err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/todos/${id}`, { completed: !completed });
      setTodos(todos.map(todo => todo._id === id ? res.data : todo));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleDarkMode = () => {
  if (darkMode) {
    document.body.classList.remove('dark');
  } else {
    document.body.classList.add('dark');
  }
  setDarkMode(!darkMode);
};


  return (
    <div className={`todo-container ${darkMode ? "dark" : "light"}`}>
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <Clock />
      <h1>My Todo List</h1>

      <div className="todo-inputs">
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo._id} className={`todo-item ${todo.completed ? "completed" : ""}`}>
            <span
              onClick={() => toggleComplete(todo._id, todo.completed)}
            >
              {todo.title} - {todo.description}
            </span>
            <span className="created-at">
              Created at: {new Date(todo.createdAt).toLocaleString()}
            </span >
            <button onClick={() => deleteTodo(todo._id)}>DELETE</button>
            
          </li>
        ))}
      </ul>
    </div>
    
  );
}

export default TodoApp;
