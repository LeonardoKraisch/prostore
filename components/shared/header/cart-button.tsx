import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { getMyCart } from "@/lib/actions/cart.actions";
import { Button } from "@/components/ui/button";

const CartButton = async () => {
  let count = 0;
  try {
    const cart = await getMyCart();
    count = cart?.items.reduce((acc, item) => acc + item.quantity, 0) ?? 0;
  } catch {
    // Sem cookie de sessão ainda: carrinho vazio.
  }

  return (
    <Button asChild variant="ghost" size="icon" className="relative">
      <Link
        href="/cart"
        aria-label={count > 0 ? `Cart, ${count} items` : "Cart"}
      >
        <ShoppingBag className="size-5" />
        {count > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex size-[18px] items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
            {count}
          </span>
        )}
      </Link>
    </Button>
  );
};

export default CartButton;
