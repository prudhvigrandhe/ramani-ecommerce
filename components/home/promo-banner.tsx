import Image from "next/image";
import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="mx-auto max-w-[1600px] px-4 py-24">
      <div className="relative overflow-hidden rounded-3xl shadow-xl">
        <div className="relative aspect-[16/5]">
          <Image
            src="/images/banners/festival-banner.png"
            alt="Festival Collection"
            fill
            priority={false}
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/20" />

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-xl px-8 md:px-16 text-white">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em]">
                Limited Time
              </p>

              <h2 className="text-3xl font-bold md:text-5xl">
                Celebrate Every Occasion
              </h2>

              <p className="mt-5 text-base md:text-lg text-white/90">
                Discover exclusive festive styles curated for elegance,
                comfort, and unforgettable moments.
              </p>

              <Link
                href="/products"
                className="mt-8 inline-block rounded-xl bg-white px-8 py-4 font-semibold text-[#5B214B] transition hover:bg-gray-100"
              >
                Shop Collection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}