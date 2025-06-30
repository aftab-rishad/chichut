"use server";
import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";
import { cookies } from "next/headers";

const getRoomByIds = async ({ vendorId, clientId }, req) => {
  try {
    const getRoomQuery = gql`
      query Query($clientId: ID!, $vendorId: ID!) {
        roomByIds(clientId: $clientId, vendorId: $vendorId) {
          ${req}
        }
      }
    `;
    const token = cookies().get("token")?.value;
    const graphqlClient = await getGraphQLClient(token);
    const data = await graphqlClient.request(getRoomQuery, {
      vendorId: Number(vendorId),
      clientId: Number(clientId),
    });
    return data?.roomByIds;
  } catch (error) {
    console.log("Error geting room:", error);
    return {
      error: error.response?.errors?.[0]?.message || "Failed to get room",
    };
  }
};

export default getRoomByIds;
