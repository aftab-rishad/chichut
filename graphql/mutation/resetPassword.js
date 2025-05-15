"use server";

import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";

const graphqlClient = await getGraphQLClient();
const resetPasswordMutation = gql`
  mutation ResetPassword(
    $token: String!
    $tokenId: String!
    $password: String!
  ) {
    resetPassword(token: $token, tokenId: $tokenId, password: $password)
  }
`;

const resetPassword = async ({ token, tokenId, password }) => {
  try {
    const data = await graphqlClient.request(resetPasswordMutation, {
      token,
      tokenId,
      password,
    });
    return data;
  } catch (error) {
    console.error("Reset password error:", error);
    return {
      error: error.response?.errors?.[0]?.message || "Failed to reset password",
    };
  }
};

export default resetPassword;
