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
// Verify latest inventory before placing order
const unavailableItems: {
    id: number;
    size: string;
    name: string;
  }[] = [];

for (const item of cartItems) {
  const { data: product, error } = await supabase
    .from("products")
    .select("available_sizes")
    .eq("id", item.id)
    .single();

  if (error) {
    throw error;
  }

  const availableSizes = product.available_sizes || [];

  if (!availableSizes.includes(item.size)) {
    unavailableItems.push({
        id: item.id,
        size: item.size,
        name: item.name,
      });
  }
}

if (unavailableItems.length > 0) {
    const error = new Error("OUT_OF_STOCK");
(error as any).items = unavailableItems;

throw error;
}

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
      payment_status: "Pending",
order_status: "Pending",

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