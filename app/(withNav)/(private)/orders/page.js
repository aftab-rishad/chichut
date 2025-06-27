import React from "react";
import getAllOrders from "@/graphql/query/getAllOrders";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  Eye,
  Truck,
  XCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import me from "@/graphql/query/me";
import TrackOrderDialog from "@/components/orders/TrackOrderDialog";
export const dynamic = "force-dynamic";
async function OrdersPage() {
  const session = await me("id");
  const allOrders = await getAllOrders(
    `id firstName lastName email createdAt amount status paymentMethod address city country userId postalCode product {
    brand
    name
    color
    size
    quantity
    price
    }`
  );
  const myOrders = allOrders?.filter(
    (order) => Number(order?.userId) === Number(session?.id)
  );
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
    <div className="min-h-screen">
      <div className="border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Orders
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Manage and track your purchases
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-3">
          {myOrders?.length > 0 ? (
            myOrders?.map((order) => (
              <div
                key={order?.id}
                className="group border  rounded-lg px-4 py-6 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
              >
                {/* Desktop Layout */}
                <div className="hidden md:flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    {/* Order Info */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold">{order?.id}</h3>
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
                      <h2 className="text-xl font-semibold">
                        {order?.product?.name}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
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
                        )}{" "}
                        • {order?.product?.quantity} item
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        ${order?.amount?.toFixed(2)}
                      </div>
                    </div>
                    <TrackOrderDialog order={order} />
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {order?.id}
                        </h3>
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
                      <h2 className="font-semibold">{order?.product?.name}</h2>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
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
                    <div className="text-right">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        ${order?.amount?.toFixed(2)}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {order?.product?.quantity} item
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <TrackOrderDialog order={order} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No orders found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                You haven't placed any orders yet. Start shopping to see your
                orders here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
