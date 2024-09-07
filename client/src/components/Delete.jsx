/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { Trash2 } from "lucide-react";
import { gql } from '@apollo/client';

const DELETE_TODO = gql`
    mutation DeleteTodo($id: ID!) {
        deleteTodo(id: $id) {
            id
        }
    }
`;



const Delete = ({id}) => {

    const onDelete = (id) => {
        deleteTodo({
            variables: { id },
            update(cache, { data: { deleteTodo } }) {
                const existingTodos = cache.readQuery({ query: GET_TODOS });
                cache.writeQuery({
                    query: GET_TODOS,
                    data: {
                        getTodos: existingTodos.getTodos.filter(todo => todo.id !== id),
                    },
                });
            },
        });
    };




    return (
        <>
        <button
          onClick={() => onDelete(id)}
          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          aria-label="Delete"
        >
          <Trash2 size={16} />
        </button>
        </>
    );
}

export default Delete;
