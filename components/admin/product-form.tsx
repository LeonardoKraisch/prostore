"use client";

import { ProductProps } from "@/types";
import { insertProductSchema } from "@/lib/validators";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { productDefaultValues } from "@/lib/constants";
import { Form } from "../ui/form";

const ProductForm = ({
  type,
  product,
  productId,
}: {
  type: "Create" | "Update";
  product?: ProductProps;
  productId?: string;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.input<typeof insertProductSchema>>({
    resolver: zodResolver(insertProductSchema),
    defaultValues:
      product && type === "Update" ? product : productDefaultValues,
  });

  return (
    <Form {...form}>
      <form action="" className="space-y-8">
        <div className="flex flex-col md:flex-row gap-5">
          {/* {name, slug} */}
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          {/* {category, brand} */}
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          {/* {price, stock} */}
        </div>
        <div className="upload-field flex flex-col md:flex-row gap-5">
          {/* {images} */}
        </div>
        <div className="upload-field">{/* {isFeatured} */}</div>
        <div>{/* {description} */}</div>
        <div>{/* {banner} */}</div>
      </form>
    </Form>
  );
};

export default ProductForm;
