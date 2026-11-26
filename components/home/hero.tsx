import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductProps } from "@/types";
import { formatCurrency } from "@/lib/utils";

const Hero = ({ product }: { product?: ProductProps }) => {
  return (
    <section className="grid items-center gap-10 py-8 md:grid-cols-2 md:py-14">
      <div className="max-w-xl">
        <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-primary sm:text-6xl lg:text-7xl">
          Shirts that fit the whole week.
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
          Oxford, poplin and stretch cotton, from the office to the weekend.
          Free shipping on orders over R$100.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link
              href={`/search?category=${encodeURIComponent("Shirts")}`}
            >
              Shop shirts
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/search">Browse all products</Link>
          </Button>
        </div>
      </div>

      {product && (
        <Link
          href={`/product/${product.slug}`}
          className="photo-panel relative block aspect-[4/5] overflow-hidden rounded-md sm:aspect-square"
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            width={900}
            height={900}
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="absolute inset-0 size-full object-cover"
          />
          <span className="woven-label absolute bottom-5 left-5 max-w-[70%]">
            <span className="text-xs leading-tight text-muted-foreground">
              {product.brand}
            </span>
            <span className="text-sm font-medium leading-snug">
              {product.name}
            </span>
            <span className="font-display text-lg font-semibold leading-tight">
              {formatCurrency(product.price)}
            </span>
          </span>
        </Link>
      )}
    </section>
  );
};

export default Hero;
