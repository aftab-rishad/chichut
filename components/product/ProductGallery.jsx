"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

function ProductGallery({ images = [] }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="p-0 space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            src={images[selectedImage] || "/placeholder.svg"}
            alt="Product image"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 ${
                selectedImage === index
                  ? "border-primary"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Product thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductGallery;
