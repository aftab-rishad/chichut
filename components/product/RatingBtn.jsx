"use client";
import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import RatingModal from "./RatingModal";
import createReview from "@/graphql/mutation/createReview";
import { toast } from "sonner";
function RatingBtn({
  alreadyReviewDone,
  orderProductIds,
  productName = "this product",
  productId,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (rating, comment) => {
    const data = await createReview({
      rating: Number(rating),
      comment,
      productId,
    });
    if (data?.error) {
      toast.error(data?.error);
    } else {
      toast.success("Your rating has been successfully submitted!");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        {!alreadyReviewDone && orderProductIds?.id && (
          <Button onClick={() => setIsOpen(true)} variant="default" size="sm">
            Add Reviews <PlusIcon />
          </Button>
        )}
      </div>
      <RatingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        productName={productName}
      />
    </>
  );
}

export default RatingBtn;
