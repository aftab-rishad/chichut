import dynamicImport from "next/dynamic";

const OrdersPage = dynamicImport(
  () => import("@/components/dashboard/orders/OrdersPage"),
  {
    ssr: false,
  }
);

const TopSection = dynamicImport(
  () => import("@/components/dashboard/TopSection"),
  {
    ssr: false,
  }
);

export const dynamic = "force-dynamic";

async function OrdersVendor({ params: { id } }) {
  return (
    <>
      <TopSection description="View and manage customer orders.">
        Orders
      </TopSection>
      <OrdersPage id={id} />
    </>
  );
}

export default OrdersVendor;
