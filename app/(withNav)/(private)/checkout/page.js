import me from "@/graphql/query/me";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import carts from "@/graphql/query/carts";
import getProducts from "@/graphql/query/products";

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

export default async function CheckoutPageRoute({ searchParams }) {
  const { product, quantity } = searchParams;
  if (!product) notFound();
  if (
    (product !== "cart" && !quantity) ||
    (product !== "cart" && !searchParams?.color) ||
    (product !== "cart" && !searchParams?.size)
  )
    notFound();

  let products = [];

  try {
    const allCarts = await carts("id color size quantity productId");
    const allProducts = await getProducts(
      `id name price color size discount brand images stock`,
      {}
    );
    if (product === "cart") {
      products = allCarts?.map((cart) => {
        const product = allProducts?.find((p) => p?.id === cart?.productId);
        return {
          id: product?.id,
          name: product?.name,
          price: Number(product?.price) - Number(product?.discount || 0),
          quantity: Number(cart?.quantity),
          image: product?.images?.[0],
          color: cart?.color,
          size: cart?.size,
          brand: product?.brand,
        };
      });
    } else {
      const productById = allProducts?.find((p) => p?.id === product);
      const { stock, color, size, images, discount, ...singleProduct } =
        productById;
      const findColor = color?.find((c) => c?.slice(1) === searchParams?.color);
      const findSize = size?.find(
        (s) => s?.toLowerCase()?.trim() == searchParams?.size?.toLowerCase()
      );

      if (!productById || Number(quantity) > stock || !findColor || !findSize) {
        notFound();
      } else {
        products = [
          {
            ...singleProduct,
            price: Number(productById?.price) - Number(discount || 0),
            quantity: Number(quantity),
            image: images[0],
            color: `#${searchParams?.color}`,
            size: searchParams?.size,
          },
        ];
      }
    }
  } catch (error) {
    console.log("Error fetching products:", error);
    notFound();
  }
  if (products?.length < 1) {
    notFound();
  }

  const session = await me("id firstName lastName email");
  return (
    <>
      <CheckoutPage session={session} products={products} />
    </>
  );
}
