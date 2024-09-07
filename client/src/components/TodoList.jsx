/* eslint-disable no-unused-vars */
import { useQuery, gql, useMutation } from '@apollo/client';
import TodoCard from './BoxComponent';

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
  mutation UpdateTodoStatus($id: ID!, $completed: Boolean!) {
    updateTodoStatus(id: $id, completed: $completed) {
      id
      completed
    }
  }
`;

const EDIT_TODO_TEXT = gql`
  mutation EditTodoText($id: ID!, $text: String!) {
    editTodoText(id: $id, text: $text) {
      id
      text
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

const TodoList = () => {
  const { loading, error, data } = useQuery(GET_TODOS);

  const [updateTodoStatus] = useMutation(UPDATE_TODO_STATUS);
  const [editTodoText] = useMutation(EDIT_TODO_TEXT);
  const [deleteTodo] = useMutation(DELETE_TODO);

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

  const handleEdit = (id, newText) => {
    editTodoText({
      variables: { id, text: newText },
      update(cache, { data: { editTodoText } }) {
        const existingTodos = cache.readQuery({ query: GET_TODOS });
        cache.writeQuery({
          query: GET_TODOS,
          data: {
            getTodos: existingTodos.getTodos.map(todo =>
              todo.id === id ? { ...todo, text: newText } : todo
            ),
          },
        });
      },
    });
  };

  const handleDelete = (id) => {
    deleteTodo({
      variables: { id },
      update(cache) {
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-8">
      {data.getTodos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onChangeStatus={() => handleChangeStatus(todo.id, todo.completed)}
          onEdit={(newText) => handleEdit(todo.id, newText)}
          onDelete={() => handleDelete(todo.id)}
        />
      ))}
    </div>
  );
};

export default TodoList;
