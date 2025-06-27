"use server";
import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";

const graphqlClient = await getGraphQLClient();

const getUser = async ({ id }, req) => {
  try {
    const getUserQuery = gql`
      query Query($id: ID!) {
        user(id: $id) {
          ${req}
        }
      }
    `;
    const data = await graphqlClient.request(getUserQuery, {
      id: Number(id),
    });
    return data?.user;
  } catch (error) {
    console.log("Error geting user:", error);
    return {
      error: error.response?.errors?.[0]?.message || "Failed to get user",
    };
  }
};

export default getUser;
