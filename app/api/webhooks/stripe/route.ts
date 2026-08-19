/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { updateOrderToPaid } from "@/lib/actions/order.actions";

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event;

  // 1. Envelopar a validação em um try...catch
  try {
    event = Stripe.webhooks.constructEvent(
      payload,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err: any) {
    console.error(`⚠️ Erro na verificação do Webhook:`, err.message);
    // Retornar o erro 400 permite que você leia a mensagem no painel da Stripe
    return NextResponse.json(
      { message: `Webhook Error: ${err.message}` },
      { status: 400 },
    );
  }

  // 2. Processar o evento com outro try...catch para proteger seu banco de dados
  if (event.type === "charge.succeeded") {
    try {
      const { object } = event.data as any;

      await updateOrderToPaid({
        orderId: object.metadata.orderId as string,
        paymentResult: {
          id: object.id,
          status: "COMPLETED",
          email: object.billing_details?.email || "",
          pricePaid: (object.amount / 100).toFixed(),
        },
      });

      return NextResponse.json(
        { message: "Update order to Paid was successful" },
        { status: 200 },
      );
    } catch (dbError: any) {
      console.error(`⚠️ Erro ao atualizar pedido:`, dbError.message);
      return NextResponse.json(
        { message: `Database Error: ${dbError.message}` },
        { status: 500 },
      );
    }
  }

  // Retornar 200 para eventos não monitorados para que a Stripe não tente reenviar
  return NextResponse.json(
    { message: `Evento ignorado: ${event.type}` },
    { status: 200 },
  );
}
