"use server";

import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";
import { revalidatePath } from "next/cache";

const graphqlClient = await getGraphQLClient();

const createProduct = async (data, response) => {
  const createProductMutation = gql`
    mutation CreateProduct(
    $name: String!
    $size: [String!]!
    $color: [String!]!
    $description: String!
    $category: String!
    $subCategory: String!
    $stock: Int!
    $discount: Int
    $price: Int!
    $isFeatured: Boolean!
    $images: [String!]!
    ) {
    createProduct(
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
        ${response}
      }
    }
  `;

  try {
    const result = await graphqlClient.request(createProductMutation, data);
    revalidatePath("/", "layout");
    return result;
  } catch (error) {
    console.log("Error creating product:", error);
    return {
      error: error.response?.errors?.[0]?.message || "Failed to create product",
    };
  }
};

export default createProduct;
