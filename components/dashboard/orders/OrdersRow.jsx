import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Truck, XCircle, CheckCircle2, Clock } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import OrderModal from "./OrderModal";

function OrdersRow({ order }) {
  console.log("Order", order);

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
    <TableRow>
      <TableCell className="font-medium">{order?.id}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{order?.firstName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">
              {" "}
              {order?.firstName} {order?.lastName}
            </div>
            <div className="text-xs text-muted-foreground">{order?.email}</div>
          </div>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {new Date(Number(order?.createdAt)).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          month: "short",
          year: "numeric",
          day: "numeric",
        })}
      </TableCell>
      <TableCell className="text-right font-medium">
        ${order?.amount?.toFixed(2)}
      </TableCell>
      <TableCell className="hidden lg:table-cell text-center">1</TableCell>
      <TableCell className="hidden sm:table-cell">
        <div className="flex items-center gap-2">
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
      </TableCell>
      <TableCell className="text-right">
        <OrderModal order={order} />
      </TableCell>
    </TableRow>
  );
}

export default OrdersRow;
