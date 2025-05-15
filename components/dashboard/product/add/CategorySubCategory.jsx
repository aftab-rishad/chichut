"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

function CategorySubCategory({ formData }) {
  const [subCategory, setSubCategory] = useState({
    women: ["Dresses", "Tops", "Bottoms", "Accessories"],
    men: ["Shirts", "Pants", "Outerwear", "Accessories"],
    kids: ["Boys", "Girls", "Baby"],
  });
  const [categories, setCategories] = useState([
    {
      id: 1,
      title: "Cetegory",
      name: "category",
      description: "Choose the category that best fits your product.",
      values: ["women", "men", "kids"],
    },
    {
      id: 2,
      title: "Sub Cetegory",
      name: "subCategory",
      description: "Choose the sub category that best fits your product.",
      values: subCategory[formData?.category] || [
        "Dresses",
        "Tops",
        "Bottoms",
        "Accessories",
      ],
    },
  ]);

  const handleCategoryChange = (value, category) => {
    if (category?.id === 1) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === 2
            ? {
                ...cat,
                values: subCategory[value],
              }
            : cat
        )
      );
    }
  };
  return (
    <>
      {categories.map((category) => (
        <div key={category?.id}>
          <label htmlFor={category?.name} className="flex flex-col space-y-2">
            <span className="mx-2 font-medium">{category?.title}</span>
            <Select
              onValueChange={(value) => handleCategoryChange(value, category)}
              required
              defaultValue={formData?.[category?.name] || ""}
              name={category?.name}
            >
              <SelectTrigger className="w-auto">
                <SelectValue placeholder={`Select a ${category?.title}`} />
              </SelectTrigger>
              <SelectContent className="w-auto">
                {category?.values?.map((value) => (
                  <SelectItem key={value} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm mx-2 text-muted-foreground">
              {category?.description}
            </p>
          </label>
        </div>
      ))}
    </>
  );
}

export default CategorySubCategory;
