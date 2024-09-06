/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Pencil,
  Trash2,
  RefreshCw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const TodoCard = ({ todo, onChangeStatus, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const truncatedText = todo.text.split(" ").slice(0, 15).join(" ");
  console.log(truncatedText);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className="
    p-4 
    border-2
    border-black
    rounded-lg 
    shadow-md 
    mb-2 
    
    sm:w-[20rem]
    lg:w-[38rem]
    xl:w-[40rem]

  


    "
    >
      <div className="mb-4">
        {todo.text.length > 50 ? (
          <div>
            <h2 className="text-xl font-semibold">
              {isExpanded ? todo.text : truncatedText}
            </h2>
            <button
              onClick={toggleExpand}
              className="text-blue-500 hover:underline focus:outline-none"
            >
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
        ) : (
          <h2 className="text-xl font-semibold">{todo.text}</h2>
        )}

        <p
          className={`
        text-sm 
        font-medium 
        
        mt-2
        
        `}
        >
          Status:{" "}
          <span
            className={`${todo.completed ? "text-green-500" : "text-red-500"}`}
          >
            {todo.completed ? "Done" : "Not Done"}
          </span>
        </p>
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
