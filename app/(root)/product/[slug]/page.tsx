import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/actions/product.actions";
import ProductImages from "@/components/shared/product/product-images";
import AddToCart from "@/components/shared/product/add-to-cart";
import { getMyCart } from "@/lib/actions/cart.actions";
import ReviewList from "./review-list";
import { auth } from "@/auth";
import Rating from "@/components/shared/product/reviews";
import type { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description: product.description.slice(0, 160),
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 160),
      images: product.images[0] ? [{ url: product.images[0] }] : [],
      type: "website",
    },
  };
}

const ProductDetailsPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await props.params;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const cart = await getMyCart();
  const session = await auth();
  const userId = session?.user?.id;

  const inStock = product.stock > 0;

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <Link href="/search" className="hover:text-foreground">
          Shop
        </Link>
        <span className="mx-2" aria-hidden>
          /
        </span>
        <Link
          href={`/search?category=${encodeURIComponent(product.category)}`}
          className="hover:text-foreground"
        >
          {product.category}
        </Link>
      </nav>

      <section className="grid gap-10 md:grid-cols-[1.15fr_1fr] lg:gap-16">
        <ProductImages images={product.images} name={product.name} />

        <div className="md:pt-4">
          <p className="text-sm text-muted-foreground">{product.brand}</p>
          <h1 className="mt-1 font-display text-3xl font-bold leading-tight tracking-tight text-primary lg:text-4xl">
            {product.name}
          </h1>
          <a
            href="#reviews"
            className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Rating value={Number(product.rating)} size="sm" />
            {product.numReviews}{" "}
            {product.numReviews === 1 ? "review" : "reviews"}
          </a>

          <p className="mt-6 font-display text-3xl font-semibold">
            {formatCurrency(product.price)}
          </p>
          <p
            className={
              inStock
                ? "mt-1 text-sm text-muted-foreground"
                : "mt-1 text-sm font-medium text-destructive"
            }
          >
            {inStock
              ? product.stock <= 5
                ? `Only ${product.stock} left in stock`
                : "In stock"
              : "Sold out"}
          </p>

          {inStock && (
            <div className="mt-6 max-w-sm">
              <AddToCart
                cart={cart}
                item={{
                  productId: product.id,
                  name: product.name,
                  slug: product.slug,
                  price: product.price,
                  quantity: 1,
                  image: product.images![0],
                }}
              />
            </div>
          )}

          <div className="mt-10 border-t pt-6">
            <h2 className="font-medium">About this shirt</h2>
            <p className="mt-2 max-w-prose leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          </div>

          <ul className="mt-6 space-y-1 border-t pt-6 text-sm text-muted-foreground">
            <li>Free shipping on orders over R$100</li>
            <li>Returns within 30 days of delivery</li>
          </ul>
        </div>
      </section>

      <section id="reviews" className="mt-20 scroll-mt-24 border-t pt-10">
        <h2 className="h2-bold">Customer reviews</h2>
        <ReviewList
          userId={userId || ""}
          productId={product.id}
          productSlug={product.slug}
        />
      </section>
    </>
  );
};

export default ProductDetailsPage;
