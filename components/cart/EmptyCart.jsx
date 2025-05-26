import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function EmptyCart() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
          <ShoppingBag className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-center">
          Your cart is empty
        </h2>
        <p className="text-center text-muted-foreground">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Button asChild className="mt-4">
          <Link href="/products">Start Shopping</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
