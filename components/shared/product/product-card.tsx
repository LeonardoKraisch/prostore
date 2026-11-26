import Link from "next/link";
import Image from "next/image";
import { ProductProps } from "@/types";
import { formatCurrency } from "@/lib/utils";
import Rating from "./reviews";

const ProductCard = ({
  product,
  priority = false,
}: {
  product: ProductProps;
  priority?: boolean;
}) => {
  const inStock = product.stock > 0;

  return (
    <article className="group relative flex flex-col">
      <Link
        href={`/product/${product.slug}`}
        className="relative block overflow-hidden rounded-md photo-panel"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          width={600}
          height={600}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          className="aspect-square w-full object-cover"
        />
        {/* Etiqueta tecida com o preço */}
        <span className="woven-label absolute bottom-3 left-3">
          <span className="text-[11px] leading-tight text-muted-foreground">
            {product.brand}
          </span>
          <span className="font-display text-base font-semibold leading-tight">
            {inStock ? formatCurrency(product.price) : "Sold out"}
          </span>
        </span>
      </Link>
      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-medium leading-snug">
          <Link
            href={`/product/${product.slug}`}
            className="underline-offset-4 group-hover:underline"
          >
            {product.name}
          </Link>
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Rating value={Number(product.rating)} size="sm" />
          <span>
            {product.numReviews}{" "}
            {product.numReviews === 1 ? "review" : "reviews"}
          </span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
