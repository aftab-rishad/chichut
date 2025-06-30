import { GraphQLClient } from "graphql-request";

export async function getGraphQLClient(token) {
  return new GraphQLClient(process.env.GRAPHQL_ENDPOINT, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
}
