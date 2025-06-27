import TopSection from "@/components/dashboard/TopSection";
import { redirect } from "next/navigation";
import React from "react";

function Dashboard({ params: { id } }) {
  redirect(`/seller/${id}/dashboard/products`);

  return (
    <>
      <TopSection description="Welcome back! Here's an overview of your store performance.">
        Dashboard
      </TopSection>
    </>
  );
}

export default Dashboard;
