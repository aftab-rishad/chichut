"use server";

import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";

const getProductById = async (id, req) => {
  const query = gql`
    query getProductById($id: ID!) {
        product(id: $id) {
            ${req}
        }
    }`;

  try {
    const graphqlClient = await getGraphQLClient();
    const data = await graphqlClient.request(query, {
      id,
    });
    return data?.product;
  } catch (error) {
    console.log(error);
    return {
      error: error.response?.errors?.[0]?.message || "Failed to get products",
    };
  }
};

export default getProductById;
