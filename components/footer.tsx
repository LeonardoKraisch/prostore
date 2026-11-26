import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import { getAllCategories } from "@/lib/actions/product.actions";

const Footer = async () => {
  const currentYear = new Date().getFullYear();
  const categories = await getAllCategories();

  return (
    <footer className="pinstripe mt-8 bg-[hsl(216_48.7%_22.9%)] text-[hsl(216_38.5%_97.5%)] dark:bg-card dark:text-card-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-4 md:px-10">
        <div className="md:col-span-2">
          <p className="font-display text-2xl font-bold tracking-tight">
            {APP_NAME}
          </p>
          <p className="mt-3 max-w-sm text-sm opacity-80">
            A demo shirt shop built with Next.js, Prisma and PostgreSQL. Orders
            are not shipped and payments run in test mode.
          </p>
        </div>
        <nav aria-label="Shop">
          <h2 className="text-sm font-semibold">Shop</h2>
          <ul className="mt-3 space-y-2 text-sm opacity-80">
            <li>
              <Link href="/search" className="hover:underline">
                All products
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.category}>
                <Link
                  href={`/search?category=${encodeURIComponent(c.category)}`}
                  className="hover:underline"
                >
                  {c.category}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Your account">
          <h2 className="text-sm font-semibold">Your account</h2>
          <ul className="mt-3 space-y-2 text-sm opacity-80">
            <li>
              <Link href="/sign-in" className="hover:underline">
                Sign in
              </Link>
            </li>
            <li>
              <Link href="/user/orders" className="hover:underline">
                Orders
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:underline">
                Cart
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/15 dark:border-border">
        <p className="mx-auto max-w-7xl px-5 py-5 text-xs opacity-70 md:px-10">
          © {currentYear} {APP_NAME}. Portfolio project.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
