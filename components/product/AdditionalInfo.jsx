import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { PlusIcon, StarIcon } from "lucide-react";
import getReviewByProduct from "@/graphql/query/getReviewByProduct";
import { MoodEmpty } from "../common/Svg";
import me from "@/graphql/query/me";
import getAllOrders from "@/graphql/query/getAllOrders";
import RatingBtn from "./RatingBtn";
import { ScrollArea } from "../ui/scroll-area";

export default async function AdditionalInfo({ product }) {
  const reviews = await getReviewByProduct(
    { id: product?.id },
    `user {
      firstName
      lastName
      id
    }
    rating
    comment
    createdAt
    id`
  );

  const session = await me("id");
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;
  const alreadyReviewDone = reviews.find(
    (r) => Number(r?.user?.id) === Number(session?.id)
  );
  const orders = await getAllOrders(`userId products {
      id
    }`);
  const myOrders = orders?.filter(
    (order) => Number(order?.userId) === Number(session?.id)
  );
  const orderProductIds = myOrders
    .flatMap((order) => order.products || [])
    .find((p) => p?.id && Number(p.id) === Number(product?.id));

  return (
    <Card>
      <CardContent className="p-6">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="returns">Returns</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="pt-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="material">
                <AccordionTrigger>Material & Care</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    <strong>Material:</strong> {product?.material || "N/A"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    <strong>Care Instructions:</strong> {product?.care || "N/A"}
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="fit">
                <AccordionTrigger>Fit & Sizing</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    This item fits true to size. For a more relaxed fit, we
                    recommend sizing up.
                  </p>
                  <div className="mt-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm">
                          View Size Guide
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="space-y-2">
                          <h3 className="font-medium">Size Guide</h3>
                          <div className="text-sm">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="border-b">
                                  <th className="py-2 text-left">Size</th>
                                  <th className="py-2 text-left">Bust (in)</th>
                                  <th className="py-2 text-left">Waist (in)</th>
                                  <th className="py-2 text-left">Hips (in)</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b">
                                  <td className="py-2">XS</td>
                                  <td className="py-2">31-32</td>
                                  <td className="py-2">24-25</td>
                                  <td className="py-2">34-35</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="py-2">S</td>
                                  <td className="py-2">33-34</td>
                                  <td className="py-2">26-27</td>
                                  <td className="py-2">36-37</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="py-2">M</td>
                                  <td className="py-2">35-36</td>
                                  <td className="py-2">28-29</td>
                                  <td className="py-2">38-39</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="py-2">L</td>
                                  <td className="py-2">37-38</td>
                                  <td className="py-2">30-31</td>
                                  <td className="py-2">40-41</td>
                                </tr>
                                <tr>
                                  <td className="py-2">XL</td>
                                  <td className="py-2">39-40</td>
                                  <td className="py-2">32-33</td>
                                  <td className="py-2">42-43</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          <TabsContent value="shipping" className="pt-4">
            <div className="space-y-4">
              <h3 className="font-medium">Shipping Information</h3>
              <p className="text-sm text-muted-foreground">
                Free shipping on orders over $50
              </p>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong>Standard Shipping:</strong> 3-5 business days
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Express Shipping:</strong> 1-2 business days
                  (additional fee)
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>International Shipping:</strong> 7-14 business days
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="returns" className="pt-4">
            <div className="space-y-4">
              <h3 className="font-medium">Return Policy</h3>
              <p className="text-sm text-muted-foreground">
                30-day easy returns
              </p>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Items must be returned in original condition with tags
                  attached.
                </p>
                <p className="text-sm text-muted-foreground">
                  Return shipping is free for domestic orders.
                </p>
                <p className="text-sm text-muted-foreground">
                  Refunds will be processed within 5-7 business days after we
                  receive your return.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Customer Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(Number(averageRating))
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">
                    Based on {reviews?.length} reviews
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <ScrollArea className="h-32 ">
                  {reviews?.length >= 1 ? (
                    reviews?.map((review) => (
                      <div key={review?.id} className="border-b pb-4">
                        <div className="flex items-center mb-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Number(review?.rating)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-sm font-medium">
                            {review?.user?.firstName} {review?.user?.lastName}.
                          </span>
                          <span className="ml-2 text-xs text-muted-foreground">
                            {new Date(review?.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm">{review?.comment}</p>
                      </div>
                    ))
                  ) : (
                    <div className="w-full min-h-32 text-foreground/60 flex flex-col justify-center items-center">
                      <span className="text-9xl absolute text-foreground/5">
                        <MoodEmpty />
                      </span>
                      <span>
                        No reviews have been submitted for this product yet.
                      </span>
                    </div>
                  )}
                </ScrollArea>

                <RatingBtn
                  alreadyReviewDone={alreadyReviewDone}
                  orderProductIds={orderProductIds}
                  productName={product?.name}
                  productId={Number(product?.id)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
