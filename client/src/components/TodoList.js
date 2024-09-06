import React from 'react';
import { useQuery, gql } from '@apollo/client';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import DeleteButton from './DeleteButton';
import TodoItem from './TodoItem';

const GET_TODOS = gql`
  query GetTodos {
    getTodos {
      id
      text
      completed
    }
  }
`;

function TodoList() {
  const { data, loading, error } = useQuery(GET_TODOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <List dense>
      {data && data.getTodos.map(({ id, text, completed }) => (
        <ListItem key={id} style={{ textDecoration: completed ? 'line-through' : 'none' }}>
          <ListItemText primary={<TodoItem todo={{ id, text, completed }} />} />
          <ListItemSecondaryAction>
            <DeleteButton todoId={id} />
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}

export default TodoList;
