import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import brands from "@/graphql/query/brands";
import Link from "next/link";

async function TopBrands() {
  const allBrands = await brands("name image id");

  return (
    <section className="py-12 px-4 md:px-6 bg-background">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Brands</h2>
          <Button variant="ghost" className="gap-1">
            View All <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {allBrands?.map(
            (brand, i) =>
              i <= 5 && (
                <Card
                  key={brand?.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-4 flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-muted/30 flex items-center justify-center mb-4">
                      <Image
                        src={brand?.image}
                        alt={brand?.name}
                        width={2440}
                        height={2440}
                        className="object-contain w-full h-full rounded-full"
                      />
                    </div>
                    <h3 className="font-medium text-center">{brand?.name}</h3>
                    <Link href={`/brands/${brand?.id}`} className="mt-2">
                      <Button
                        variant="link"
                        className="text-primary p-0 h-auto mt-1"
                      >
                        Shop Brand
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
          )}
        </div>
      </div>
    </section>
  );
}

export default TopBrands;
