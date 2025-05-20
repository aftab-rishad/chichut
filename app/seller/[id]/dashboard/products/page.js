import TopSection from "@/components/dashboard/TopSection";
import brand from "@/graphql/query/brand";
import getProducts from "@/graphql/query/products";
import dynamic from "next/dynamic";

const ProductTable = dynamic(
  () => import("@/components/dashboard/product/ProductTable"),
  {
    ssr: false,
  }
);

async function CreateProductPage({ params: { id } }) {
  let products = [];
  let myBrand;
  try {
    const res = await getProducts(
      `id name brand category price stock images`,
      {}
    );
    myBrand = await brand({ id }, "name");

    if (!res?.error) {
      products = res || [];
    }
  } catch (error) {
    console.log(error);
  }
  const filteredData = products?.filter(
    (product) => product?.brand === myBrand?.name
  );

  return (
    <>
      <div className="flex flex-col gap-6">
        <TopSection description="Manage your product inventory and listings.">
          Products
        </TopSection>
        <ProductTable data={filteredData} id={id} />
      </div>
    </>
  );
}

export default CreateProductPage;
