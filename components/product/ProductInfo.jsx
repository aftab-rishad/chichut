"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  StarIcon as LucideStarIcon,
  MinusIcon,
  PlusIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import addToCart from "@/graphql/mutation/addToCart";

function ProductInfo({ product, isAlreadyInCart = false }) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.size?.[0]);
  const [selectedColor, setSelectedColor] = useState(product?.color?.[0]);
  const router = useRouter();

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = async () => {
    setIsLoading(true);
    if (isAlreadyInCart) {
      router.push("/cart");
      setIsLoading(false);
    } else {
      try {
        const res = await addToCart({
          productId: product.id,
          quantity,
          color: selectedColor,
          size: selectedSize,
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

  const handleCheckout = () => {
    router.push(
      `/checkout?product=${
        product?.id
      }&quantity=${quantity}&color=${selectedColor?.slice(
        1
      )}&size=${selectedSize?.trim()}`
    );
  };

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="p-0 space-y-6">
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold">{product?.name}</h1>
            <Badge
              variant={product?.stock > 0 ? "default" : "destructive"}
              className="text-xs"
            >
              {product?.stock > 0 ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <LucideStarIcon
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product?.rating || 0)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-muted-foreground">
              {product?.rating || 0} ({product?.reviewCount || 0} reviews)
            </span>
          </div>
        </div>

        <div className="flex items-baseline">
          <span className="text-2xl font-bold">
            ${product?.price - product?.discount}
          </span>
          {product?.discount > 0 && (
            <>
              <span className="ml-2 text-lg text-muted-foreground line-through">
                ${product.price}
              </span>
            </>
          )}
        </div>

        <p className="text-muted-foreground">{product?.description}</p>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Size</h3>
            <div className="flex flex-wrap gap-2">
              {product?.size?.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  className="h-10 px-4"
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Color</h3>
            <div className="flex flex-wrap gap-3">
              {product?.color?.map((color) => (
                <button
                  key={color}
                  className={`relative h-8 w-8 rounded-full border-2 ${
                    selectedColor === color
                      ? "ring-2 ring-primary ring-offset-2"
                      : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  title={color}
                  aria-label={`Select ${color} color`}
                ></button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Selected: {selectedColor}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Quantity</h3>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <MinusIcon className="h-4 w-4" />
              </Button>
              <span className="mx-4 w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                disabled={quantity === product?.stock}
                onClick={incrementQuantity}
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            className="flex-1"
            disabled={product?.stock <= 0 || isLoading}
            onClick={handleAddToCart}
            variant="outline"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isAlreadyInCart ? (
              "Go to Cart"
            ) : (
              "Add to Cart"
            )}
          </Button>
          <Button
            onClick={handleCheckout}
            disabled={product?.stock <= 0}
            className="flex-1"
          >
            Buy Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductInfo;
