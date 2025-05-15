"use client";

import {
  Search,
  Plus,
  Edit,
  Trash,
  Eye,
  MoreHorizontal,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import Image from "next/image";
import deleteProduct from "@/graphql/mutation/deleteProduct";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";

function ProductTable({ data = [], headerUrl }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const head = [
    "Image",
    "Product",
    "Category",
    "Price",
    "Stock",
    "Status",
    "Actions",
  ];

  const categories = ["all", ...new Set(data?.map((item) => item?.category))];

  const filteredData = data?.filter((item) => {
    const matchesSearch =
      item?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || item?.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteProduct = async (id) => {
    setIsLoading(true);
    try {
      const isDelete = await deleteProduct(id);
      if (isDelete?.error) {
        toast.error(isDelete?.error);
        setIsLoading(false);
      } else {
        setIsModalOpen(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Filters & Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between flex-wrap">
        <div className="flex flex-col sm:flex-row flex-1 items-stretch sm:items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 w-full bg-background"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          className="w-full sm:w-auto"
          onClick={() => router.push(headerUrl)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardHeader className="px-6 py-4">
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>{filteredData?.length} items found</CardDescription>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <div className="min-w-[640px]">
            <Table>
              <TableHeader>
                <TableRow>
                  {head?.map((item, i) => (
                    <TableHead
                      key={i}
                      className={`${
                        i === 0 && data[0]?.images ? "w-[80px]" : "w-auto"
                      } ${
                        i === 1
                          ? "flex items-center"
                          : i === 2
                          ? "hidden md:table-cell"
                          : i === 3
                          ? "text-right"
                          : i === 4
                          ? "hidden lg:table-cell text-center"
                          : i === 5
                          ? "hidden sm:table-cell"
                          : "text-right"
                      } `}
                    >
                      {item}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData?.length > 0 ? (
                  filteredData.map((item) => (
                    <TableRow key={item?.id}>
                      {item?.images && (
                        <TableCell>
                          <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                            <Image
                              src={item?.images[0]}
                              alt={data?.name}
                              width={1200}
                              height={1200}
                              className="h-full w-full object-cover rounded-md"
                            />
                          </div>
                        </TableCell>
                      )}
                      <TableCell>
                        <div className="font-medium">{item?.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Product ID - {item?.id}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {item?.category}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ${item?.price?.toFixed(2)}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-center">
                        {item?.stock}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge
                          variant={
                            item?.stock >= 6
                              ? "outline"
                              : item?.stock >= 1 && item?.stock <= 5
                              ? "secondary"
                              : "destructive"
                          }
                          className={
                            item?.stock >= 6
                              ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                              : item?.stock >= 1 && item?.stock <= 5
                              ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
                              : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                          }
                        >
                          {item?.stock >= 1 && item?.stock <= 5
                            ? "Low Stock"
                            : item?.stock === 0
                            ? "Out of Stock"
                            : "In Stock"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right p-0">
                        <div className="relative flex justify-end p-4">
                          <Dialog
                            open={isModalOpen}
                            onOpenChange={setIsModalOpen}
                          >
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader className="flex flex-row items-center justify-between border-b pb-2 mb-2">
                                <DialogTitle>Actions</DialogTitle>
                              </DialogHeader>
                              <div className="p-2 w-full">
                                <div className="flex flex-col w-full gap-1">
                                  <Button
                                    variant="ghost"
                                    className="w-full justify-start"
                                  >
                                    <Edit className="h-4 w-4 mr-2" />
                                    <span>Edit</span>
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    className="w-full justify-start"
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    <span>View</span>
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      handleDeleteProduct(item?.id)
                                    }
                                    variant="denger"
                                    className="w-full justify-start"
                                    disabled={isLoading}
                                  >
                                    <Trash className="h-4 w-4 mr-2" />
                                    {isLoading ? (
                                      <Loader2 />
                                    ) : (
                                      <span>Delete</span>
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={head?.length}
                      className="text-center mt-4 text-xl p-4"
                    >
                      No items found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductTable;
