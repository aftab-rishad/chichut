import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { StarIcon } from "lucide-react";

export default function RelatedProducts({ products }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">You May Also Like</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium line-clamp-1">{product.name}</h3>
              <div className="flex items-center mt-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-1 text-xs text-muted-foreground">
                  {product.rating}
                </span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <span className="font-bold">${product.price}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
