import { auth } from "@/auth";
import { Metadata } from "next";
import { getOrderById } from "@/lib/actions/order.actions";
import { notFound } from "next/navigation";
import OrderDetailsTable from "./order-details-table";
import { ShippingAddressProps } from "@/types";

export const metadata: Metadata = {
  title: "Order Details",
};

const OrderDetailsPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const order = await getOrderById(id);
  if (!order || "success" in order) notFound();

  const session = await auth();

  return (
    <div>
      <OrderDetailsTable
        order={{
          ...order,
          shippingAddress: order.shippingAddress as ShippingAddressProps,
        }}
        paypalClientId={(process.env.PAYPAL_CLIENT_ID as string) || "sb"}
        isAdmin={session?.user?.role === "admin" || false}
      />
    </div>
  );
};

export default OrderDetailsPage;
