"use server";

import { gql } from "graphql-request";
import { cookies } from "next/headers";
import { getGraphQLClient } from "@/lib/graphqlClient";

const loginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const login = async (formData) => {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    const tokenGet = cookies().get("token")?.value;
    const graphqlClient = await getGraphQLClient(tokenGet);

    const data = await graphqlClient.request(loginMutation, {
      email,
      password,
    });
    const token = data?.login?.token;
    if (token) {
      const cookieStore = cookies();
      cookieStore.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
        maxAge: 31536000,
      });
    }
    return data;
  } catch (error) {
    console.error("Login error:", error);
    return { error: error.response?.errors?.[0]?.message || "Login failed" };
  }
};

export default login;
