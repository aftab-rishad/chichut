"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Eye,
  Package,
  Truck,
  XCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { socket } from "@/lib/socket";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import updateOrder from "@/action/updateOrder";
import Image from "next/image";

function OrderModal({ order }) {
  const fullAddress = `${order?.address}, ${order?.city}, ${order?.country} ${order?.postalCode}`;

  const handleChangeStatus = async (value) => {
    const updatedOrder = await updateOrder({ id: order?.id, status: value });
    if (updatedOrder?.success) {
      socket.emit("send-notification", {
        title: `Your order has been ${value}.`,
        message: `We wanted to let you know that your order has been ${value}.`,
        userId: order?.userId,
        url: `/orders`,
      });
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "Shipped":
        return <Truck className="h-4 w-4 text-blue-500" />;
      case "Processing":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "Cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            View details
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details - {order?.id}</DialogTitle>
            <DialogDescription>
              Complete order information and status management
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6">
            {/* Customer Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>
                        {order?.firstName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {order?.firstName} {order?.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order?.email}
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <Label className="text-sm font-medium">
                      Shipping Address
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {fullAddress}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Order Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Order Date</Label>
                      <p className="text-sm text-muted-foreground">
                        {new Date(Number(order?.createdAt)).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                            month: "short",
                            year: "numeric",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Payment Method
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {order?.paymentMethod === "cod"
                          ? "Cash on delivery (COD)"
                          : order?.paymentMethod}
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <Label className="text-sm font-medium">
                      Current Status
                    </Label>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusIcon(order?.status)}
                      <Badge
                        variant={
                          order?.status === "Delivered"
                            ? "outline"
                            : order?.status === "Shipped"
                            ? "secondary"
                            : order?.status === "Processing"
                            ? "default"
                            : "destructive"
                        }
                        className={
                          order?.status === "Delivered"
                            ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                            : order?.status === "Shipped"
                            ? "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
                            : order?.status === "Processing"
                            ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
                            : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                        }
                      >
                        {order?.status}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Update Status</Label>
                    <Select
                      onValueChange={handleChangeStatus}
                      defaultValue={order?.status}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select new status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          disabled={
                            order?.status === "Shipped" ||
                            order?.status === "Delivered" ||
                            order?.status === "Cancelled"
                          }
                          value="Processing"
                        >
                          Processing
                        </SelectItem>
                        <SelectItem
                          disabled={
                            order?.status === "Delivered" ||
                            order?.status === "Cancelled"
                          }
                          value="Shipped"
                        >
                          Shipped
                        </SelectItem>
                        <SelectItem
                          disabled={order?.status === "Cancelled"}
                          value="Delivered"
                        >
                          Delivered
                        </SelectItem>

                        <SelectItem
                          disabled={order?.status === "Delivered"}
                          value="Cancelled"
                        >
                          Cancelled
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center">
                      <Image
                        src={order?.product?.image}
                        alt={order?.product?.name}
                        width={1200}
                        height={1200}
                        className="w-full h-full object-cover object-top rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{order?.product?.name}</h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="font-medium gap-2 flex text-foreground">
                          Color:{" "}
                          <div
                            style={{
                              backgroundColor: order?.product?.color,
                            }}
                            className="w-5 h-5 border-2 border-foreground/50 rounded-md"
                          />
                        </span>
                        <span>
                          Size:{" "}
                          <span className="font-medium text-foreground">
                            {order?.product?.size}
                          </span>
                        </span>
                        <span>
                          Qty:{" "}
                          <span className="font-medium text-foreground">
                            {order?.product?.quantity}
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ${order?.product?.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">each</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-medium">Total Amount</span>
                    <span className="text-lg font-bold">
                      ${order?.amount?.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default OrderModal;
