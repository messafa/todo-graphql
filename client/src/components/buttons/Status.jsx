/* eslint-disable react/prop-types */

import { RefreshCw } from "lucide-react";
import { gql, useMutation } from '@apollo/client';

const GET_TODOS = gql`
  query GetTodos {
    getTodos {
      id
      text
      completed
    }
  }
`;

const UPDATE_TODO_STATUS = gql`
  mutation ChangeTodoStatus($id: Int!) {
    changeTodoStatus(id: $id) {
      id
      text
      completed
    }
  }
`;

const Status = ({ id }) => {
  const [updateTodoStatus] = useMutation(UPDATE_TODO_STATUS, {
    update(cache, { data: { changeTodoStatus } }) {
      const existingTodos = cache.readQuery({ query: GET_TODOS });
      cache.writeQuery({
        query: GET_TODOS,
        data: {
          getTodos: existingTodos.getTodos.map(todo =>
            todo.id === changeTodoStatus.id ? changeTodoStatus : todo
          ),
        },
      });
    },
    onError(error) {
      console.error("Error updating todo status:", error);
    }
  });

  const handleChangeStatus = () => {
    updateTodoStatus({
      variables: { id },
    });
  };

  return (
    <button
      onClick={handleChangeStatus}
      className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      aria-label="Change Status"
    >
      <RefreshCw size={16} />
    </button>
  );
}

export default Status;