import {
    Truck,
    ShieldCheck,
    RotateCcw,
    BadgeCheck,
  } from "lucide-react";
  
  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free delivery on orders above ₹999.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payments",
      description: "100% safe and encrypted checkout.",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "Simple 7-day return policy.",
    },
    {
      icon: BadgeCheck,
      title: "Premium Quality",
      description: "Handpicked styles with trusted quality.",
    },
  ];
  
  export default function WhyChooseUs() {
    return (
      <section className="bg-[#faf7f9] py-24">
        <div className="mx-auto max-w-[1600px] px-4">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#5B214B]">
              Why Choose Ramani
            </p>
  
            <h2 className="mt-3 text-4xl font-bold">
              Shopping Made Better
            </h2>
          </div>
  
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
  
              return (
                <div
                  key={feature.title}
                  className="rounded-3xl bg-white p-8 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#5B214B]/10">
                    <Icon className="h-8 w-8 text-[#5B214B]" />
                  </div>
  
                  <h3 className="mt-6 text-xl font-semibold">
                    {feature.title}
                  </h3>
  
                  <p className="mt-3 text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }