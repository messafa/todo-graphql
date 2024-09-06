import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
      text
      completed
    }
  }
`;

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    background: 'linear-gradient(45deg, #FE6B8B 40%, #FF8E53 100%)',
  },
  '&:disabled': {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    opacity: 0.5,
  },
}));

function TodoForm() {
  const [text, setText] = useState('');
  const [addTodo, { loading, error }] = useMutation(ADD_TODO, {
    refetchQueries: ["GetTodos"], // Ensure the query name is correct
    onCompleted: () => setText(''), // Clear input on successful completion
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (text.trim() !== '') {
      addTodo({ variables: { text } });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, alignItems: 'center', marginBottom: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a task"
        disabled={loading}
      />
      <StyledButton type="submit" variant="contained" color="primary" disabled={loading}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          {loading && <CircularProgress size={24} sx={{ color: 'white', marginRight: 1 }} />}
          {loading ? 'Adding...' : 'Submit'}
        </Box>
      </StyledButton>
      <Snackbar open={!!error} autoHideDuration={6000}>
        <Alert severity="error" variant="filled">
          Error adding todo: {error?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default TodoForm;
