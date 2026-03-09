import { Decimal } from "@prisma/client/runtime/client";

export default interface ProductProps {
  name: string;
  slug: string;
  category: string;
  description: string;
  images: string[];
  price: Decimal;
  brand: string;
  rating: Decimal;
  numReviews?: number;
  stock: number;
  isFeatured?: boolean;
  banner: string | null;
}