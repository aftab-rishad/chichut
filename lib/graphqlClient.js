import { GraphQLClient } from "graphql-request";
import { cookies } from "next/headers";

export async function getGraphQLClient() {
  let token;

  try {
    const cookieStore = await cookies();
    token = cookieStore?.get("token")?.value;
  } catch (error) {
    console.warn(
      "Cookies not available in this context, proceeding without token"
    );
    token = null;
  }

  return new GraphQLClient(process.env.GRAPHQL_ENDPOINT, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
}
