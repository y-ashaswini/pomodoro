import { ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache: cache,
  // uri: "https://taskpomodoros.vercel.app/api/graphql",
  uri: "http://localhost:3000/api/graphql",
});

export default client;
