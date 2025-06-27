import dynamicImport from "next/dynamic";
import getProductById from "@/graphql/query/product";
import { notFound } from "next/navigation";
import brand from "@/graphql/query/brand";

const AddProduct = dynamicImport(
  () => import("@/components/dashboard/product/add/AddProduct"),
  {
    ssr: false,
  }
);
export const dynamic = "force-dynamic";
async function EditProductPage({ params: { id, prdId } }) {
  let product;
  let myBrand;
  try {
    product = await getProductById(
      prdId,
      "id name price stock color size description discount isFeatured brand category subCategory images"
    );
    myBrand = await brand({ id }, "name");
  } catch (error) {
    console.error("Error fetching product:", error);
    myBrand = null;
    product = null;
  }

  if (!product || myBrand?.name !== product?.brand) notFound();

  return (
    <div className="flex flex-col gap-6">
      <AddProduct
        dataForEdit={product}
        url={`/seller/${id}/dashboard/products`}
      />
    </div>
  );
}

export default EditProductPage;
