"use client";

import { useState } from "react";
import { Check, CreditCard, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function CartSummary({ items }) {
  const [isLoading, setIsLoading] = useState(false);

  // Calculate totals
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + tax;

  const handleCheckout = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, this would redirect to checkout or payment page
      console.log("Proceeding to checkout");
    }, 1500);
  };

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax (7%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button
          className="w-full"
          size="lg"
          onClick={handleCheckout}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4 mr-2" />
              Checkout
            </>
          )}
        </Button>
        <p className="mt-4 text-xs text-center text-muted-foreground">
          By checking out, you agree to our{" "}
          <a href="#" className="underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
          .
        </p>
      </CardFooter>
    </Card>
  );
}

export default CartSummary;
