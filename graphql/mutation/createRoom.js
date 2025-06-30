"use server";
import { gql } from "graphql-request";
import { getGraphQLClient } from "@/lib/graphqlClient";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const createRoom = async ({ vendorId }, req) => {
  try {
    const token = cookies().get("token")?.value;
    const graphqlClient = await getGraphQLClient(token);
    const createRoomMutation = gql`
      mutation CreateRoom($vendorId: ID!) {
        createRoom(vendorId: $vendorId) {
          ${req}
        }
      }
    `;
    const data = await graphqlClient.request(createRoomMutation, {
      vendorId: Number(vendorId),
    });
    return data?.createRoom;
  } catch (error) {
    console.log("Error creating room:", error);
    return {
      error: error.response?.errors?.[0]?.message || "Failed to create room",
    };
  } finally {
    revalidatePath("/", "layout");
  }
};

export default createRoom;
