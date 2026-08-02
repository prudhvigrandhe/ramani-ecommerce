import { Instagram } from "lucide-react";

export default function InstagramGallery() {
  return (
    <section className="mx-auto mt-20 max-w-7xl px-4">

      <div className="rounded-3xl border bg-gradient-to-r from-[#5B214B] to-[#7A2E63] px-8 py-16 text-center text-white">

        <Instagram className="mx-auto h-12 w-12" />

        <h2 className="mt-6 text-4xl font-bold">
          Follow Ramani Ethnics
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
          Stay updated with our latest collections, styling inspiration,
          behind-the-scenes moments and exclusive launches.
        </p>

        <a
          href="https://www.instagram.com/ramani.ethnics/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 font-semibold text-[#5B214B] transition hover:scale-105"
        >
          <Instagram className="h-5 w-5" />
          Follow @ramani.ethnics
        </a>

      </div>

    </section>
  );
}