"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import addToCart from "@/graphql/mutation/addToCart";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function AddToCart({ isAlreadyInCart, product }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleAddToCart = async () => {
    setIsLoading(true);
    if (isAlreadyInCart) {
      router.push("/cart");
      setIsLoading(false);
    } else {
      try {
        const res = await addToCart({
          productId: product?.id,
          quantity: 1,
          color: product?.color[0],
          size: product?.size[0],
        });
        if (res?.error) {
          toast.error(
            res.error ||
              "Failed to add product to cart. Please try again later."
          );
          setIsLoading(false);
        } else {
          toast.success("Product added to cart successfully!");
          router.push("/cart");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error(
          error?.message ||
            "Failed to add product to cart. Please try again later."
        );
        setIsLoading(false);
      }
    }
  };

  return (
    <Button disabled={isLoading} onClick={handleAddToCart} className="w-full">
      Add to Cart
    </Button>
  );
}

export default AddToCart;
