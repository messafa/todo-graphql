import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: Int!, $text: String!, $completed: Boolean!) {
    updateTodo(id: $id, text: $text, completed: $completed) {
      id
      text
      completed
    }
  }
`;

function TodoItem({ todo }) {
  const [editMode, setEditMode] = useState(false);
  const [text, setText] = useState(todo.text);
  const [completed, setCompleted] = useState(todo.completed);
  const [updateTodo] = useMutation(UPDATE_TODO, {
    variables: { id: todo.id, text, completed }
  });

  const handleToggleCompleted = () => {
    setCompleted(!completed);
    updateTodo();
  };

  const handleSave = () => {
    updateTodo();
    setEditMode(false);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Checkbox checked={completed} onChange={handleToggleCompleted} />
      {editMode ? (
        <TextField
          value={text}
          onChange={e => setText(e.target.value)}
          onBlur={handleSave}
          autoFocus
          fullWidth
        />
      ) : (
        <span onDoubleClick={() => setEditMode(true)} style={{ flexGrow: 1, textDecoration: completed ? 'line-through' : 'none' }}>
          {text}
        </span>
      )}
      <IconButton onClick={() => setEditMode(true)} aria-label="edit">
        {editMode ? <SaveIcon /> : <EditIcon />}
      </IconButton>
    </div>
  );
}

export default TodoItem;
