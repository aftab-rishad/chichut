import me from "@/graphql/query/me";
import dynamic from "next/dynamic";

const CheckoutPage = dynamic(
  () => import("@/components/checkout/CheckoutPage"),
  {
    ssr: false,
  }
);

export const metadata = {
  title: "Checkout",
  description: "Complete your purchase",
};

export default async function CheckoutPageRoute() {
  const session = await me("firstName lastName email");
  return (
    <>
      <CheckoutPage session={session} />
    </>
  );
}
