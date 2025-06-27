"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import deleteCart from "@/graphql/mutation/removeFromCart";
import updateCart from "@/graphql/mutation/updateCart";

function CartItem({ item }) {
  const [loading, setLoading] = useState(false);
  const handleIncrement = async () => {
    setLoading(true);
    try {
      const response = await updateCart({
        id: item.id,
        quantity: item.quantity + 1,
      });
      if (response.error) {
        toast.error(response.error);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error incrementing quantity:", error);
      toast.error("Failed to update item quantity");
      setLoading(false);
    }
  };

  const handleDecrement = async () => {
    setLoading(true);
    try {
      const response = await updateCart({
        id: item.id,
        quantity: item.quantity - 1,
      });
      if (response.error) {
        toast.error(response.error);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error incrementing quantity:", error);
      toast.error("Failed to update item quantity");
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    setLoading(true);
    try {
      const response = await deleteCart(item.id);
      if (response.error) {
        toast.error(response.error);
        setLoading(false);
      } else {
        toast.success("Item removed from cart");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item from cart");
      setLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full h-40 sm:h-auto sm:w-40 bg-muted">
          <Image
            src={item?.image || "/placeholder.svg"}
            alt={item?.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col flex-1 p-4">
          <div className="flex flex-col justify-between gap-4 sm:flex-row">
            <div>
              <h3 className="font-medium">{item?.name}</h3>
              <div className="mt-1 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  Color:{" "}
                  <div
                    style={{
                      backgroundColor: item?.color,
                    }}
                    className={`w-5 h-5 rounded-md items-center justify-center flex cursor-pointer transition-all duration-200 ease-in-out hover:scale-110 border border-foreground`}
                  ></div>
                </p>
                <p>Size: {item?.size}</p>
              </div>
            </div>
            <div className="text-lg font-semibold">
              ${item?.price?.toFixed(2)}
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-r-none"
                onClick={handleDecrement}
                disabled={item?.quantity <= 1 || loading}
              >
                <Minus className="w-3 h-3" />
                <span className="sr-only">Decrease quantity</span>
              </Button>
              <div className="flex items-center justify-center w-10 h-8 border-y">
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  item?.quantity
                )}
              </div>
              <Button
                variant="outline"
                size="icon"
                disabled={item?.stock <= item?.quantity || loading}
                className="h-8 w-8 rounded-l-none"
                onClick={handleIncrement}
              >
                <Plus className="w-3 h-3" />
                <span className="sr-only">Increase quantity</span>
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
              onClick={handleRemove}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-1" />
              ) : (
                <Trash2 className="w-4 h-4 mr-1" />
              )}
              Remove
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default CartItem;
