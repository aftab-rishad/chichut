import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AddToCart from "./AddToCart";
import carts from "@/graphql/query/carts";
import me from "@/graphql/query/me";

export default async function ProductCard({ product }) {
  const allCarts = await carts("productId userId");
  const session = await me("id");
  const myCarts = allCarts?.filter(
    (cart) => Number(cart?.userId) === Number(session?.id)
  );
  const isAlreadyInCart =
    myCarts?.find((cart) => Number(cart.productId) === Number(product?.id))
      ?.productId === product?.id;

  return (
    <Card className="overflow-hidden duration-300 w-72 transition-all hover:shadow-md">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={product?.images[0] || "/placeholder.svg"}
          alt={product?.name}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="px-4">
        <h3 className="font-medium text-foreground line-clamp-2">
          {product.name}
        </h3>
        <p className="font-semibold">
          <span className="text-xl font-bold">
            ${(Number(product?.price) - Number(product?.discount)).toFixed(2)}
          </span>
          {product?.discount > 0 && (
            <>
              <span className="ml-2 text-md text-muted-foreground line-through">
                ${Number(product?.price)?.toFixed(2)}
              </span>
            </>
          )}
        </p>
      </CardContent>
      <CardFooter className="p-2 pt-0 flex flex-col gap-2">
        <Link className="w-full" href={`/product/${product?.id}`}>
          <Button className="w-full" variant="outline">
            View
          </Button>
        </Link>
        <AddToCart isAlreadyInCart={isAlreadyInCart} product={product} />
      </CardFooter>
    </Card>
  );
}
