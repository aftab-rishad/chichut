import OrdersPage from "@/components/dashboard/orders/OrdersPage";
import TopSection from "@/components/dashboard/TopSection";
import React from "react";

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
