"use server";
import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";
import { cookies } from "next/headers";

const getReviewByProduct = async ({ id }, req) => {
  const reviewQuery = gql`query GetReviewByProduct($id: ID!) {
  getReviewByProduct(id: $id) {
    ${req}
  }
}`;
  try {
    const token = cookies().get("token")?.value;
    const graphqlClient = await getGraphQLClient(token);
    const data = await graphqlClient.request(reviewQuery, {
      id: Number(id),
    });
    return data?.getReviewByProduct;
  } catch (error) {
    console.log(error);
    return {
      error: error.response?.errors?.[0]?.message || "Failed to get review",
    };
  }
};

export default getReviewByProduct;
