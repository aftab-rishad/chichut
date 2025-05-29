"use server";

import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";
import { revalidatePath } from "next/cache";

const graphqlClient = await getGraphQLClient();

const createOrder = async (data, response) => {
  const createOrderMutation = gql`
    mutation CreateOrder(
      $address: String!
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
      $products: [ProductInput!]!
    ) {
      createOrder(
        address: $address
        amount: $amount
        city: $city
        country: $country
        countryCode: $countryCode
        email: $email
        firstName: $firstName
        lastName: $lastName
        paymentMethod: $paymentMethod
        phone: $phone
        postalCode: $postalCode
        shippingMethod: $shippingMethod
        products: $products
      ) {
        ${response}
      }
    }
  `;

  try {
    const result = await graphqlClient.request(createOrderMutation, data);
    revalidatePath("/", "layout");
    return result;
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      error: error.response?.errors?.[0]?.message || "Failed to create order",
    };
  }
};

export default createOrder;
