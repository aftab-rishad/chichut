"use client";
import React from "react";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { F7WandStars } from "@/components/common/Svg";
import GenerateName from "@/action/generate-ai-content";
import { toast } from "sonner";
import { useState } from "react";
import getProducts from "@/graphql/query/products";
import me from "@/graphql/query/me";
import brand from "@/graphql/query/brand";

function AIButton({ children, setFormData, formData, aiFor, ...props }) {
  const [loading, setLoading] = useState(false);
  const [allContent, setAllContent] = useState([]);

  const handleGenerageName = async () => {
    setLoading(true);
    let prompt;
    const category = formData?.category;
    const subCategory = formData?.subCategory;
    const name = formData?.name;

    const allProducts = await getProducts("name brand description", {
      category,
      subCategory,
    });

    const userId = await me("id");
    const myBrand = await brand({ userId: userId?.id }, "name");

    const allProductsByBrand = allProducts?.filter(
      (item) => item?.brand === myBrand?.name
    );

    const allProductsName = allProductsByBrand?.map((item) => item?.name);
    const allProductsDescription = allProductsByBrand?.map(
      (item) => item?.description
    );

    if (aiFor === "name") {
      if (!category || !subCategory) {
        toast.error("Please select category and sub-category.");
        setLoading(false);
        return;
      }
      prompt = `Generate a catchy and attractive product title (only the title) for an item in the '${subCategory}' sub-category of '${category}'. The title must be between 6 and 15 words long and must not include any of the following: ${allContent?.join(
        ", "
      )}, ${allProductsName?.join(
        ", "
      )}. Do not include any additional content—only the product name.`;
      setFormData((prev) => ({
        ...prev,
        description: "",
      }));
    } else if (aiFor === "description") {
      if (!name) {
        toast.error("Please enter product name or generate.");
        setLoading(false);
        return;
      }
      prompt = `Generate a compelling product description for '${name}', which belongs to the '${subCategory}' sub-category under the '${category}' category. The description must be between 40 and 60 words and must not include any of the following: ${allContent?.join(
        ", "
      )}, ${allProductsDescription?.join(
        ", "
      )}. Only output the product description—do not include any additional text.`;
    }

    const res = await GenerateName({
      prompt,
    });
    if (res?.status === "success") {
      toast.success("AI content generated successfully!");
      setFormData((prev) => ({
        ...prev,
        [aiFor]: res?.name,
      }));
      setAllContent((prev) => [...prev, res?.name]);
      setLoading(false);
    } else {
      console.error("Error:", res?.error);
      toast.error(res?.error);
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center text-center" {...props}>
      <HoverBorderGradient
        disable={loading}
        containerClassName="rounded-full"
        onClick={handleGenerageName}
        as="button"
        type="button"
        className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
      >
        <F7WandStars className="text-black dark:text-white" />
        <span>{loading ? "Generating..." : children}</span>
      </HoverBorderGradient>
    </div>
  );
}

export default AIButton;
