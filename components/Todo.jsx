export default function Todo({ todo, onDelete, onToggle }) {
  return (
    <div className="flex justify-between items-center bg-gray-100 p-3 rounded mb-2">
      <span
        onClick={() => onToggle(todo._id)}
        className={`cursor-pointer ${
          todo.completed ? "line-through text-gray-500" : ""
        }`}
      >
        {todo.text}
      </span>

      <button
        onClick={() => onDelete(todo._id)}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Delete
      </button>
    </div>
  );
}
