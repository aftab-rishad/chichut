"use server";

import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const updateCart = async (data) => {
  const query = gql`
    mutation UpdateCart($id: ID!, $quantity: Int!) {
      updateCart(id: $id, quantity: $quantity) {
        id
      }
    }
  `;
  try {
    const token = cookies().get("token")?.value;
    const graphqlClient = await getGraphQLClient(token);
    const result = await graphqlClient.request(query, data);
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
