/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { RefreshCw } from "lucide-react";
import { gql } from '@apollo/client';

const GET_TODOS = gql`
  query GetTodos {
    getTodos {
      id
      text
      completed
    }
  }
`;


const Status = ({id , Status}) => {

    const handleChangeStatus = (id, completed) => {
        updateTodoStatus({
          variables: { id, completed: !completed },
          update(cache, { data: { updateTodoStatus } }) {
            const existingTodos = cache.readQuery({ query: GET_TODOS });
            cache.writeQuery({
              query: GET_TODOS,
              data: {
                getTodos: existingTodos.getTodos.map(todo =>
                  todo.id === id ? { ...todo, completed: !todo.completed } : todo
                ),
              },
            });
          },
        });
      };

    return (
        <>
           <button
          onClick={handleChangeStatus}
          className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          aria-label="Change Status"
        >
          <RefreshCw size={16} />
        </button>  
        </>
    );
}

export default Status;
