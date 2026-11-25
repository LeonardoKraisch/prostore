import { RotateCcw, Truck, WalletCards } from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "Free shipping over R$100",
    text: "Orders below that ship for a flat R$10.",
  },
  {
    icon: RotateCcw,
    title: "30-day returns",
    text: "Wrong size? Send it back within 30 days of delivery.",
  },
  {
    icon: WalletCards,
    title: "Pay your way",
    text: "Card via Stripe, PayPal or cash on delivery.",
  },
];

const IconBoxes = () => {
  return (
    <section className="my-16 grid gap-8 border-y py-8 md:grid-cols-3 md:gap-0 md:divide-x">
      {services.map(({ icon: Icon, title, text }) => (
        <div key={title} className="flex gap-4 md:px-8 md:first:pl-0">
          <Icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{text}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default IconBoxes;
