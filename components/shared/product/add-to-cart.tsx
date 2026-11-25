"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, Minus, Loader } from "lucide-react";
import { CartProps, CartItemProps } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { useTransition } from "react";

const AddToCart = ({
  cart,
  item,
}: {
  cart?: CartProps;
  item: CartItemProps;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    startTransition(async () => {
      const response = await addItemToCart(item);
      if (!response.success) {
        toast({
          variant: "destructive",
          description: response.message,
        });
        return;
      }
      toast({
        description: response.message,
        action: (
          <ToastAction
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            altText="View cart"
            onClick={() => router.push("/cart")}
          >
            View cart
          </ToastAction>
        ),
      });
    });
  };

  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const response = await removeItemFromCart(item.productId);
      toast({
        variant: response.success ? "default" : "destructive",
        description: response.message,
      });
      return;
    });
  };

  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);
  return existItem ? (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="icon"
        type="button"
        onClick={handleRemoveFromCart}
        aria-label="Remove one"
      >
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Minus className="h-4 w-4" />
        )}
      </Button>
      <span className="min-w-6 text-center font-medium" aria-live="polite">
        {existItem.quantity}
      </span>
      <Button
        variant="outline"
        size="icon"
        type="button"
        onClick={handleAddToCart}
        aria-label="Add one more"
      >
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button
      className="w-full"
      size="lg"
      type="button"
      onClick={handleAddToCart}
      disabled={isPending}
    >
      {isPending && <Loader className="h-4 w-4 animate-spin" />}
      Add to cart
    </Button>
  );
};

export default AddToCart;
