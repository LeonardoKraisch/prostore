import { z } from "zod";
import {
  insertProductSchema,
  insertCartSchema,
  cartItemSchema,
  shippingAddressSchema,
  insertOrderItemSchema,
  insertOrderSchema,
  paymentResultSchema,
} from "../lib/validators";

export type ProductProps = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  numReviews: number;
  createdAt: Date;
};

export type CartProps = z.infer<typeof insertCartSchema>;
export type CartItemProps = z.infer<typeof cartItemSchema>;
export type ShippingAddressProps = z.infer<typeof shippingAddressSchema>;
export type OrderItemProps = z.infer<typeof insertOrderItemSchema>;
export type OrderProps = z.infer<typeof insertOrderSchema> & {
  id: string;
  createdAt: Date;
  isPaid: boolean;
  paidAt: Date | null;
  isDelivered: boolean;
  deliveredAt: Date | null;
  orderItems: OrderItemProps[];
  user: {
    name: string;
    email: string;
  };
};
export type PaymentResultProps = z.infer<typeof paymentResultSchema>;
