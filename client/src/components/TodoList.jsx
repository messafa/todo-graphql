// src/TodoList.jsx

import { useQuery, gql } from '@apollo/client';
import BoxComponent from './BoxComponent';

const GET_TODOS = gql`
  query GetTodos {
    getTodos {
      id
      text
      completed
    }
  }
`;

const TodoList = () => {
  const { loading, error, data } = useQuery(GET_TODOS);

  const handleChangeStatus = (id) => {
    console.log('Change status of todo with id:', id);
  };

  const handleEdit = (id) => {
    console.log('Edit todo with id:', id);
  };

  const handleDelete = (id) => {
    console.log('Delete todo with id:', id);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-8">
      {data.getTodos.map((todo) => (
        <BoxComponent key={todo.id}
          todo={todo}
          onChangeStatus={handleChangeStatus}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;