/* eslint-disable react/prop-types */
import { useMutation, gql } from '@apollo/client';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { red } from '@mui/material/colors';

const REMOVE_TODO = gql`
  mutation RemoveTodo($id: Int!) {
    deleteTodo(id: $id)
  }
`;

function DeleteButton({ todoId }) {
  const [deleteTodo, { loading }] = useMutation(REMOVE_TODO, {
    variables: { id: todoId },
    refetchQueries: ["GetTodos"], // Assumes "GetTodos" is the query to refresh the list
    onError: (err) => console.error('Error deleting todo:', err.message)
  });

  const handleDelete = () => {
    if (!loading) {
      deleteTodo();
    }
  };

  return (
    <Tooltip title="Delete Todo" placement="top">
      <IconButton onClick={handleDelete} aria-label="delete" size="large" disabled={loading}>
        <DeleteIcon style={{ color: red[500] }} />
      </IconButton>
    </Tooltip>
  );
}

export default DeleteButton;
