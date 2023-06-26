import { createYoga, createSchema } from "graphql-yoga";
import { typeDefs, resolvers } from "@/server/graphql/schema";

const { handleRequest } = createYoga({
  schema: createSchema({
    typeDefs: typeDefs,
    resolvers: resolvers,
  }),

  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response },
});

export { handleRequest as GET, handleRequest as POST };
