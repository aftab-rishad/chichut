"use server";

import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";
const graphqlClient = await getGraphQLClient();
const brands = async (requiredData) => {
  const brandsQuery = gql`
    query Brands {
      brands {
        ${requiredData}
      }
    }
  `;
  try {
    const data = await graphqlClient.request(brandsQuery);
    return data?.brands;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default brands;
