"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

function SearchBtnHero() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.length >= 1) {
      router.push(`results?search_query=${searchQuery}`);
    }
  };

  return (
    <>
      <Input
        type="search"
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search products, brands..."
        value={searchQuery}
        className="md:flex-1"
      />
      <Button onClick={handleSearch} className="bg-primary hover:bg-primary/90">
        Shop Now
      </Button>
    </>
  );
}

export default SearchBtnHero;
