import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <form action="/search" method="GET" role="search" className="relative">
      <label htmlFor="site-search" className="sr-only">
        Search products
      </label>
      <SearchIcon
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <Input
        id="site-search"
        name="q"
        type="search"
        placeholder="Search shirts, brands…"
        className="h-9 w-56 rounded-full bg-card pl-9 lg:w-72"
      />
    </form>
  );
};

export default Search;
