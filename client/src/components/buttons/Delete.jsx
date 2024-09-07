/* eslint-disable react/prop-types */

import { Trash2 } from "lucide-react";
import { gql, useMutation } from '@apollo/client';

const DELETE_TODO = gql`
  mutation DeleteTodo($id: Int!) {
    deleteTodo(id: $id)
  }
`;

const GET_TODOS = gql`
  query GetTodos {
    getTodos {
      id
      text
      completed
    }
  }
`;

const Delete = ({ id }) => {
  const [deleteTodo] = useMutation(DELETE_TODO, {
    update(cache) {
      const existingTodos = cache.readQuery({ query: GET_TODOS });
      cache.writeQuery({
        query: GET_TODOS,
        data: {
          getTodos: existingTodos.getTodos.filter(todo => todo.id !== id),
        },
      });
    },
    onError(error) {
      console.error("Error deleting todo:", error);
    }
  });

  const onDelete = () => {
    deleteTodo({
      variables: { id },
    });
  };

  return (
    <button
      onClick={onDelete}
      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      aria-label="Delete"
    >
      <Trash2 size={16} />
    </button>
  );
}

export default Delete;