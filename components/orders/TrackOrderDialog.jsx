import * as React from "react";
import { Package, Truck, CheckCircle, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function TrackOrderDialog({ order }) {
  const createdAt = new Date(Number(order?.createdAt));
  const fourDaysLater = new Date(createdAt.getTime() + 4 * 24 * 60 * 60 * 1000);
  const orderStatuses = [
    {
      id: "ordered",
      label: "Order Placed",
      description: "Your order has been placed successfully",
      icon: Clock,
      completed: true,
    },
    {
      id: "processing",
      label: "Processing",
      description: "We're preparing your order",
      icon: Package,
      completed:
        order?.status === "Processing" ||
        order?.status === "Shipped" ||
        order?.status === "Delivered",
    },
    {
      id: "shipped",
      label: "Shipped",
      description: "Your order is on its way",
      icon: Truck,
      completed: order?.status === "Shipped" || order?.status === "Delivered",
    },
    {
      id: "delivered",
      label: "Delivered",
      description: "Order delivered successfully",
      icon: CheckCircle,
      completed: order?.status === "Delivered",
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Track Order</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Track Your Order</DialogTitle>
          <DialogDescription>
            Order #{order?.id} - Estimated delivery:{" "}
            {fourDaysLater?.toDateString()}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {orderStatuses.map((status, index) => {
            const Icon = status.icon;
            return (
              <div key={status.id} className="flex items-start space-x-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                      status.completed
                        ? "border-green-500 bg-green-500 text-white"
                        : "border bg-background text-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  {index < orderStatuses.length - 1 && (
                    <div
                      className={`mt-2 h-8 w-0.5 ${
                        status.completed ? "bg-green-500" : "bg-background"
                      }`}
                    />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <h4
                    className={`text-sm font-medium ${
                      status.completed ? "text-green-700" : "text-foreground"
                    }`}
                  >
                    {status.label}
                  </h4>
                  <p className="text-sm text-foreground/50">
                    {status.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
