"use server";
import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";

const getAllOrders = async (req) => {
  const graphqlClient = await getGraphQLClient();
  const ordersQuery = gql`
    query Orders {
      orders {
        ${req}
      }
    }
  `;
  try {
    const data = await graphqlClient.request(ordersQuery);
    return data?.orders;
  } catch (error) {
    console.log(error);
  }
};

export default getAllOrders;
