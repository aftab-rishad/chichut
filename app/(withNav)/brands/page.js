import brands from "@/graphql/query/brands";
import BrandsCard from "@/components/brands/BrandsCard";
export const dynamic = "force-dynamic";
async function BrandsPage() {
  const allBrands = await brands("name image id");

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">All Brands</h1>
              <p className="text-muted-foreground">
                Discover products from our trusted brand partners
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center"></div>
          </div>
        </div>
      </div>
      <div className="mt-8 mx-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {allBrands?.map((brand) => (
          <BrandsCard brand={brand} />
        ))}
      </div>
    </div>
  );
}

export default BrandsPage;
