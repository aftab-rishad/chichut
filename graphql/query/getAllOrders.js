"use server";
import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";
import { cookies } from "next/headers";

const getAllOrders = async (req) => {
  const ordersQuery = gql`
    query Orders {
      orders {
        ${req}
      }
    }
  `;
  try {
    const token = cookies().get("token")?.value;
    const graphqlClient = await getGraphQLClient(token);
    const data = await graphqlClient.request(ordersQuery);
    return data?.orders;
  } catch (error) {
    console.log(error);
  }
};

export default getAllOrders;
