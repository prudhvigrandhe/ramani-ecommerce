export default function Newsletter() {
    return (
      <section className="mx-auto mt-20 max-w-7xl px-4">
        <div className="rounded-3xl bg-[#5B214B] px-8 py-14 text-center text-white">
  
          <p className="text-sm uppercase tracking-[0.35em] opacity-80">
            Stay Connected
          </p>
  
          <h2 className="mt-3 text-4xl font-bold">
            Never Miss a New Collection
          </h2>
  
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Subscribe to receive updates about new arrivals,
            festive collections and exclusive offers.
          </p>
  
          <div className="mx-auto mt-8 flex max-w-xl flex-col gap-4 sm:flex-row">
  
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-xl px-5 py-4 text-black outline-none"
            />
  
            <button className="rounded-xl bg-white px-8 py-4 font-semibold text-[#5B214B] transition hover:scale-105">
              Subscribe
            </button>
  
          </div>
  
        </div>
      </section>
    );
  }