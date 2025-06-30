"use server";
import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";
import { cookies } from "next/headers";

const getUser = async ({ id }, req) => {
  try {
    const getUserQuery = gql`
      query Query($id: ID!) {
        user(id: $id) {
          ${req}
        }
      }
    `;
    const token = cookies().get("token")?.value;
    const graphqlClient = await getGraphQLClient(token);
    const data = await graphqlClient.request(getUserQuery, {
      id: Number(id),
    });
    return data?.user;
  } catch (error) {
    console.log("Error geting user:", error);
    return {
      error: error.response?.errors?.[0]?.message || "Failed to get user",
    };
  }
};

export default getUser;
