import { getAllCategories } from "@/lib/actions/product.actions";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../ui/drawer";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import Search from "./search";

const CategoryDrawer = async () => {
  const categories = await getAllCategories();
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open categories">
          <MenuIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle className="font-display text-xl">Shop</DrawerTitle>
          <div className="mt-4">
            <Search />
          </div>
          <div className="space-y-1 mt-4">
            <Button asChild className="w-full justify-start" variant="ghost">
              <DrawerClose asChild>
                <Link href="/search">All products</Link>
              </DrawerClose>
            </Button>
            {categories.map((x) => (
              <Button
                asChild
                className="w-full justify-start
              "
                key={x.category}
                variant="ghost"
              >
                <DrawerClose asChild>
                  <Link
                    href={`/search?category=${encodeURIComponent(x.category)}`}
                  >
                    {x.category}
                    <span className="ml-auto text-muted-foreground">
                      {x._count}
                    </span>
                  </Link>
                </DrawerClose>
              </Button>
            ))}
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default CategoryDrawer;
