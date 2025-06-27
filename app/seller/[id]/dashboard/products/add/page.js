import dynamicImport from "next/dynamic";

const AddProduct = dynamicImport(
  () => import("@/components/dashboard/product/add/AddProduct"),
  {
    ssr: false,
  }
);
export const dynamic = "force-dynamic";
function AddProductPage({ params: { id } }) {
  return (
    <div className="flex flex-col gap-6">
      <AddProduct url={`/seller/${id}/dashboard/products`} />
    </div>
  );
}

export default AddProductPage;
