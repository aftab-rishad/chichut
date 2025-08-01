"use server";

import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";
import { cookies } from "next/headers";
const isValidOtpUrlQuery = gql`
  query isValidOtpUrl($id: ID!) {
    isValidOtpUrl(id: $id)
  }
`;
const isValidOtpUrl = async ({ id }) => {
  try {
    const token = cookies().get("token")?.value;
    const graphqlClient = await getGraphQLClient(token);
    const data = await graphqlClient.request(isValidOtpUrlQuery, { id });
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default isValidOtpUrl;
