import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function BrandsCard({ brand }) {
  return (
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
          <Button variant="link" className="text-primary p-0 h-auto mt-1">
            Shop Brand
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default BrandsCard;
