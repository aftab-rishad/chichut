"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, CreditCard, Truck, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import BillingForm from "./BillingForm";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";
import OrderSummary from "./OrderSummary";
import { toast } from "sonner";
import createOrder from "@/graphql/mutation/createOrder";

export default function CheckoutPage({ session, products }) {
  const [formError, setFormError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [billingData, setBillingData] = useState({});
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const shippingCosts = {
    standard: 5.99,
    express: 12.99,
    overnight: 24.99,
  };

  const subtotal = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  const shippingCost = shippingCosts[shippingMethod] || 5.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shippingCost + tax;

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    if (
      !billingData?.firstName ||
      !billingData?.lastName ||
      !billingData?.email ||
      !billingData?.countryCode ||
      !billingData?.phone ||
      !billingData?.address ||
      !billingData?.city ||
      !billingData?.country ||
      !billingData?.postalCode
    ) {
      setFormError(true);
    } else {
      setFormError(false);
      try {
        const res = await createOrder(
          {
            ...billingData,
            shippingMethod,
            paymentMethod,
            amount: Number(total?.toFixed(2)),
            products,
          },
          "userId"
        );
        if (res?.error) {
          toast.error(res?.error);
          setIsLoading(false);
        } else {
          toast.success("Order Placed");
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Checkout
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Complete your purchase securely
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="ml-2 text-sm font-medium text-primary">
                Cart
              </span>
            </div>
            <div className="w-16 h-0.5 bg-primary"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                <CreditCard className="w-4 h-4" />
              </div>
              <span className="ml-2 text-sm font-medium text-primary">
                Checkout
              </span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300 dark:bg-gray-600"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 border text-gray-600 dark:text-gray-400 rounded-full flex items-center justify-center text-sm font-medium">
                <Truck className="w-4 h-4" />
              </div>
              <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                Confirmation
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Billing Information */}
            <div>
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MapPin className="w-5 h-5 text-primary" />
                    Billing & Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <BillingForm
                    formError={formError}
                    onDataChange={setBillingData}
                    session={session}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Shipping Method */}
            <div>
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Truck className="w-5 h-5 text-primary" />
                    Shipping Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ShippingMethod
                    selectedMethod={shippingMethod}
                    onMethodChange={setShippingMethod}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Payment Method */}
            <div>
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PaymentMethod
                    selectedMethod={paymentMethod}
                    onMethodChange={setPaymentMethod}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <ShoppingBag className="w-5 h-5 text-primary" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <OrderSummary
                    products={products}
                    tax={tax}
                    shippingCost={shippingCost}
                    subtotal={subtotal}
                    total={total}
                  />
                  <Separator />
                  <Button
                    className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg"
                    onClick={handlePlaceOrder}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </div>
                    ) : (
                      "Place Order"
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Badge variant="secondary" className="text-xs">
                      🔒 Secure Checkout
                    </Badge>
                    <span>•</span>
                    <span>SSL Encrypted</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
