import me from "@/graphql/query/me";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

async function NavLayout({ children }) {
  const session = await me("id");

  if (!session?.id) {
    redirect("/login");
  }
  return (
    <>
      <div>{children}</div>
    </>
  );
}

export default NavLayout;
