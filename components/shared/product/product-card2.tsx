import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProductPrice from "./product-price";
import ProductProps from "./product-type";
import { cn } from "@/lib/utils";

const ProductCard = ({
  product,
  className,
}: {
  product: ProductProps;
  className?: string;
}) => {
  return (
    <Card className={cn("w-full max-w-sm", className)}>
      <CardHeader className="p-0 items-center">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.images?.[0] ?? "/placeholder-image.jpg"}
            alt={product.name}
            width={300}
            height={300}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="aspect-square w-full object-cover"
          />
        </Link>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 grid gap-4">
        <div className="text-xs">{product.brand}</div>
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-sm font-medium sm:text-base">{product.name}</h2>
        </Link>
        <div className="flex-between gap-4">
          <p>{product.rating} Stars</p>
          {product.stock > 0 ? (
            <ProductPrice
              className="mt-1 text-muted-foreground"
              price={Number(product.price)}
            />
          ) : (
            <p className="text-destructive">Out of Stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
