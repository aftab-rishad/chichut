"use server";

import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";
const graphqlClient = await getGraphQLClient();
const carts = async (requiredData) => {
  const cartsQuery = gql`
    query Carts {
      carts {
        ${requiredData}
      }
    }
  `;
  try {
    const data = await graphqlClient.request(cartsQuery);
    return data?.carts;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default carts;
