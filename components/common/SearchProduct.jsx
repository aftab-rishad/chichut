"use client";

import { Search, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

function SearchProduct() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.length >= 1) {
      router.push(`results?search_query=${searchQuery}`);
    }
  };

  return (
    <>
      <>
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          type="search"
          placeholder="Search products, brands..."
          className="pl-8 w-full"
        />
      </>
      <Button onClick={handleSearch} variant="outline" size="icon">
        <SearchIcon />
      </Button>
    </>
  );
}

export default SearchProduct;
