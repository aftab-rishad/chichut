"use server";

import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";

const getProducts = async (
  req,
  { priceStart, priceEnd, category, subCategory }
) => {
  const getProductsQuery = gql`
    query GetProducts(
      $priceStart: Int
      $priceEnd: Int
      $category: String
      $subCategory: String
    ) {
    products(priceStart: $priceStart, priceEnd: $priceEnd, category: $category, subCategory: $subCategory) {
       ${req}
      }
    }
  `;
  try {
    const graphqlClient = await getGraphQLClient();
    const data = await graphqlClient.request(getProductsQuery, {
      priceStart,
      priceEnd,
      category,
      subCategory,
    });

    return data?.products;
  } catch (error) {
    console.log(error);
    return {
      error: error.response?.errors?.[0]?.message || "Failed to get products",
    };
  }
};

export default getProducts;
