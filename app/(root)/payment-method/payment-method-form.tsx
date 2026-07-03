"use client";

import { useRouter } from "next/router";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { paymentMethodSchema } from "@/lib/validators";
import { updateUserPaymentMethod } from "@/lib/actions/user.actions";
import CheckoutSteps from "@/components/shared/checkout-steps";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DEFAULT_PAYMENT_METHOD } from "@/lib/constants";

const PaymentMethodForm = ({
  preferredPaymentMethod,
}: {
  preferredPaymentMethod: string | null;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof paymentMethodSchema>>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: preferredPaymentMethod || DEFAULT_PAYMENT_METHOD,
    },
  });

  return (
    <div>
      <CheckoutSteps current={2} />
      <h1>Payment Method</h1>
    </div>
  );
};

export default PaymentMethodForm;
