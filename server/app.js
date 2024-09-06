const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { expressMiddlewares } = require("apollo-server-express");
const cors = require("cors");
const typeDefs = require("./schema/todo");
const resolvers = require("./resolvers/todo");


async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();



  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/graphql', expressMiddlewares({ server }));

  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  });
}

startApolloServer();
