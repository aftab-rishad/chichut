import { ArrowUpDown } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import brand from "@/graphql/query/brand";
import getAllOrders from "@/graphql/query/getAllOrders";
import OrdersRow from "./OrdersRow";

export default async function OrdersPage({ id }) {
  const store = await brand({ id }, "name");
  const allOrders = await getAllOrders(
    `id firstName lastName email createdAt amount status paymentMethod address city country userId postalCode product {
    brand
    name
    image
    color
    size
    quantity
    price
    }`
  );
  const myOrders = allOrders?.filter(
    (order) => order?.product?.brand === store?.name
  );

  return (
    <div className="flex flex-col gap-6 mt-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex gap-2 border p-4 rounded-lg items-center justify-center">
            <p className="text-sm font-medium text-muted-foreground">
              Total Orders
            </p>
            <h2 className="text-3xl font-bold">{myOrders?.length}</h2>
          </div>
        </div>
        <div>
          <div className="flex gap-2 border p-4 rounded-lg items-center justify-center">
            <p className="text-sm font-medium text-muted-foreground">
              Processing
            </p>
            <h2 className="text-3xl font-bold">
              {
                myOrders?.filter((order) => order.status === "Processing")
                  .length
              }
            </h2>
          </div>
        </div>
        <div>
          <div className="flex gap-2 border p-4 rounded-lg items-center justify-center">
            <p className="text-sm font-medium text-muted-foreground">Shipped</p>
            <h2 className="text-3xl font-bold">
              {myOrders?.filter((order) => order.status === "Shipped").length}
            </h2>
          </div>
        </div>
        <div>
          <div className="flex gap-2 border p-4 rounded-lg items-center justify-center">
            <p className="text-sm font-medium text-muted-foreground">
              Delivered
            </p>
            <h2 className="text-3xl font-bold">
              {myOrders?.filter((order) => order.status === "Delivered").length}
            </h2>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader className="px-6 py-4">
          <CardTitle>Order History</CardTitle>
          <CardDescription>{myOrders?.length} orders found</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Order ID
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="hidden lg:table-cell text-center">
                  Items
                </TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myOrders?.map((order) => (
                <OrdersRow order={order} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
