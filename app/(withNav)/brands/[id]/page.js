import brand from "@/graphql/query/brand";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { notFound } from "next/navigation";
import getProducts from "@/graphql/query/products";
import ProductCard from "@/components/common/ProductCard";
export const dynamic = "force-dynamic";
async function BrandsPageById({ params: { id } }) {
  const brandById = await brand(
    { id },
    "name image email location description"
  );
  if (!brandById?.name) {
    notFound();
  }
  const products = await getProducts(
    "id name price discount brand images size color",
    {}
  );

  const myProducts = products?.filter(
    (product) => product?.brand === brandById?.name
  );

  const productsNotFound = (
    <>
      <div className="h-32 w-full mt-6 flex flex-col justify-center items-center px-6">
        <h2 className="sm:text-2xl text-xl font-semibold">
          Oops! No Products Yet
        </h2>
        <p>
          Looks like this brand hasn't added any products yet. Please check back
          later.
        </p>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="py-12 bg-foreground/5 rounded-lg border border-foreground/10 md:py-16 text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-6 relative rounded-md w-20 h-20 md:w-24 md:h-24">
              <Image
                src={brandById?.image}
                alt={`${brandById?.name} logo`}
                className="w-full h-full rounded-md object-contain"
                width={1200}
                height={1200}
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              {brandById?.name}
            </h1>

            <p className="mt-4 text-lg text-muted-foreground flex flex-col max-w-2xl mx-auto">
              <span>{brandById?.email}</span>
              <span>{brandById?.location}</span>
            </p>
          </div>
        </header>
        <section className="py-8 md:py-12">
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                About Our Brand
              </h2>
              <p className="text-foreground leading-relaxed">
                {brandById?.description}
              </p>
            </CardContent>
          </Card>
        </section>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-foreground">
          Products
        </h2>
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          {myProducts?.length === 0
            ? productsNotFound
            : myProducts?.map((product) => <ProductCard product={product} />)}
        </div>
      </div>
    </div>
  );
}

export default BrandsPageById;
