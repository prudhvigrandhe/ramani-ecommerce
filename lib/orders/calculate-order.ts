import { CartItem } from "@/store/cart-store";

const SHIPPING_CHARGE = 0;

export function calculateOrder(cartItems: CartItem[]) {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shippingCharge = SHIPPING_CHARGE;

  const total = subtotal + shippingCharge;

  return {
    subtotal,
    shippingCharge,
    total,
  };
}