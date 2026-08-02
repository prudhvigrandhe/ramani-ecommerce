import { supabase } from "@/lib/supabase";
import { CartItem } from "@/store/cart-store";
import { calculateOrder } from "./calculate-order";

export type CustomerDetails = {
  customerName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
};

export async function placeOrder(
  customer: CustomerDetails,
  cartItems: CartItem[]
) {
  if (cartItems.length === 0) {
    throw new Error("Cart is empty");
  }

  const { subtotal, shippingCharge, total } =
    calculateOrder(cartItems);

  // Create Order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      customer_name: customer.customerName,
      phone: customer.phone,
      email: customer.email || null,
      address_line1: customer.addressLine1,
      address_line2: customer.addressLine2 || null,
      city: customer.city,
      state: customer.state,
      pincode: customer.pincode,

      subtotal,
      shipping: shippingCharge,
      tax: 0,
      total,

      payment_method: "Online",
      payment_status: "Paid",
      order_status: "Confirmed",

      order_number: "TEMP",
    })
    .select()
    .single();

  if (orderError) throw orderError;

  const orderNumber = `RM${String(order.id).padStart(6, "0")}`;

  // Update order number
  const { error: updateError } = await supabase
    .from("orders")
    .update({
      order_number: orderNumber,
    })
    .eq("id", order.id);

  if (updateError) throw updateError;

  // Create Order Items
  const orderItems = cartItems.map((item) => ({
    order_id: order.id,

    product_id: item.id,
    product_name: item.name,
    product_image: item.image,

    quantity: item.quantity,
    size: item.size,

    price: item.price,
    subtotal: item.price * item.quantity,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) throw itemsError;

  return {
    success: true,
    orderId: order.id,
    orderNumber,
  };
}