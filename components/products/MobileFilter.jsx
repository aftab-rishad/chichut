"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import FilterSidebar from "@/components/products/FilterSidebar";

function MobileFilter({ category, subCategory, priceStart, priceEnd }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div className="lg:hidden mb-4">
      <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <div className="py-4">
            <FilterSidebar
              category={category}
              subCategory={subCategory}
              priceStart={priceStart}
              priceEnd={priceEnd}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileFilter;
