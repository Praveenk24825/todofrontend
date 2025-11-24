import { useEffect, useState } from "react";
import axios from "axios";
import Todo from "../components/Todo";

export default function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  const API = `${import.meta.env.VITE_API_URL}/api/todos`;

  // Load todos
  useEffect(() => {
    axios.get(API).then((res) => setTodos(res.data));
  }, []);

  const addTodo = () => {
    if (!text.trim()) return;

    axios.post(API, { text }).then((res) => {
      setTodos([...todos, res.data]);
      setText("");
    });
  };

  const deleteTodo = (id) => {
    axios.delete(`${API}/${id}`).then(() => {
      setTodos(todos.filter((t) => t._id !== id));
    });
  };

  const toggleTodo = (id) => {
    axios.put(`${API}/${id}`).then((res) => {
      setTodos(todos.map((t) => (t._id === id ? res.data : t)));
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800 tracking-wide">
          📝 To-Do App
        </h1>

        <div className="flex mb-6">
          <input
            className="border border-gray-300 p-3 w-full rounded-xl focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter a task..."
          />

          <button
            onClick={addTodo}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 ml-3 rounded-xl font-semibold shadow-md"
          >
            Add
          </button>
        </div>

        <div className="space-y-3">
          {todos.length === 0 && (
            <p className="text-center text-gray-500">No tasks yet. Add one!</p>
          )}

          {todos.map((todo) => (
            <Todo
              key={todo._id}
              todo={todo}
              onDelete={deleteTodo}
              onToggle={toggleTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}  const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Get all todos
router.get("/", async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

// Add todo
router.post("/", async (req, res) => {
    const newTodo = new Todo({
        text: req.body.text
    });
    await newTodo.save();
    res.json(newTodo);
});

// Delete todo
router.delete("/:id", async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
});

// Toggle completed
router.put("/:id", async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
});

module.exports = router;  