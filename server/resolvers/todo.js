const todos = require('../data');


const resolvers = {
    Query: {
      getTodos: () => todos,
    },
    Mutation: {
      addTodo: (_, { text }) => {
        const newTodo = { id: todos.length, text, completed: false };
        todos.push(newTodo);
        return newTodo;
      },
      updateTodo: (_, { id, text, completed }) => {
        const index = todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
          todos[index] = { id, text, completed };
          return todos[index];
        }
        return null;
      },
      deleteTodo: (_, { id }) => {
        const index = todos.findIndex(todo => todo.id === id);
        if (index === -1) return false;
        todos.splice(index, 1);
        return true;
      },
      changeTodoStatus: (_, { id }) => {
        const index = todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
          todos[index].completed = !todos[index].completed;
          return todos[index];
        }
        return null
    },
    },
  };

    module.exports = resolvers;

    