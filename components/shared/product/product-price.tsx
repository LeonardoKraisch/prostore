import { cn } from "@/lib/utils";

const ProductPrice = ({
  price,
  className,
}: {
  price: number;
  className?: string;
}) => {
  const stringPrice = price.toFixed(2);
  const [dollars, cents] = stringPrice.split(".");

  return (
    <p className={cn("text-2xl", className)}>
      <span className="text-xs align-super">$</span>
      {dollars}
      <span className="text-xs align-super">.{cents}</span>
    </p>
  );
};

export default ProductPrice;
