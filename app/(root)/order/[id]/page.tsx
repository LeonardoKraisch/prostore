import { auth } from "@/auth";
import { Metadata } from "next";
import { getOrderById } from "@/lib/actions/order.actions";
import { notFound } from "next/navigation";
import OrderDetailsTable from "./order-details-table";
import { ShippingAddressProps } from "@/types";
import Stripe from "stripe";

export const metadata: Metadata = {
  title: "Order Details",
};

const OrderDetailsPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const order = await getOrderById(id);
  if (!order || "success" in order) notFound();

  const session = await auth();

  let client_secret = null;

  if (order.paymentMethod === "Stripe" && !order.isPaid) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(order.totalPrice) * 100),
      currency: "brl",
      metadata: { orderId: order.id },
    });

    client_secret = paymentIntent.client_secret as string;
  }

  return (
    <div>
      <OrderDetailsTable
        order={{
          ...order,
          shippingAddress: order.shippingAddress as ShippingAddressProps,
        }}
        stripeClientSecret={client_secret}
        paypalClientId={(process.env.PAYPAL_CLIENT_ID as string) || "sb"}
        isAdmin={session?.user?.role === "admin" || false}
      />
    </div>
  );
};

export default OrderDetailsPage;
