import getProducts from "@/graphql/query/products";
import ProductCard from "@/components/common/ProductCard";
import { notFound } from "next/navigation";
import FuzzySearch from "fuzzy-search";
export const dynamic = "force-dynamic";
async function ResultsPage({ searchParams: { search_query } }) {
  if (!search_query) {
    notFound();
  }

  const products = await getProducts(
    "id name price discount images size color",
    {}
  );

  const searcher = new FuzzySearch(products, ["name"], {
    caseSensitive: false,
  });
  const result = searcher.search(search_query);

  const productsNotFound = (
    <>
      <div className="h-32 w-full mt-6 flex flex-col justify-center items-center px-6">
        <h2 className="sm:text-2xl text-xl font-semibold">
          Oops! No Products Yet
        </h2>
        <p>Sorry, we couldn't find any products matching your search.</p>
      </div>
    </>
  );
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Search Results
              </h1>
              <p className="text-muted-foreground">
                Here are the products matching your search.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center"></div>
          </div>
        </div>
      </div>
      <div className="flex sm:mx-12 px-2 mt-6 flex-wrap gap-2 justify-center sm:justify-start">
        {result?.length === 0
          ? productsNotFound
          : result?.map((product) => (
              <ProductCard key={product?.id} product={product} />
            ))}
      </div>
    </div>
  );
}

export default ResultsPage;
