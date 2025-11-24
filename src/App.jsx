import { useEffect, useState } from "react";
import axios from "axios";
import Todo from "../components/Todo";  // ✔ using Todo component

export default function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  const API = `${import.meta.env.VITE_API_URL}/api/todos`;

  // Load todos on page load
  useEffect(() => {
    axios.get(API).then((res) => setTodos(res.data));
  }, []);

  // Add Todo
  const addTodo = () => {
    if (!text.trim()) return;

    axios.post(API, { text }).then((res) => {
      setTodos([...todos, res.data]);
      setText("");
    });
  };

  // Delete Todo
  const deleteTodo = (id) => {
    axios.delete(`${API}/${id}`).then(() => {
      setTodos(todos.filter((t) => t._id !== id));
    });
  };

  // Toggle Complete
  const toggleTodo = (id) => {
    axios.put(`${API}/${id}`).then((res) => {
      setTodos(todos.map((t) => (t._id === id ? res.data : t)));
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-start pt-10 bg-gray-200">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">To-Do App</h1>

        <div className="flex mb-4">
          <input
            className="border p-2 w-full rounded"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter a task"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 ml-2 rounded"
          >
            Add
          </button>
        </div>

        {/* ✔ Use Todo component here */}
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
  );
}
