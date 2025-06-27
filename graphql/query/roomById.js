"use server";
import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";

const graphqlClient = await getGraphQLClient();

const getRoomById = async ({ id }, req) => {
  try {
    const getRoomQuery = gql`
      query Query($id: ID!) {
        roomById(id: $id) {
          ${req}
        }
      }
    `;
    const data = await graphqlClient.request(getRoomQuery, {
      id: Number(id),
    });
    return data?.roomById;
  } catch (error) {
    console.log("Error geting room:", error);
    return {
      error: error.response?.errors?.[0]?.message || "Failed to get room",
    };
  }
};

export default getRoomById;
