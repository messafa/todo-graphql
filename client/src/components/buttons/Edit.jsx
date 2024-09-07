import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Pencil } from "lucide-react";

const GET_TODOS = gql`
  query GetTodos {
    getTodos {
      id
      text
      completed
    }
  }
`;

const EDIT_TODO_TEXT = gql`
  mutation UpdateTodo($updateTodoId: Int!, $text: String!, $completed: Boolean!) {
    updateTodo(id: $updateTodoId, text: $text, completed: $completed) {
      id
      text
      completed
    }
  }
`;

const Edit = ({ todo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const [updateTodo] = useMutation(EDIT_TODO_TEXT, {
    update(cache, { data: { updateTodo } }) {
      const existingTodos = cache.readQuery({ query: GET_TODOS });
      cache.writeQuery({
        query: GET_TODOS,
        data: {
          getTodos: existingTodos.getTodos.map((t) =>
            t.id === updateTodo.id ? updateTodo : t
          ),
        },
      });
      closeModal();
    },
    onError(error) {
      console.error("Error updating todo:", error);
    }
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    updateTodo({
      variables: {
        updateTodoId: todo.id,
        text: newText,
        completed: todo.completed // Ensure this is set correctly
      },
    });
  };

  return (
    <>
      <button
        onClick={openModal}
        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        aria-label="Edit"
      >
        <Pencil size={16} />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl font-semibold mb-4">Edit Todo</h2>
            <textarea
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Edit;