"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

const allCategory = {
  women: ["Dresses", "Tops", "Bottoms", "Accessories"],
  men: ["Shirts", "Pants", "Outerwear", "Accessories"],
  kids: ["Boys", "Girls", "Baby"],
};

export default function FilterSidebar({
  category,
  subCategory,
  priceStart,
  priceEnd,
}) {
  const [minPrice, setMinPrice] = useState(priceStart ?? 0);
  const [maxPrice, setMaxPrice] = useState(priceEnd ?? 1000000);
  const router = useRouter();

  const handleChangeCategory = (value) => {
    router.push(
      `/products?category=${value}&priceStart=${minPrice}&priceEnd=${maxPrice}`
    );
  };

  const handleApplyPrice = () => {
    router.push(
      `/products?${category ? `category=${category}&` : ""}${
        subCategory ? `subCategory=${subCategory}&` : ""
      }priceStart=${minPrice}&priceEnd=${maxPrice}`
    );
  };

  const handleChangeSubCategory = (value) => {
    router.push(
      `/products?category=${category}&subCategory=${value}&priceStart=${minPrice}&priceEnd=${maxPrice}`
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4 text-foreground">Filters</h3>
        <Separator className="mb-4" />
      </div>

      <div className="space-y-4">
        <div>
          <Label
            htmlFor="category"
            className="text-sm font-medium mb-1.5 block"
          >
            Category
          </Label>
          <Select defaultValue={category} onValueChange={handleChangeCategory}>
            <SelectTrigger id="category" className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="women">Women</SelectItem>
                <SelectItem value="men">Men</SelectItem>
                <SelectItem value="kids">Kids</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label
            htmlFor="subcategory"
            className="text-sm font-medium mb-1.5 block"
          >
            Sub-category
          </Label>
          <Select
            defaultValue={subCategory}
            disabled={!category}
            onValueChange={handleChangeSubCategory}
          >
            <SelectTrigger id="subcategory" className="w-full">
              <SelectValue placeholder="Select sub-category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sub-categories</SelectLabel>
                {allCategory[category]?.map((cat) => (
                  <SelectItem value={cat}>{cat}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="price-range">
            <AccordionTrigger className="text-sm font-medium py-2">
              Price Range
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="min-price" className="text-xs">
                      Min Price
                    </Label>
                    <Input
                      id="min-price"
                      type="number"
                      placeholder="$0"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-price" className="text-xs">
                      Max Price
                    </Label>
                    <Input
                      id="max-price"
                      type="number"
                      placeholder="$1000"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>
                <Button size="sm" className="w-full" onClick={handleApplyPrice}>
                  Apply
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="pt-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/products")}
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
