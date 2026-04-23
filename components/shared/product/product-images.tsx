"use client";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const ProductImages = ({ images }: { images: string[] }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <>
      <div className="space-y-4">
        <Image
          src={mainImage}
          alt="Product Image"
          width={1000}
          height={1000}
          className="min-h-[300px]"
          object-cover
          object-center
        />
      </div>
      <div className="flex">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "border mr-2 cursor-pointer hover:border-orange-600",
              mainImage === image && "border-orange-500",
            )}
          >
            <Image
              key={index}
              src={image}
              alt={`Product Image ${index + 1}`}
              width={100}
              height={100}
              onClick={() => setMainImage(image)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductImages;
