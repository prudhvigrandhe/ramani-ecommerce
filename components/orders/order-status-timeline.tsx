"use client";

import {
  Check,
  Package,
  Truck,
  CircleCheck,
  XCircle,
} from "lucide-react";

type Props = {
  status: string;
};

const steps = [
  {
    key: "Confirmed",
    label: "Order Confirmed",
    icon: Check,
  },
  {
    key: "Packed",
    label: "Packed",
    icon: Package,
  },
  {
    key: "Shipped",
    label: "Shipped",
    icon: Truck,
  },
  {
    key: "Delivered",
    label: "Delivered",
    icon: CircleCheck,
  },
];

export default function OrderStatusTimeline({
  status,
}: Props) {
  if (status === "Cancelled") {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
            <XCircle className="h-5 w-5" />
          </div>

          <div>
            <p className="font-semibold text-red-700">
              Order Cancelled
            </p>

            <p className="mt-1 text-sm text-red-600">
              This order has been cancelled.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentIndex =
    status === "Pending"
      ? -1
      : steps.findIndex((step) => step.key === status);

  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="text-xl font-bold">
        Order Status
      </h2>

      <div className="mt-6">
        {/* Desktop */}
        <div className="hidden md:flex">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const completed = index <= currentIndex;
            const active = index === currentIndex;

            return (
              <div
                key={step.key}
                className="flex flex-1 items-start"
              >
                <div className="flex flex-1 flex-col items-center">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full border-2 ${
                      completed
                        ? "border-[#5B214B] bg-[#5B214B] text-white"
                        : "border-gray-300 bg-white text-gray-400"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <p
                    className={`mt-3 text-center text-sm font-medium ${
                      active || completed
                        ? "text-[#5B214B]"
                        : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={`mt-5 h-0.5 flex-1 ${
                      index < currentIndex
                        ? "bg-[#5B214B]"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile */}
        <div className="space-y-5 md:hidden">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const completed = index <= currentIndex;
            const active = index === currentIndex;

            return (
              <div
                key={step.key}
                className="flex items-center gap-4"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${
                    completed
                      ? "border-[#5B214B] bg-[#5B214B] text-white"
                      : "border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <p
                    className={`font-medium ${
                      active || completed
                        ? "text-[#5B214B]"
                        : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </p>

                  {active && (
                    <p className="mt-1 text-sm text-gray-500">
                      Your order is currently at this stage.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {status === "Pending" && (
        <p className="mt-5 text-sm text-gray-500">
          Your payment has been received. We&apos;ll confirm
          your order shortly.
        </p>
      )}
    </div>
  );
}