"use server";

import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";

const graphqlClient = await getGraphQLClient();
const sendOtpMutation = gql`
  mutation sendOtp(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    sendOtp(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    )
  }
`;
const sendOtp = async (formData) => {
  try {
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");
    if (!firstName || !lastName || !email || !password) {
      throw new Error("All fields are required");
    }
    const data = await graphqlClient.request(sendOtpMutation, {
      firstName,
      lastName,
      email,
      password,
    });
    return data;
  } catch (error) {
    console.log(error);
    return { error: error.response?.errors?.[0]?.message || "Login failed" };
  }
};

export default sendOtp;
