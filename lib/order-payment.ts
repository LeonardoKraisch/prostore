import "server-only";
import { prisma } from "@/db/prisma";
import { PaymentResultProps, ShippingAddressProps } from "@/types";
import { sendPurchaseReceipt } from "@/email";

/**
 * Marca um pedido como pago e baixa o estoque.
 * NÃO é uma server action: só deve ser chamada por código do servidor
 * que já validou o pagamento (webhook da Stripe, captura do PayPal, admin).
 */
export async function markOrderAsPaid({
  orderId,
  paymentResult,
}: {
  orderId: string;
  paymentResult?: PaymentResultProps;
}) {
  const order = await prisma.order.findFirst({
    where: { id: orderId },
    include: { orderItems: true },
  });
  if (!order) throw new Error("Order not found");
  if (order.isPaid) throw new Error("Order is already paid");

  await prisma.$transaction(async (tx) => {
    for (const item of order.orderItems) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    await tx.order.update({
      where: { id: orderId },
      data: { isPaid: true, paidAt: new Date(), paymentResult },
    });
  });

  const updatedOrder = await prisma.order.findFirst({
    where: { id: orderId },
    include: {
      orderItems: true,
      user: { select: { name: true, email: true } },
    },
  });
  if (!updatedOrder) throw new Error("Order not found");

  try {
    await sendPurchaseReceipt({
      order: {
        ...updatedOrder,
        shippingAddress: updatedOrder.shippingAddress as ShippingAddressProps,
        paymentResult: updatedOrder.paymentResult as PaymentResultProps,
      },
    });
  } catch (error) {
    // O pagamento já foi registrado; uma falha no e-mail não deve desfazê-lo.
    console.error("Failed to send purchase receipt:", error);
  }

  return updatedOrder;
}
