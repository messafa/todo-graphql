/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Pencil, Trash2, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

const TodoCard = ({ todo, onChangeStatus, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const truncatedText = todo.text.split(' ').slice(0, 15).join(' ');
  console.log(truncatedText);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-md mb-2">
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">{todo.text}</h3>
        <p className="text-lg font-semibold mb-2 break-words">
          {isExpanded ? todo.text : `${truncatedText}...`}
        </p>
        <button 
          onClick={toggleExpand} 
          className="text-blue-500 hover:text-blue-700 flex items-center"
        >
          {isExpanded ? (
            <>
              <ChevronUp size={16} className="mr-1" /> Show Less
            </>
          ) : (
            <>
              <ChevronDown size={16} className="mr-1" /> Show More
            </>
          )}
        </button>
        <p className="text-sm font-medium text-gray-600 mt-2">Status: {todo.completed ? "Done" : "Not Done"}</p>
      </div>
      <div className="flex justify-center space-x-2">
        <button 
          onClick={() => onEdit(todo.id)} 
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          aria-label="Edit"
        >
          <Pencil size={16} />
        </button>
        <button 
          onClick={() => onDelete(todo.id)} 
          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          aria-label="Delete"
        >
          <Trash2 size={16} />
        </button>
        <button 
          onClick={() => onChangeStatus(todo.id)} 
          className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          aria-label="Change Status"
        >
          <RefreshCw size={16} />
        </button>
      </div>
    </div>
  );
};

export default TodoCard;