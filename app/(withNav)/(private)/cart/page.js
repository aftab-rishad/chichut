import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import dynamicNext from "next/dynamic";
import { EmptyCart } from "@/components/cart/EmptyCart";
import carts from "@/graphql/query/carts";
import getProducts from "@/graphql/query/products";
import me from "@/graphql/query/me";

const CartItem = dynamicNext(() => import("@/components/cart/CartItem"), {
  ssr: false,
});
const CartSummary = dynamicNext(() => import("@/components/cart/CartSummary"), {
  ssr: false,
});

export const metadata = {
  title: "Shopping Cart",
  description: "View and manage your shopping cart items",
};

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function CartPage() {
  const allCarts = await carts("id color size quantity productId userId");
  const session = await me("id");

  const myCart = allCarts?.filter(
    (cart) => Number(cart?.userId) === Number(session?.id)
  );

  const allProducts = await getProducts(
    `id name price discount images stock`,
    {}
  );

  const cartItems = myCart?.map((cart) => {
    const product = allProducts?.find((p) => p?.id === cart?.productId);
    return {
      id: cart?.id,
      name: product?.name,
      price: Number(product?.price) - Number(product?.discount || 0),
      quantity: cart?.quantity,
      image: product?.images?.[0],
      color: cart?.color,
      size: cart?.size,
      stock: product?.stock,
    };
  });

  const hasItems = cartItems.length > 0;

  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
        <Link
          href="/products"
          className="flex items-center text-sm font-medium transition-colors hover:text-primary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Continue Shopping
        </Link>
      </div>

      {hasItems ? (
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem key={item?.id} item={item} />
              ))}
            </div>
          </div>

          <div className="md:col-span-1">
            <CartSummary items={cartItems} />
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}
