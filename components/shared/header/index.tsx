import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import { getAllCategories } from "@/lib/actions/product.actions";
import Menu from "./menu";
import LogoMark from "@/components/shared/logo-mark";
import CategoryDrawer from "./category-drawer";
import Search from "./search";

const Header = async () => {
  const categories = await getAllCategories();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-5 md:px-10">
        <div className="md:hidden">
          <CategoryDrawer />
        </div>
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <LogoMark />
          <span className="font-display text-xl font-bold tracking-tight text-primary">
            {APP_NAME}
          </span>
        </Link>
        <nav aria-label="Categories" className="ml-4 hidden lg:block">
          <ul className="flex items-center gap-5 text-sm">
            {categories.map((c) => (
              <li key={c.category}>
                <Link
                  href={`/search?category=${encodeURIComponent(c.category)}`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {c.category}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto hidden md:block">
          <Search />
        </div>
        <div className="ml-auto md:ml-0">
          <Menu />
        </div>
      </div>
    </header>
  );
};

export default Header;
