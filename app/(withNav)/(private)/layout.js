import me from "@/graphql/query/me";
import { redirect } from "next/navigation";

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
