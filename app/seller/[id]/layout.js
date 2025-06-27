import DesktopSidebar from "@/components/dashboard/DesktopSidebar";
import brand from "@/graphql/query/brand";
import me from "@/graphql/query/me";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";

const MobileSidebar = dynamic(
  () => import("@/components/dashboard/MobileSidebar"),
  {
    ssr: false,
  }
);

export const metadata = {
  title: "ChicHut Dashboard",
  description: "Dashboard page",
};

async function DashboardLayout({ children, params: { id } }) {
  const user = await me("id");
  const brandWithId = await brand({ userId: user?.id }, "id");

  if (Number(brandWithId?.id) !== Number(id)) {
    brandWithId?.id
      ? redirect(`/seller/${brandWithId?.id}/dashboard`)
      : notFound();
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <DesktopSidebar id={id} />
      <MobileSidebar id={id} />
      <div className="overflow-y-auto w-full px-2 md:px-10">{children}</div>
    </div>
  );
}

export default DashboardLayout;
