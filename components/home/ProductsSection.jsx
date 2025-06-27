import { Button } from "@/components/ui/button";
import Link from "next/link";
import getProducts from "@/graphql/query/products";
import ProductCard from "@/components/common/ProductCard";

export default async function ProductsSection() {
  let products = [];

  try {
    products = await getProducts(
      "id name price discount images size color isFeatured",
      {}
    );
  } catch (error) {
    console.log(error);
  }

  const featuredProducts = Array.isArray(products)
    ? products.filter((product) => product?.isFeatured)
    : [];

  return (
    <section className="py-12 px-4 md:px-6 bg-background">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Featured Products
          </h2>
        </div>
        <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
          {featuredProducts?.map(
            (product, i) =>
              i < 8 && <ProductCard key={product?.id} product={product} />
          )}
        </div>
        <div className="flex justify-center mt-8">
          <Link href="/products">
            <Button className="bg-primary hover:bg-primary/90">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
