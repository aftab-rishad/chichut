"use server";

import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";
const graphqlClient = await getGraphQLClient();
export default async function brand({ id, userId, name }, requiredData) {
  const brandQuery = gql`
    query Brand($id: ID, $userId: ID, $name: String) {
      brand(id: $id, userId: $userId, name: $name) {
        ${requiredData}
      }
    }
  `;
  try {
    const data = await graphqlClient.request(brandQuery, {
      id: id || null,
      userId: userId || null,
      name: name || null,
    });
    return data.brand;
  } catch (error) {
    console.log(error);
    return null;
  }
}
