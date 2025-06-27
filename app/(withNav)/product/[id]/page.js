import ProductPage from "@/components/product/ProductPage";
import getProductById from "@/graphql/query/product";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";
async function Product({ params: { id } }) {
  let product;
  try {
    product = await getProductById(id, "name");
  } catch (error) {
    console.log("Error fetching product data:", error);
  }
  if (!product) {
    notFound();
  }
  return (
    <main className="min-h-screen bg-background">
      <ProductPage id={id} />
    </main>
  );
}

export default Product;
