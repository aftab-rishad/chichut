"use server";

import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";
import { cookies } from "next/headers";
const carts = async (requiredData) => {
  const cartsQuery = gql`
    query Carts {
      carts {
        ${requiredData}
      }
    }
  `;
  try {
    const token = cookies().get("token")?.value;
    const graphqlClient = await getGraphQLClient(token);
    const data = await graphqlClient.request(cartsQuery);
    return data?.carts;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default carts;
