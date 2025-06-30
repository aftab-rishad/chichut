"use server";
import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const createReview = async (data) => {
  const mutation = gql`
    mutation CreateReview($rating: Int!, $comment: String!, $productId: ID!) {
      createReview(rating: $rating, comment: $comment, productId: $productId) {
        id
      }
    }
  `;
  try {
    const token = cookies().get("token")?.value;
    const graphqlClient = await getGraphQLClient(token);
    const reviewData = await graphqlClient.request(mutation, data);
    revalidatePath("/", "layout");
    return reviewData?.createReview;
  } catch (error) {
    console.log(error, "Error createing review");
    return {
      error: error.response?.errors?.[0]?.message || "Failed to create product",
    };
  }
};

export default createReview;
