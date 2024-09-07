/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import {  ChevronDown, ChevronUp } from "lucide-react";
import Status from "./Status";
import Delete from "./Delete";
import Edit from "./Edit";

const TodoCard = ({ todo, onChangeStatus, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const truncatedText = todo.text.split(" ").slice(0, 15).join(" ");
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleEdit = () => {
    if (isEditing && newText.trim() !== "") {
      onEdit(newText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <>
    <div className="p-4 border-2 border-black rounded-lg shadow-md mb-2 sm:w-[20rem] lg:w-[38rem] xl:w-[40rem]">
      <div className="mb-4">
        {isEditing ? (
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="w-full border p-2 rounded"
          />
        ) : todo.text.length > 50 ? (
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

        <p className="text-sm font-medium mt-2">
          Status:{" "}
          <span className={`${todo.completed ? "text-green-500" : "text-red-500"}`}>
            {todo.completed ? "Done" : "Not Done"}
          </span>
        </p>
      </div>
      <div className="flex justify-center space-x-2">
        <Edit todo={todo} />
        
        <Delete id={todo.id} />
        
        <Status id={todo.id} Status={todo.completed}  />
      </div>
    </div>
    </>
  );
};

export default TodoCard;
