"use server";

import { gql } from "graphql-request";
import { cookies } from "next/headers";
import { getGraphQLClient } from "@/lib/graphqlClient";

const graphqlClient = await getGraphQLClient();

const me = async (requiredData) => {
  const meQuery = gql`
    query Me($token: String!) {
      me(token: $token) {
        ${requiredData}
      }
    }
  `;
  try {
    const cookieStore = await cookies();
    const token = cookieStore?.get("token")?.value;

    if (!token) {
      return null;
    }
    const data = await graphqlClient.request(meQuery, { token });

    return data?.me;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default me;
