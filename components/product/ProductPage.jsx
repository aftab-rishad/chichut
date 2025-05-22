import dynamic from "next/dynamic";
import getProductById from "@/graphql/query/product";
import brand from "@/graphql/query/brand";

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
// const product = {
//   id: "1",
//   name: "Oversized Cotton Blend Sweater",
//   price: 89.99,
//   originalPrice: 129.99,
//   discount: 30,
//   description:
//     "This oversized sweater features a relaxed silhouette crafted from a premium cotton blend fabric. Perfect for layering during colder months, it offers both comfort and style with its contemporary design and soft texture.",
//   rating: 4.8,
//   reviewCount: 124,
//   sizes: ["XS", "S", "M", "L", "XL"],
//   colors: ["Cream", "Sage Green", "Dusty Rose", "Navy"],
//   images: [
//     "/placeholder.svg",
//     "/placeholder.svg",
//     "/placeholder.svg",
//     "/placeholder.svg",
//     "/placeholder.svg",
//   ],
//   availability: "In Stock",
//   vendor: {
//     name: "Modish Apparel",
//     image: "/placeholder.svg?height=100&width=100",
//     rating: 4.9,
//     reviewCount: 1243,
//     isOnline: true,
//   },
//   shipping: "Free shipping on orders over $50",
//   returnPolicy: "30-day easy returns",
//   material: "70% Cotton, 30% Polyester",
//   care: "Machine wash cold, tumble dry low",
// };

// Mock related products
const relatedProducts = [
  {
    id: "2",
    name: "Ribbed Knit Cardigan",
    price: 69.99,
    image: "/placeholder.svg?height=300&width=250&text=Related+1",
    rating: 4.6,
  },
  {
    id: "3",
    name: "Wool Blend Turtleneck",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=250&text=Related+2",
    rating: 4.7,
  },
  {
    id: "4",
    name: "Cashmere V-Neck Pullover",
    price: 149.99,
    image: "/placeholder.svg?height=300&width=250&text=Related+3",
    rating: 4.9,
  },
  {
    id: "5",
    name: "Cable Knit Sweater",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=250&text=Related+4",
    rating: 4.5,
  },
];

export default async function ProductPage({ id }) {
  let product;
  let vendor;

  try {
    product = await getProductById(
      id,
      "name description color size images price stock discount brand"
    );
    vendor = await brand(
      { name: product?.brand },
      "id name image email location"
    );
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <ProductGallery images={product?.images} />
        <ProductInfo product={product} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Vendor Details */}
        <div className="md:col-span-1">
          <VendorDetails vendor={vendor} />
        </div>

        {/* Additional Info */}
        <div className="md:col-span-2">
          {/* <AdditionalInfo product={product} /> */}
        </div>
      </div>

      {/* Related Products */}
      <div className="mb-12">
        {/* <RelatedProducts products={relatedProducts} /> */}
      </div>
    </div>
  );
}
