import { z } from "zod";
import {
  insertProductSchema,
  insertCartSchema,
  cartItemSchema,
  shippingAddressSchema
} from "../lib/validators";

export type ProductProps = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
};

export type CartProps = z.infer<typeof insertCartSchema>;
export type CartItemProps = z.infer<typeof cartItemSchema>;
export type ShippingAddressProps = z.infer<typeof shippingAddressSchema>;
