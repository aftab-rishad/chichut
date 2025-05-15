"use server";

import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";
const graphqlClient = await getGraphQLClient();
const isValidResetUrlQuery = gql`
  query isValidResetUrl($token: String!, $tokenId: String!) {
    isValidResetUrl(token: $token, tokenId: $tokenId)
  }
`;
const isValidResetUrl = async ({ token, tokenId }) => {
  const data = await graphqlClient.request(isValidResetUrlQuery, {
    token,
    tokenId,
  });
  return data;
};

export default isValidResetUrl;
