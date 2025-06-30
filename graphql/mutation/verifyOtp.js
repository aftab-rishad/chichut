"use server";

import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";
import { cookies } from "next/headers";

const verifyOtpMutation = gql`
  mutation VerifyOtp($id: ID!, $otp: String!) {
    verifyOtp(id: $id, otp: $otp)
  }
`;

const verifyOtp = async ({ id, otp }) => {
  try {
    const token = cookies().get("token")?.value;
    const graphqlClient = await getGraphQLClient(token);

    const result = await graphqlClient.request(verifyOtpMutation, {
      id,
      otp,
    });
    return result;
  } catch (error) {
    console.log("Error verifying OTP:", error);
    return {
      error: error.response?.errors?.[0]?.message || "Failed to verify OTP",
    };
  }
};

export default verifyOtp;
