import ModeToggle from "./mode-toggle";
import UserButton from "./user-button";
import CartButton from "./cart-button";

const Menu = () => {
  return (
    <nav aria-label="Account" className="flex items-center gap-1">
      <ModeToggle />
      <CartButton />
      <UserButton />
    </nav>
  );
};

export default Menu;
