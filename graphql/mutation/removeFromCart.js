"use server";

import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";
import { revalidatePath } from "next/cache";

const deleteCart = async (id) => {
  const deleteCartMutation = gql`
    mutation RemoveFromCart($id: ID!) {
      removeFromCart(id: $id)
    }
  `;
  try {
    const graphqlClient = await getGraphQLClient();
    const data = await graphqlClient.request(deleteCartMutation, {
      id: Number(id),
    });
    revalidatePath("/", "layout");
    return data?.removeFromCart;
  } catch (error) {
    console.log("Delete Cart Error:", error);
    return {
      error: error.response?.errors?.[0]?.message || "Failed to delete cart",
    };
  }
};

export default deleteCart;
