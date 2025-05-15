"use server";

import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";
import { revalidatePath } from "next/cache";

const graphqlClient = await getGraphQLClient();
const createStore = async (
  { name, email, location, image, description },
  response
) => {
  const createStoreMutation = gql`
    mutation CreateStore(
      $name: String!
      $email: String!
      $location: String!
      $image: String!
      $description: String!
    ) {
    createBrand(
        name: $name
        email: $email
        location: $location
        image: $image
        description: $description
      ) {
        ${response}
      }
    }
  `;

  try {
    const result = await graphqlClient.request(createStoreMutation, {
      name,
      email,
      location,
      image,
      description,
    });
    revalidatePath("/", "layout");
    return result;
  } catch (error) {
    console.log("Error creating store:", error);
    return {
      error: error.response?.errors?.[0]?.message || "Failed to create store",
    };
  }
};

export default createStore;
