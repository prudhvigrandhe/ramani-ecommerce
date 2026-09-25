import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "Dresses",
    image: "/images/categories/dresses.png",
  },
  {
    title: "Sarees",
    image: "/images/categories/sarees.png",
  },
  {
    title: "Kurtas",
    image: "/images/categories/kurtas.png",
  },
  {
    title: "Tops",
    image: "/images/categories/tops.png",
  },
];

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-[1600px] px-3 py-12 sm:px-4 sm:py-16 lg:py-24">
      <div className="mb-8 text-center sm:mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#5B214B] sm:text-sm sm:tracking-[0.3em]">
          Shop By Category
        </p>

        <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:mt-3 sm:text-4xl">
          Find Your Style
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4 xl:gap-10">
        {categories.map((category) => (
          <Link
            key={category.title}
            href={`/products?category=${encodeURIComponent(category.title)}`}
            className="group"
          >
            <div className="overflow-hidden rounded-2xl border bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl sm:rounded-3xl">
              <div className="relative aspect-[4/5]">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width:640px)50vw,(max-width:1024px)50vw,25vw"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="bg-white py-3 text-center sm:py-5">
                <h3 className="text-base font-semibold text-gray-900 sm:text-xl">
                  {category.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}