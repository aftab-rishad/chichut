import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {} from "lucide-react";
import Link from "next/link";
import { Kids, Men, Women } from "../common/Svg";

export default function CategoriesSection() {
  const categories = [
    { name: "Women", url: "/products?category=women", icon: <Women /> },
    { name: "Men", url: "/products?category=men", icon: <Men /> },
    { name: "Kids", url: "/products?category=kids", icon: <Kids /> },
  ];

  return (
    <section className="py-12 px-4 md:px-6 bg-muted/30">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-foreground">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((category, i) => (
            <Card
              key={i}
              className="overflow-hidden group cursor-pointer bg-card"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="bg-border p-4 rounded-full">
                    {category.icon}
                  </div>
                  <h3 className="text-white font-bold text-2xl">
                    {category.name}
                  </h3>
                  <Link prefetch href={category.url}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 text-foreground"
                    >
                      Shop Now
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
