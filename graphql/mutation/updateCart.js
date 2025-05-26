"use server";

import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";
import { revalidatePath } from "next/cache";

const updateCart = async (data) => {
  const client = await getGraphQLClient();
  const query = gql`
    mutation UpdateCart($id: ID!, $quantity: Int!) {
      updateCart(id: $id, quantity: $quantity) {
        id
      }
    }
  `;
  try {
    const result = await client.request(query, data);
    revalidatePath("/", "layout");
    return result?.updateCart;
  } catch (error) {
    console.error("Error updateCart:", error);
    return {
      error: error.response?.errors?.[0]?.message || "Failed to update cart",
    };
  }
};

export default updateCart;
