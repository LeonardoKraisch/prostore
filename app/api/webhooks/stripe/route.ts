import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { updateOrderToPaid } from "@/lib/actions/order.actions";

export async function POST(req: NextRequest) {
  const event = Stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature")!,
    process.env.STRIPE_WEBHOOK_SECRET!,
  );

  if (event.type === "charge.succeeded") {
    const { object } = event.data;
    await updateOrderToPaid({
      orderId: object.metadata.orderId as string,
      paymentResult: {
        id: object.id,
        status: "COMPLETED",
        email: object.billing_details.email!,
        pricePaid: (object.amount / 100).toFixed(),
      },
    });
    return NextResponse.json({
      message: "Update order to Paid was successful",
    });
  }

  return NextResponse.json({ message: "event is not charge.succeeded" });
}
