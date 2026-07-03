import { Metadata } from "next";
import { auth } from "@/auth";
import { getUserById } from "@/lib/actions/user.actions";
import PaymentMethodForm from "./payment-method-form";

export const metadata: Metadata = {
  title: "Select Payment Method",
};

const PaymentMethodPage = async () => {
  const session = await auth();
  const user = session?.user?.id ? await getUserById(session.user.id) : null;

  if (!user) {
    throw new Error("User not found");
  }

  return (
    <div>
      <PaymentMethodForm
        preferredPaymentMethod={user.paymentMethod}
      ></PaymentMethodForm>
    </div>
  );
};

export default PaymentMethodPage;
