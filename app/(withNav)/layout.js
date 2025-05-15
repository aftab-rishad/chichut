import Navbar from "@/components/common/Navbar";
import me from "@/graphql/query/me";

async function NavLayout({ children }) {
  const session = await me("id email firstName lastName");

  return (
    <>
      <Navbar session={session} />
      <div>{children}</div>
    </>
  );
}

export default NavLayout;
