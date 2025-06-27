"use server";
import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";

const graphqlClient = await getGraphQLClient();

const getRooms = async ({ roomFor, id }, req) => {
  try {
    const getRoomQuery = gql`
      query Query($id: ID!, $roomFor: sender!) {
        rooms(id: $id, roomFor: $roomFor) {
          ${req}
        }
      }
    `;
    const data = await graphqlClient.request(getRoomQuery, {
      id: Number(id),
      roomFor,
    });
    return data?.rooms;
  } catch (error) {
    console.log("Error geting room:", error);
    return {
      error: error.response?.errors?.[0]?.message || "Failed to get room",
    };
  }
};

export default getRooms;
