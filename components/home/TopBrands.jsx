import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import brands from "@/graphql/query/brands";
import BrandsCard from "@/components/brands/BrandsCard";
import Link from "next/link";

async function TopBrands() {
  const allBrands = await brands("name image id");

  return (
    <section className="py-12 px-4 md:px-6 bg-background">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Brands</h2>
          <Link href="/brands">
            <Button variant="ghost" className="gap-1">
              View All <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {allBrands?.map((brand, i) => i <= 5 && <BrandsCard brand={brand} />)}
        </div>
      </div>
    </section>
  );
}

export default TopBrands;
