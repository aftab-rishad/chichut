"use server";

import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";
import { cookies } from "next/headers";
const isValidResetUrlQuery = gql`
  query isValidResetUrl($token: String!, $tokenId: String!) {
    isValidResetUrl(token: $token, tokenId: $tokenId)
  }
`;
const isValidResetUrl = async ({ token, tokenId }) => {
  const tokenCookies = cookies().get("token")?.value;
  const graphqlClient = await getGraphQLClient(tokenCookies);
  const data = await graphqlClient.request(isValidResetUrlQuery, {
    token,
    tokenId,
  });
  return data;
};

export default isValidResetUrl;
