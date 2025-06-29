import Navbar from "@/components/common/Navbar";
import me from "@/graphql/query/me";
import brandQuery from "@/graphql/query/brand";

async function NavLayout({ children }) {
  const session = await me("id email firstName lastName");
  const getBrand = await brandQuery({ userId: session?.id }, "id");

  return (
    <>
      <Navbar brand={getBrand} session={session} />
      <div>{children}</div>
    </>
  );
}

export default NavLayout;
