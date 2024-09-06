import { gql } from 'graphql-tag';

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
    deleteTodo(id: Int!): Boolean
  }
`;


export default typeDefs;