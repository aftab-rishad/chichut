import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler as startGQLServer } from "@as-integrations/next";
import { resolvers } from "@/app/api/v1/graphql/resolvers";
import fs from "fs";
import { typeDefs } from "./schema";

const apolloServer = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startGQLServer(apolloServer, {
  context: async (req) => {
    const authHeader = req.headers.get("Authorization") || "";
    if (authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      try {
        return { token };
      } catch (error) {
        console.error("Invalid token:", error.message);
      }
    }
    return {};
  },
});

export { handler as GET, handler as POST };
