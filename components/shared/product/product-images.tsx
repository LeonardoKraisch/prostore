"use client";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const ProductImages = ({
  images,
  name,
}: {
  images: string[];
  name: string;
}) => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="space-y-3">
      <div className="photo-panel overflow-hidden rounded-md">
        <Image
          src={images[current]}
          alt={name}
          width={1000}
          height={1000}
          priority
          sizes="(min-width: 768px) 55vw, 100vw"
          className="aspect-square w-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-3" role="list" aria-label="Product photos">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              role="listitem"
              onClick={() => setCurrent(index)}
              aria-label={`Show photo ${index + 1} of ${images.length}`}
              aria-current={current === index}
              className={cn(
                "overflow-hidden rounded photo-panel ring-offset-2 ring-offset-background transition-shadow",
                current === index
                  ? "ring-2 ring-primary"
                  : "ring-1 ring-border hover:ring-primary/50",
              )}
            >
              <Image
                src={image}
                alt=""
                width={96}
                height={96}
                className="size-20 object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImages;
