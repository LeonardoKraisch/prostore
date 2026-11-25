import ProductCard from "@/components/shared/product/product-card";
import { Button } from "@/components/ui/button";
import {
  getAllProducts,
  getAllCategories,
} from "@/lib/actions/product.actions";
import Link from "next/link";

export async function generateMetadata(props: {
  searchParams: Promise<{
    q: string;
    category: string;
    price: string;
    rating: string;
  }>;
}) {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
  } = await props.searchParams;

  const isQuerySet = q && q !== "all" && q.trim() !== "";
  const isCategorySet =
    category && category !== "all" && category.trim() !== "";
  const isPriceSet = price && price !== "all" && price.trim() !== "";
  const isRatingSet = rating && rating !== "all" && rating.trim() !== "";

  if (isQuerySet || isCategorySet || isPriceSet || isRatingSet) {
    return {
      title: `Search ${isQuerySet ? q : ""} ${isCategorySet ? `: Category ${category}` : ""} ${isPriceSet ? `: Price ${price}` : ""} ${isRatingSet ? `: Rating ${rating}` : ""}`,
    };
  } else {
    return {
      title: `Search Products`,
    };
  }
}

const prices = [
  {
    name: "R$1 to R$50",
    value: "1-50",
  },
  {
    name: "R$51 to R$100",
    value: "51-100",
  },
  {
    name: "R$101 to R$200",
    value: "101-200",
  },
  {
    name: "R$201 to R$500",
    value: "201-500",
  },
  {
    name: "R$501 to R$1000",
    value: "501-1000",
  },
];

const ratings = [
  {
    name: "4 stars & up",
    value: "4",
  },
  {
    name: "3 stars & up",
    value: "3",
  },
  {
    name: "2 stars & up",
    value: "2",
  },
  {
    name: "1 star & up",
    value: "1",
  },
];

const sortOrders = [
  { value: "newest", label: "Newest" },
  { value: "lowest", label: "Price: low to high" },
  { value: "highest", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
];

const FilterGroup = ({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string; active: boolean }[];
}) => (
  <div>
    <h2 className="mb-2 text-sm font-semibold">{title}</h2>
    <ul className="space-y-0.5">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            aria-current={item.active ? "true" : undefined}
            className={
              item.active
                ? "block rounded px-2 py-1 text-sm font-medium bg-secondary text-secondary-foreground"
                : "block rounded px-2 py-1 text-sm text-muted-foreground hover:text-foreground"
            }
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const SearchPage = async (props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>;
}) => {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1",
  } = await props.searchParams;

  const getFilterUrl = ({
    c,
    s,
    p,
    r,
    pg,
  }: {
    c?: string;
    s?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = {
      q,
      category,
      price,
      rating,
      sort,
      page,
    };
    if (c) params.category = c;
    if (p) params.price = p;
    if (r) params.rating = r;
    if (s) params.sort = s;
    if (pg) params.page = pg;
    return `/search?${new URLSearchParams(params).toString()}`;
  };

  const categories = await getAllCategories();

  const products = await getAllProducts({
    query: q,
    category: category,
    price: price,
    rating: rating,
    sort: sort,
    page: Number(page),
    limit: 12,
  });
  const isSet = (v: string) => v !== "all" && v !== "";
  const hasFilters = [q, category, price, rating].some(isSet);
  const activeFilters = [
    isSet(q) && isSet(category) && `“${q}”`,
    isSet(price) && prices.find((p) => p.value === price)?.name,
    isSet(rating) && ratings.find((r) => r.value === rating)?.name,
  ].filter(Boolean) as string[];

  const heading = isSet(category)
    ? category
    : isSet(q)
      ? `Results for “${q}”`
      : "All products";

  return (
    <div className="grid gap-8 md:grid-cols-[200px_1fr] lg:gap-12">
      <aside className="space-y-6 md:pt-2" aria-label="Filters">
        <FilterGroup
          title="Category"
          items={[
            {
              label: "All",
              href: getFilterUrl({ c: "all" }),
              active: !isSet(category),
            },
            ...categories.map((c) => ({
              label: c.category,
              href: getFilterUrl({ c: String(c.category) }),
              active: category === String(c.category),
            })),
          ]}
        />
        <FilterGroup
          title="Price"
          items={[
            { label: "Any", href: getFilterUrl({ p: "all" }), active: !isSet(price) },
            ...prices.map((p) => ({
              label: p.name,
              href: getFilterUrl({ p: p.value }),
              active: price === p.value,
            })),
          ]}
        />
        <FilterGroup
          title="Customer rating"
          items={[
            { label: "Any", href: getFilterUrl({ r: "all" }), active: !isSet(rating) },
            ...ratings.map((r) => ({
              label: r.name,
              href: getFilterUrl({ r: r.value }),
              active: rating === r.value,
            })),
          ]}
        />
      </aside>

      <div>
        <div className="flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="h2-bold">{heading}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {products.totalCount === 0
                ? "No products"
                : `${products.totalCount} ${products.totalCount === 1 ? "product" : "products"}`}
              {activeFilters.length > 0 && ` for ${activeFilters.join(", ")}`}
              {hasFilters && (
                <>
                  {" "}
                  <Link
                    href="/search"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Clear filters
                  </Link>
                </>
              )}
            </p>
          </div>
          <nav aria-label="Sort" className="flex flex-wrap gap-1 text-sm">
            {sortOrders.map((s) => (
              <Link
                key={s.value}
                href={getFilterUrl({ s: s.value })}
                aria-current={sort === s.value ? "true" : undefined}
                className={
                  sort === s.value
                    ? "rounded-full bg-primary px-3 py-1 font-medium text-primary-foreground"
                    : "rounded-full px-3 py-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
                }
              >
                {s.label}
              </Link>
            ))}
          </nav>
        </div>

        {products.data.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-display text-xl font-semibold">
              Nothing matches these filters
            </p>
            <p className="mt-2 text-muted-foreground">
              Try a different category or price range.
            </p>
            <Button asChild className="mt-6">
              <Link href="/search">Clear filters</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3">
            {products.data.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={index < 3}
              />
            ))}
          </div>
        )}

        {products.totalPages > 1 && (
          <nav
            aria-label="Pagination"
            className="mt-12 flex items-center justify-center gap-2 text-sm"
          >
            {Array.from({ length: products.totalPages }, (_, i) => i + 1).map(
              (n) => (
                <Link
                  key={n}
                  href={getFilterUrl({ pg: String(n) })}
                  aria-current={Number(page) === n ? "page" : undefined}
                  className={
                    Number(page) === n
                      ? "flex size-9 items-center justify-center rounded-full bg-primary font-medium text-primary-foreground"
                      : "flex size-9 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary"
                  }
                >
                  {n}
                </Link>
              ),
            )}
          </nav>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
