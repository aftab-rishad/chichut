"use server";
import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";
import { revalidatePath } from "next/cache";

const addToCart = async ({ productId, quantity, color, size }) => {
  const client = await getGraphQLClient();

  const mutation = gql`
    mutation AddToCart(
      $productId: ID!
      $quantity: Int!
      $color: String!
      $size: String!
    ) {
      addToCart(
        productId: $productId
        quantity: $quantity
        color: $color
        size: $size
      ) {
        id
      }
    }
  `;
  try {
    const response = await client.request(mutation, {
      productId: Number(productId),
      quantity: Number(quantity),
      color,
      size,
    });
    revalidatePath("/cart");
    return response.addToCart;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return {
      error: error.response?.errors?.[0]?.message || "Failed to adding to cart",
    };
  }
};
export default addToCart;
