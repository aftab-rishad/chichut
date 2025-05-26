import dynamic from "next/dynamic";
import getProductById from "@/graphql/query/product";
import brand from "@/graphql/query/brand";
import carts from "@/graphql/query/carts";

const ProductGallery = dynamic(
  () => import("@/components/product/ProductGallery"),
  {
    ssr: false,
  }
);
const ProductInfo = dynamic(() => import("@/components/product/ProductInfo"), {
  ssr: false,
});
const VendorDetails = dynamic(
  () => import("@/components/product/VendorDetails"),
  {
    ssr: false,
  }
);
const AdditionalInfo = dynamic(
  () => import("@/components/product/AdditionalInfo"),
  {
    ssr: false,
  }
);
const RelatedProducts = dynamic(
  () => import("@/components/product/RelatedProducts"),
  {
    ssr: false,
  }
);

// Mock related products
const relatedProducts = [
  {
    id: "2",
    name: "Ribbed Knit Cardigan",
    price: 69.99,
    image: "/placeholder.svg",
    rating: 4.6,
  },
  {
    id: "3",
    name: "Wool Blend Turtleneck",
    price: 79.99,
    image: "/placeholder.svg",
    rating: 4.7,
  },
  {
    id: "4",
    name: "Cashmere V-Neck Pullover",
    price: 149.99,
    image: "/placeholder.svg",
    rating: 4.9,
  },
  {
    id: "5",
    name: "Cable Knit Sweater",
    price: 89.99,
    image: "/placeholder.svg",
    rating: 4.5,
  },
];

export default async function ProductPage({ id }) {
  let product;
  let vendor;
  let allCarts;

  try {
    product = await getProductById(
      id,
      "id name description color size images price stock discount brand"
    );
    vendor = await brand(
      { name: product?.brand },
      "id name image email location"
    );
    allCarts = await carts("productId");
    console.log("Carts Data:", allCarts);
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  const isAlreadyInCart =
    allCarts?.find((cart) => cart.productId === id)?.productId === id;

  console.log("isAlreadyInCart:", isAlreadyInCart);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <ProductGallery images={product?.images} />
        <ProductInfo product={product} isAlreadyInCart={isAlreadyInCart} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Vendor Details */}
        <div className="md:col-span-1">
          <VendorDetails vendor={vendor} />
        </div>

        {/* Additional Info */}
        <div className="md:col-span-2">
          <AdditionalInfo product={product} />
        </div>
      </div>

      {/* Related Products */}
      <div className="mb-12">
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}
