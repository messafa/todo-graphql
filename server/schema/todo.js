const  { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Todo {
    id: Int!
    text: String!
    completed: Boolean!
  }

  type Query {
    getTodos: [Todo]
  }

  type Mutation {
    addTodo(text: String!): Todo
    updateTodo(id: Int!, text: String!, completed: Boolean!): Todo
    changeTodoStatus(id: Int!): Todo
    deleteTodo(id: Int!): Boolean
  }
`;

module.exports = typeDefs;

