"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { CartItemProps } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { addItemToCart } from "@/lib/actions/cart.actions";

const AddToCart = ({ item }: { item: CartItemProps }) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleAddToCart = async () => {
    const response = await addItemToCart(item);
    if (!response.success) {
      toast({
        variant: "destructive",
        description: response.message,
      });
      return;
    }
    toast({
      description: `${item.name} added to cart`,
      action: (
        <ToastAction
          className="bg-primary text-white hover:bg-gray-800"
          altText="View Cart"
          onClick={() => router.push("/cart")}
        >
          View Cart
        </ToastAction>
      ),
    });
  };
  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      <Plus /> Add to Cart
    </Button>
  );
};

export default AddToCart;
