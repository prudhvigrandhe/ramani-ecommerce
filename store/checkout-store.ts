import { create } from "zustand";

type CheckoutState = {
  customerName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;

  setField: (field: keyof Omit<
    CheckoutState,
    "setField" | "reset"
  >, value: string) => void;

  reset: () => void;
};

export const useCheckoutStore = create<CheckoutState>((set) => ({
  customerName: "",
  phone: "",
  email: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",

  setField: (field, value) =>
    set((state) => ({
      ...state,
      [field]: value,
    })),

  reset: () =>
    set({
      customerName: "",
      phone: "",
      email: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
    }),
}));