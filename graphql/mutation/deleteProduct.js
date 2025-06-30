"use server";

import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const deleteProduct = async (id) => {
  const deleteProductMutation = gql`
    mutation DeleteProduct($id: ID!) {
      deleteProduct(id: $id)
    }
  `;
  try {
    const token = cookies().get("token")?.value;
    const graphqlClient = await getGraphQLClient(token);
    const data = await graphqlClient.request(deleteProductMutation, { id });
    revalidatePath("/", "layout");
    return data?.deleteProduct;
  } catch (error) {
    console.log("Delete Product Error:", error);
    return {
      error: error.response?.errors?.[0]?.message || "Failed to delete product",
    };
  }
};

export default deleteProduct;
