"use client";

import { ArrowLeft, Eye, Loader2, Save } from "lucide-react";
import GeneralForm from "@/components/dashboard/product/add/GeneralForm";
import InformationForm from "@/components/dashboard/product/add/InformationForm";
import PricingForm from "@/components/dashboard/product/add/PricingForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ImagesForm from "@/components/dashboard/product/add/ImagesForm";
import { useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import createProduct from "@/graphql/mutation/createProduct";
import { useRouter } from "next/navigation";
import editProduct from "@/graphql/mutation/editProduct";

function AddProduct({ url, dataForEdit = {} }) {
  const { images, id, brand, color, ...forEdit } = dataForEdit;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(
    forEdit || {
      category: "",
      description: "",
      discount: "",
      isFeatured: "",
      name: "",
      price: "",
      size: "",
      stock: "",
      subCategory: "",
    }
  );
  const [productImages, setProductImages] = useState(images || []);
  const [productColor, setProductColor] = useState(color || []);
  const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const data = {
      ...Object.fromEntries(formData.entries()),
      isFeatured: formData.get("isFeatured") == "true" ? true : false,
      images: productImages,
      color: productColor,
    };
    if (productImages?.length <= 0) {
      toast.error("Please upload at least one image.");
      setIsLoading(false);
    } else {
      const slicedData = {
        ...data,
        size: data?.size?.split(","),
        stock: Number(data?.stock),
        price: Number(data?.price),
        discount: Number(data?.discount),
      };
      let res;
      if (dataForEdit?.name) {
        res = await editProduct({ ...slicedData, id });
      } else {
        res = await createProduct(slicedData, "name");
      }
      if (res?.error) {
        toast.error(res.error);
        setIsLoading(false);
      } else {
        toast.success(
          dataForEdit?.name
            ? "Product updated successfully!"
            : "Product created successfully!"
        );
        dataForEdit?.name && router.push(url);
        setFormData({
          category: "",
          color: [],
          description: "",
          discount: "",
          isFeatured: "",
          name: "",
          price: "",
          size: "",
          stock: "",
          subCategory: "",
        });
        setProductImages([]);
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      productImages,
      isFeatured: this?.isFeatured === "true" ? true : false,
    }));
  };
  return (
    <>
      <form autoComplete="off" onSubmit={onSubmit} onChange={handleChange}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href={url}>
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">
              {dataForEdit?.name ? "Edit" : "Add"} Product
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Link href={url}>
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>

            <Button disabled={isLoading} type="submit">
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? <Loader2 /> : "Save Product"}
            </Button>
          </div>
        </div>
        <Card className="mt-8">
          <GeneralForm formData={formData} />
          <PricingForm formData={formData} />
          <InformationForm
            productColor={productColor}
            setProductColor={setProductColor}
            formData={formData}
          />
          <ImagesForm images={productImages} setImages={setProductImages} />
        </Card>
      </form>
    </>
  );
}

export default AddProduct;
