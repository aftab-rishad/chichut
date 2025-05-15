"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import { ErrorIcon } from "@/components/common/Svg";
import Loader from "@/components/common/LoadingBtn";
import { Textarea } from "@/components/ui/textarea";
import useUpload from "@/hooks/useUpload";
import createStore from "@/graphql/mutation/createStore";
import { useRouter } from "next/navigation";

function CreateSeller() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ status: false, message: "" });
  const [imageData, setImageData] = useState(null);
  const router = useRouter();

  const { data, isUploading } = useUpload(imageData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const location = formData.get("location");
    const image = data?.url;
    const description = formData.get("description");

    try {
      setLoading(true);
      const response = await createStore(
        { name, email, location, image, description },
        "name"
      );

      if (response?.error) {
        setError({ status: true, message: response?.error });
        setLoading(false);
        return;
      } else {
        router.push("/");
      }
      setError({ status: false, message: "" });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError({ status: true, message: error.error });
      setLoading(false);
    }
  };
  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-foreground/80"
          >
            Brand Name
            <span className="text-red-600 text-[1rem] mx-[0.115rem]">*</span>
            <Input
              type="text"
              required
              id="name"
              placeholder="Best Brand"
              name="name"
              className="mt-1 border rounded-lg w-full"
              suppressHydrationWarning
            />
          </label>
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground/80"
          >
            Public Email
            <span className="text-red-600 text-[1rem] mx-[0.115rem]">*</span>
            <Input
              type="email"
              required
              id="email"
              placeholder="boss@gmail.com"
              name="email"
              className="mt-1 border rounded-lg w-full"
              suppressHydrationWarning
            />
          </label>
        </div>
        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-foreground/80"
          >
            Brand Location
            <span className="text-red-600 text-[1rem] mx-[0.115rem]">*</span>
            <Input
              type="text"
              required
              id="location"
              placeholder="Austin, Texas 78701"
              name="location"
              className="mt-1 border rounded-lg w-full"
              suppressHydrationWarning
            />
          </label>
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-foreground/80"
          >
            Upload Brand Logo
            <span className="text-foreground/50 ml-1 text-xs mx-[0.115rem]">
              (JPEG, JPG, PNG, SVG)
            </span>
            <span className="text-red-600 text-[1rem] mx-[0.115rem]">*</span>
            <div className="flex flex-col items-center justify-center gap-2">
              <Input
                required
                onChange={(e) => {
                  setImageData(e.target);
                }}
                type="file"
                id="image"
                disabled={isUploading}
                name="image"
                className="mt-1 border rounded-lg w-full"
                accept="image/jpeg, image/jpg, image/png, image/svg"
              />
            </div>
          </label>
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-foreground/80"
          >
            Brand Description
            <span className="text-red-600 text-[1rem] mx-[0.115rem]">*</span>
            <Textarea
              required
              id="description"
              placeholder="Best brand in the world"
              name="description"
              className="mt-1 border rounded-lg w-full"
              suppressHydrationWarning
            />
          </label>
        </div>
        <Button
          disabled={loading}
          type="submit"
          variant="default"
          className="w-full cursor-pointer p-2 bg-primary rounded-lg mt-4"
        >
          {loading ? <Loader /> : "Become a Seller"}
        </Button>

        {error?.status && (
          <Alert variant="destructive" className="mt-4 bg-red-600/10">
            <AlertTitle className="flex items-center gap-2">
              <ErrorIcon /> Failed to create seller
            </AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}
      </form>
    </div>
  );
}

export default CreateSeller;
