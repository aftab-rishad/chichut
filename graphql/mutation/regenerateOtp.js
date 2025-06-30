"use server";

import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";
import { cookies } from "next/headers";

const regenerateOtpMutation = gql`
  mutation RegenerateOtp($id: ID!) {
    regenerateOtp(id: $id)
  }
`;

const regenerateOtp = async ({ id }) => {
  try {
    const token = cookies().get("token")?.value;
    const graphqlClient = await getGraphQLClient(token);
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
