"use server";

import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";
import { cookies } from "next/headers";

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
    const token = cookies().get("token")?.value;
    const graphqlClient = await getGraphQLClient(token);
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
