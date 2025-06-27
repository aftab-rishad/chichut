import CategoriesSection from "@/components/home/CategoriesSection";
import Hero from "@/components/home/Hero";
import MultiVendorFeaturesSection from "@/components/home/MultiVendorFeaturesSection";
import ProductsSection from "@/components/home/ProductsSection";
import TopBrands from "@/components/home/TopBrands";
import TrustBadgesSection from "@/components/home/TrustBadgesSection";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Hero />
      <TopBrands />
      <CategoriesSection />
      <ProductsSection />
      <MultiVendorFeaturesSection />
      <TrustBadgesSection />
    </>
  );
}
