"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function OrderSummary({
  products = [],
  shippingCost,
  subtotal,
  tax,
  total,
}) {
  return (
    <div className="space-y-4">
      {/* Products */}
      <div className="space-y-3">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="flex items-center space-x-3 bg-foreground/5 p-3 rounded-lg"
          >
            <div className="relative">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={60}
                height={60}
                className="rounded-md object-cover"
              />
              <Badge
                variant="secondary"
                className="absolute -top-2 -right-2 text-xs w-6 h-6 rounded-full p-0 flex items-center justify-center"
              >
                {product.quantity}
              </Badge>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm text-gray-900 dark:text-white truncate">
                {product.name}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                by {product.brand}
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                ${(product.price * product.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Separator />

      {/* Summary */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Shipping</span>
          <span className="font-medium">${shippingCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Tax</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
      </div>

      <Separator />

      <div className="flex justify-between text-lg font-bold">
        <span>Total</span>
        <span className="text-primary">${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
