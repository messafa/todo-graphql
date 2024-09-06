
import './App.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

// Create a custom theme
const theme = createTheme({
  palette: {
    background: {
      default: '#f4f6f8',
    },
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: '#ff1744',
    },
  },
  typography: {
    fontFamily: [
      'Poppins',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif'
    ].join(','),
    h2: {
      fontFamily: 'Poppins',
      fontWeight: 600,
      fontSize: '2.5rem',
    },
    body1: {
      fontFamily: 'Roboto',
      fontSize: '1.1rem',
    },
    body2: {
      fontFamily: 'Roboto',
      fontSize: '1rem',
    },
    button: {
      fontFamily: 'Poppins',
      fontWeight: 500,
      fontSize: '1rem',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'background.default',
          padding: 2,
        }}
      >
        <Container maxWidth="sm" component={Paper} elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
          <Typography variant="h2" component="h1" className="todo-title">
            CRUD App
          </Typography>
          <Divider sx={{ marginY: 2 }} />
          <TodoForm />
          <Divider sx={{ marginY: 2 }} />
          <TodoList />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
