import { SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/common/ProductCard";
import FilterSidebar from "@/components/products/FilterSidebar";
import MobileFilter from "@/components/products/MobileFilter";
import getProducts from "@/graphql/query/products";
import { notFound } from "next/navigation";

const allCategory = {
  women: ["Dresses", "Tops", "Bottoms", "Accessories"],
  men: ["Shirts", "Pants", "Outerwear", "Accessories"],
  kids: ["Boys", "Girls", "Baby"],
};
export const dynamic = "force-dynamic";
export default async function ProductsPage({
  searchParams: { category, subCategory, priceStart, priceEnd },
}) {
  if (
    category !== "women" &&
    category !== "men" &&
    category !== "kids" &&
    category !== undefined
  ) {
    notFound();
  }
  const isSubCategory = allCategory[category]?.find((c) => c === subCategory);

  if (!isSubCategory && subCategory !== undefined) {
    notFound();
  }

  const products = await getProducts(
    "id name price discount images size color",
    {
      category,
      subCategory,
      priceStart: Number(priceStart),
      priceEnd: Number(priceEnd),
    }
  );

  const productsNotFound = (
    <>
      <div className="h-32 w-full mt-6 flex flex-col justify-center items-center px-6">
        <h2 className="sm:text-2xl text-xl font-semibold">
          Oops! No Products Yet
        </h2>
        <p>
          This collection is currently empty. New products may be coming
          soon—stay tuned!
        </p>
      </div>
    </>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Products</h1>

      {/* Mobile Filter Button */}
      <MobileFilter
        category={category}
        subCategory={subCategory}
        priceStart={priceStart}
        priceEnd={priceEnd}
      />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <FilterSidebar
            category={category}
            subCategory={subCategory}
            priceStart={priceStart}
            priceEnd={priceEnd}
          />
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{products.length}</span>{" "}
              products
            </p>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Sort</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {products?.length === 0
              ? productsNotFound
              : products.map((product) => (
                  <ProductCard key={product?.id} product={product} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
