import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql', 
    credentials: 'same-origin', 
    headers: {
      'Authorization': 'Bearer your-token-if-required',
    }
  }),
  cache: new InMemoryCache(),
});

export default client;
