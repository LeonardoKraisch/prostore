"use server";

import { CartItemProps } from "@/types";

export async function addItemToCart(data: CartItemProps) {
  return {
    success: true,
    message: "Item added to cart",
  };
}
