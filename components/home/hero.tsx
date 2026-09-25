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
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  };

  const slide = heroSlides[current];

  return (
    <section className="mx-auto mt-4 max-w-7xl px-3 sm:mt-6 sm:px-4">
      <div className="relative overflow-hidden rounded-2xl bg-[#f7f3f7] sm:rounded-3xl">

        <div className="grid items-center gap-4 px-5 py-6 sm:gap-8 sm:px-8 sm:py-10 lg:grid-cols-2 lg:gap-10 lg:px-16 lg:py-12">

          {/* Left Content */}

          <div className="space-y-3 sm:space-y-5 lg:space-y-6">

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#5B214B] sm:text-sm sm:tracking-[0.35em]">
              Ramani Collection
            </p>

            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-6xl">
              {slide.title}
            </h1>

            <h2 className="text-lg font-medium text-[#5B214B] sm:text-xl lg:text-2xl">
              {slide.subtitle}
            </h2>

            <p className="max-w-xl text-sm leading-6 text-gray-600 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
              {slide.description}
            </p>

            <Link
              href="/products"
              className="inline-block rounded-lg bg-[#5B214B] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#431736] sm:rounded-xl sm:px-8 sm:py-4 sm:text-base"
            >
              {slide.button}
            </Link>

          </div>

          {/* Right Image */}

          <div className="relative mx-auto aspect-[4/3] w-full max-w-[260px] sm:max-w-sm lg:aspect-square lg:max-w-md">

            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              sizes="(max-width:640px)80vw,(max-width:1024px)50vw,40vw"
              className="object-contain"
            />

          </div>

        </div>

        {/* Left Arrow */}

        <button
          onClick={previousSlide}
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition hover:scale-110 sm:left-5 sm:p-3"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Right Arrow */}

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition hover:scale-110 sm:right-5 sm:p-3"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Dots */}

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-6 sm:gap-3">

          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition sm:h-3 sm:w-3 ${
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