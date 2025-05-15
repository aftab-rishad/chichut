import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageIcon, Upload, Trash2, LoaderCircleIcon } from "lucide-react";
import useUpload from "@/hooks/useUpload";
import { useState, useEffect } from "react";

function ImagesForm({ images, setImages }) {
  const [image, setImage] = useState(null);
  const { data, isUploading } = useUpload(image);

  useEffect(() => {
    if (data?.url) {
      setImages((prev) => [...prev, data?.url]);
      setImage(null);
    }
  }, [data]);

  const handleImageUpload = (event) => {
    setImage(event.target);
  };
  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <>
      <CardHeader>
        <CardTitle className="flex text-2xl items-center">
          <ImageIcon className="mr-2 h-5 w-5" />
          Product Images
        </CardTitle>
        <CardDescription>
          Upload images of your product. The first image will be the featured
          image.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center h-40 cursor-pointer hover:bg-muted/50 transition-colors">
            <label
              htmlFor="image-upload"
              className="cursor-pointer w-full h-full flex flex-col items-center justify-center"
            >
              {isUploading ? (
                <LoaderCircleIcon className="h-8 w-8 mb-2 text-muted-foreground animate-spin" />
              ) : (
                <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
              )}
              <p className="text-sm font-medium">
                {isUploading ? "Uploading ..." : "Upload Images"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {isUploading
                  ? "Uploading ..."
                  : "Drag & drop or click to browse"}
              </p>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                disabled={isUploading}
                required={images.length === 0}
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          {/* Display uploaded images */}
          {images.map((image, index) => (
            <div
              key={index}
              className="relative border rounded-lg overflow-hidden h-40"
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Product image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <Button
                variant="destructive"
                size="icon"
                type="button"
                className="absolute top-2 right-2 h-6 w-6 rounded-full"
                onClick={() => handleRemoveImage(index)}
              >
                <Trash2 className="h-3 w-3" />
                <span className="sr-only">Remove image</span>
              </Button>
            </div>
          ))}
        </div>

        {images.length === 0 && (
          <div className="text-center text-muted-foreground text-sm mt-4">
            No images uploaded yet. Add at least one image for your product.
          </div>
        )}
      </CardContent>
    </>
  );
}

export default ImagesForm;
