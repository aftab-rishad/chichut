"use server";

import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";
const graphqlClient = await getGraphQLClient();
export default async function brand({ id, userId }, requiredData) {
  const brandQuery = gql`
    query Brand($id: ID, $userId: ID) {
      brand(id: $id, userId: $userId) {
        ${requiredData}
      }
    }
  `;
  try {
    const data = await graphqlClient.request(brandQuery, {
      id: id || null,
      userId: userId || null,
    });
    return data.brand;
  } catch (error) {
    console.log(error);
    return null;
  }
}
