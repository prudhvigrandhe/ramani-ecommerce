"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/lib/data/hero-slides";

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const previousSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? heroSlides.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent((prev) =>
      (prev + 1) % heroSlides.length
    );
  };

  const slide = heroSlides[current];

  return (
    <section className="mx-auto mt-6 max-w-7xl px-4">
      <div className="relative overflow-hidden rounded-3xl bg-[#f7f3f7]">

        <div className="grid items-center gap-10 px-8 py-12 lg:grid-cols-2 lg:px-16">

          {/* Left Content */}

          <div className="space-y-6">

            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#5B214B]">
              Ramani Collection
            </p>

            <h1 className="text-5xl font-bold leading-tight lg:text-6xl">
              {slide.title}
            </h1>

            <h2 className="text-2xl font-medium text-[#5B214B]">
              {slide.subtitle}
            </h2>

            <p className="max-w-xl text-lg leading-8 text-gray-600">
              {slide.description}
            </p>

            <Link
              href="/products"
              className="inline-block rounded-xl bg-[#5B214B] px-8 py-4 font-semibold text-white transition hover:bg-[#431736]"
            >
              {slide.button}
            </Link>

          </div>

          {/* Right Image */}

          <div className="relative mx-auto aspect-square w-full max-w-md">

            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              sizes="(max-width:1024px)100vw,40vw"
              className="object-contain"
            />

          </div>

        </div>

        {/* Left Arrow */}

        <button
          onClick={previousSlide}
          className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition hover:scale-110"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Right Arrow */}

        <button
          onClick={nextSlide}
          className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition hover:scale-110"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Dots */}

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">

          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-3 w-3 rounded-full transition ${
                current === index
                  ? "bg-[#5B214B]"
                  : "bg-gray-300"
              }`}
            />
          ))}

        </div>

      </div>
    </section>
  );
}