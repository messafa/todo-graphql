/* eslint-disable react/prop-types */
// src/TodoCard.jsx


function TodoCard({ todo, onChangeStatus, onEdit, onDelete }) {
  return (
    <div className="bg-transparent shadow-md rounded-lg p-4 flex justify-between items-center mb-2 border-y-2 ">
      <div>
        <h2 className="text-xl font-semibold">{todo.text}</h2>
        <p className={`mt-2 ${todo.completed ? 'text-green-500' : 'text-red-500'}`}>
          {todo.completed ? 'Done' : 'Not Done'}
        </p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onChangeStatus(todo.id)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Change Status
        </button>
        <button
          onClick={() => onEdit(todo.id)}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoCard;