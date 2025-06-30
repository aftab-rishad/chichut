"use server";

import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const deleteCart = async (id) => {
  const deleteCartMutation = gql`
    mutation RemoveFromCart($id: ID!) {
      removeFromCart(id: $id)
    }
  `;
  try {
    const token = cookies().get("token")?.value;
    const graphqlClient = await getGraphQLClient(token);
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
