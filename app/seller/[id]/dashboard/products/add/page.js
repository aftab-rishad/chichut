import dynamic from "next/dynamic";

const AddProduct = dynamic(
  () => import("@/components/dashboard/product/add/AddProduct"),
  {
    ssr: false,
  }
);

function AddProductPage({ params: { id } }) {
  return (
    <div className="flex flex-col gap-6">
      <AddProduct url={`/seller/${id}/dashboard/products`} />
    </div>
  );
}

export default AddProductPage;
