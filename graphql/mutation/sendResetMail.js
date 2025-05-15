"use server";

import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";

const graphqlClient = await getGraphQLClient();
const sendResetMailMutation = gql`
  mutation ResetPasswordEmail($email: String!) {
    resetPasswordEmail(email: $email)
  }
`;

export const sendResetMail = async (email) => {
  try {
    const result = await graphqlClient.request(sendResetMailMutation, {
      email,
    });
    return result;
  } catch (error) {
    console.log("Error sending reset password link:", error);
    return {
      error:
        error.response?.errors?.[0]?.message ||
        "Failed to send reset password link",
    };
  }
};

export default sendResetMail;
