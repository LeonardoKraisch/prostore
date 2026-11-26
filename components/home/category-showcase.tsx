import Image from "next/image";
import Link from "next/link";

type CategoryTile = {
  category: string;
  count: number;
  image: string | null;
};

const CategoryShowcase = ({ categories }: { categories: CategoryTile[] }) => {
  // Uma categoria só não justifica a seção.
  if (categories.length < 2) return null;

  return (
    <section className="my-16">
      <h2 className="h2-bold mb-6">Shop by category</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {categories.map((c) => (
          <Link
            key={c.category}
            href={`/search?category=${encodeURIComponent(c.category)}`}
            className="group flex items-center gap-5 rounded-md border bg-card p-4 transition-colors hover:border-primary"
          >
            <div className="photo-panel size-24 shrink-0 overflow-hidden rounded sm:size-28">
              {c.image && (
                <Image
                  src={c.image}
                  alt=""
                  width={224}
                  height={224}
                  className="size-full object-contain p-2"
                />
              )}
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold tracking-tight underline-offset-4 group-hover:underline">
                {c.category}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {c.count} {c.count === 1 ? "style" : "styles"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryShowcase;
