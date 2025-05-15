"use server";

import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";

const graphqlClient = await getGraphQLClient();
const regenerateOtpMutation = gql`
  mutation RegenerateOtp($id: ID!) {
    regenerateOtp(id: $id)
  }
`;

const regenerateOtp = async ({ id }) => {
  try {
    const result = await graphqlClient.request(regenerateOtpMutation, {
      id,
    });
    return result;
  } catch (error) {
    console.log("Error regenerating OTP:", error);
    return {
      error: error.response?.errors?.[0]?.message || "Failed to regenerate OTP",
    };
  }
};

export default regenerateOtp;
