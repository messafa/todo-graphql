
import { useQuery, gql } from '@apollo/client';

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul className="space-y-4">
      {data.getTodos.map((todo) => (
        <li key={todo.id} className="flex justify-between items-center">
          <span>{todo.text}</span>
          <span>{todo.completed ? '✅' : '❌'}</span>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;