"use server";

import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";
import { revalidatePath } from "next/cache";

const editProduct = async (data) => {
  const client = await getGraphQLClient();
  const query = gql`
    mutation EditProduct(
      $id: ID!
      $name: String!
      $size: [String!]!
      $color: [String!]!
      $description: String!
      $category: String!
      $subCategory: String!
      $stock: Int!
      $discount: Float
      $price: Float!
      $isFeatured: Boolean!
      $images: [String!]!
    ) {
      editProduct(
        id: $id
        name: $name
        size: $size
        color: $color
        description: $description
        category: $category
        subCategory: $subCategory
        stock: $stock
        discount: $discount
        price: $price
        isFeatured: $isFeatured
        images: $images
      ) {
        id
      }
    }
  `;
  try {
    const result = await client.request(query, data);
    revalidatePath("/", "layout");
    return result?.editProduct;
  } catch (error) {
    console.error("Error editing product:", error);
    return {
      error: error.response?.errors?.[0]?.message || "Failed to edit product",
    };
  }
};

export default editProduct;
