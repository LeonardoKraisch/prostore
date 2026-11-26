"use client";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { Loader, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { CartProps } from "@/types";
import { formatCurrency } from "@/lib/utils";

const FREE_SHIPPING_THRESHOLD = 100;

const CartTable = ({ cart }: { cart?: CartProps }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const itemCount = cart?.items.reduce((a, c) => a + c.quantity, 0) ?? 0;
  const itemsPrice = Number(cart?.itemsPrice ?? 0);
  const missingForFreeShipping = Math.max(
    FREE_SHIPPING_THRESHOLD - itemsPrice,
    0,
  );

  const changeQuantity = (action: () => Promise<{ success: boolean; message: string }>) =>
    startTransition(async () => {
      const res = await action();
      if (!res.success) {
        toast({ variant: "destructive", description: res.message });
      }
    });

  if (!cart || cart.items.length === 0) {
    return (
      <div className="py-20 text-center">
        <h1 className="h2-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">
          Find a shirt you like and add it here.
        </p>
        <Button asChild className="mt-6" size="lg">
          <Link href="/search">Browse products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="h2-bold py-4">Your cart</h1>
      <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
        <ul className="divide-y border-y" aria-label="Cart items">
          {cart.items.map((item) => (
            <li key={item.slug} className="flex gap-4 py-5">
              <Link
                href={`/product/${item.slug}`}
                className="shrink-0 overflow-hidden rounded photo-panel"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={96}
                  height={96}
                  className="size-24 object-contain"
                />
              </Link>
              <div className="flex flex-1 flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <Link
                    href={`/product/${item.slug}`}
                    className="font-medium underline-offset-4 hover:underline"
                  >
                    {item.name}
                  </Link>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {formatCurrency(item.price)} each
                  </p>
                </div>
                <div className="flex items-center justify-between gap-6 sm:justify-end">
                  <div className="flex items-center gap-2">
                    <Button
                      disabled={isPending}
                      variant="outline"
                      size="icon"
                      type="button"
                      aria-label={`Remove one ${item.name}`}
                      onClick={() =>
                        changeQuantity(() => removeItemFromCart(item.productId))
                      }
                    >
                      {isPending ? (
                        <Loader className="size-4 animate-spin" />
                      ) : (
                        <Minus className="size-4" />
                      )}
                    </Button>
                    <span
                      className="min-w-6 text-center font-medium"
                      aria-label={`Quantity ${item.quantity}`}
                    >
                      {item.quantity}
                    </span>
                    <Button
                      disabled={isPending}
                      variant="outline"
                      size="icon"
                      type="button"
                      aria-label={`Add one more ${item.name}`}
                      onClick={() => changeQuantity(() => addItemToCart(item))}
                    >
                      {isPending ? (
                        <Loader className="size-4 animate-spin" />
                      ) : (
                        <Plus className="size-4" />
                      )}
                    </Button>
                  </div>
                  <p className="w-28 text-right font-display font-semibold">
                    {formatCurrency(Number(item.price) * item.quantity)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-md bg-card p-6 ring-1 ring-border">
          <h2 className="font-display text-lg font-semibold">Order summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">
                Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
              </dt>
              <dd className="font-medium">{formatCurrency(cart.itemsPrice)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd className="font-medium">
                {missingForFreeShipping === 0
                  ? "Free"
                  : formatCurrency(cart.shippingPrice)}
              </dd>
            </div>
          </dl>
          {missingForFreeShipping > 0 && (
            <p className="mt-4 rounded bg-secondary px-3 py-2 text-sm text-secondary-foreground">
              Add {formatCurrency(missingForFreeShipping)} more for free
              shipping.
            </p>
          )}
          <p className="mt-4 text-xs text-muted-foreground">
            Taxes are calculated at checkout.
          </p>
          <Button
            className="mt-6 w-full"
            size="lg"
            disabled={isPending}
            onClick={() =>
              startTransition(() => router.push("/shipping-address"))
            }
          >
            {isPending && <Loader className="size-4 animate-spin" />}
            Go to checkout
          </Button>
        </aside>
      </div>
    </div>
  );
};

export default CartTable;
