"use server";

import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";
import { cookies } from "next/headers";

export default async function brand({ id, userId, name }, requiredData) {
  const brandQuery = gql`
    query Brand($id: ID, $userId: ID, $name: String) {
      brand(id: $id, userId: $userId, name: $name) {
        ${requiredData}
      }
    }
  `;
  try {
    const token = cookies().get("token")?.value;
    const graphqlClient = await getGraphQLClient(token);
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
