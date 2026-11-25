import Link from "next/link";
import ProductCard from "./product-card";
import { ProductProps } from "@/types/index";

const ProductList = ({
  data,
  title,
  limit,
  viewAllHref,
}: {
  data: ProductProps[];
  title?: string;
  limit?: number;
  viewAllHref?: string;
}) => {
  const limitedData = limit ? data.slice(0, limit) : data;

  return (
    <section className="my-16">
      {(title || viewAllHref) && (
        <div className="mb-6 flex items-end justify-between gap-4">
          {title && <h2 className="h2-bold">{title}</h2>}
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              View all products
            </Link>
          )}
        </div>
      )}
      {data.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
          {limitedData.map((product: ProductProps, index) => (
            <ProductCard
              key={product.slug}
              product={product}
              priority={index < 4}
            />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">
          No products yet. Check back soon.
        </p>
      )}
    </section>
  );
};

export default ProductList;
