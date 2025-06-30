"use server";

import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";
import { cookies } from "next/headers";
const brands = async (requiredData) => {
  const brandsQuery = gql`
    query Brands {
      brands {
        ${requiredData}
      }
    }
  `;
  try {
    const token = cookies().get("token")?.value;
    const graphqlClient = await getGraphQLClient(token);
    const data = await graphqlClient.request(brandsQuery);
    return data?.brands;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default brands;
