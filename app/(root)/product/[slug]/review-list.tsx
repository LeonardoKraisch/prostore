"use client";
import { useState } from "react";
import { Review } from "@/lib/generated/prisma";
import Link from "next/link";
import ReviewForm from "./review-form";

const ReviewList = ({
  userId,
  productId,
  productSlug,
}: {
  userId: string;
  productId: string;
  productSlug: string;
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const handleReviewSubmited = () => {};

  return (
    <div className="space-y-4">
      {reviews.length === 0 && <div> No reviews yet</div>}
      {userId ? (
        <ReviewForm
          userId={userId}
          productId={productId}
          onReviewSubmited={handleReviewSubmited}
        />
      ) : (
        <div>
          Please
          <Link
            href={`/sign-in?callbackUrl=/product/${productSlug}`}
            className="text-blue-700 px-2"
          >
            sign in
          </Link>
          to review this product
        </div>
      )}
      <div className="flex flex-col gap-3"></div>
    </div>
  );
};

export default ReviewList;
