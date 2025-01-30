import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql"// Replace with your actual GraphQL server URL
  
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
