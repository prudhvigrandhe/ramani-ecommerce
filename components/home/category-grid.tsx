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
    <section className="mx-auto max-w-[1600px] px-4 py-24">
      <div className="mb-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#5B214B]">
          Shop By Category
        </p>

        <h2 className="mt-3 text-4xl font-bold text-gray-900">
          Find Your Style
        </h2>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-10">
        {categories.map((category) => (
          <Link
            key={category.title}
            href={`/products?category=${encodeURIComponent(category.title)}`}
            className="group"
          >
            <div className="overflow-hidden rounded-3xl border bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="relative aspect-[3/4]">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width:768px)100vw,25vw"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="bg-white py-5 text-center">
                <h3 className="text-xl font-semibold text-gray-900">
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