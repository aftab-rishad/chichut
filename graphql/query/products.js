"use server";

import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";
import { cookies } from "next/headers";

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
    const token = cookies().get("token")?.value;
    const graphqlClient = await getGraphQLClient(token);
    const data = await graphqlClient.request(getProductsQuery, {
      priceStart: priceStart || 0,
      priceEnd: priceEnd || 1000000,
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
