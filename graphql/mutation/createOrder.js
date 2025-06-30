"use server";

import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const createOrder = async (data, response) => {
  const createOrderMutation = gql`
    mutation CreateOrder(
      $address: String!
      $brand: String!
      $amount: Float!
      $city: String!
      $country: String!
      $countryCode: String!
      $email: String!
      $firstName: String!
      $lastName: String!
      $paymentMethod: String!
      $phone: String!
      $postalCode: String!
      $shippingMethod: String!
      $product: ProductInput!
    ) {
      createOrder(
        address: $address
        amount: $amount
        city: $city
        brand: $brand
        country: $country
        countryCode: $countryCode
        email: $email
        firstName: $firstName
        lastName: $lastName
        paymentMethod: $paymentMethod
        phone: $phone
        postalCode: $postalCode
        shippingMethod: $shippingMethod
        product: $product
      ) {
        ${response}
      }
    }
  `;

  try {
    const token = cookies().get("token")?.value;
    const graphqlClient = await getGraphQLClient(token);
    const result = await graphqlClient.request(createOrderMutation, data);
    revalidatePath("/", "layout");
    return result?.createOrder;
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      error: error.response?.errors?.[0]?.message || "Failed to create order",
    };
  }
};

export default createOrder;
