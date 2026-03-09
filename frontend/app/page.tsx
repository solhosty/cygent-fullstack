import Link from "next/link";

export default function HomePage() {
  return (
    <main className="pt-10 sm:pt-16">
      <section className="rounded-3xl border border-white/10 bg-black/35 p-8 shadow-glow backdrop-blur-xl sm:p-12">
        <p className="font-display text-sm uppercase tracking-[0.2em] text-accent">Cygent</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight text-white sm:text-6xl">
          Secure whitelist claims with owner-controlled emergency safeguards
        </h1>
        <p className="mt-6 max-w-2xl text-base text-slate-200 sm:text-lg">
          This app ships a Merkle-proof ETH claim flow with replay protection, pause control,
          configurable claim amounts, and dedicated admin operations.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/claim"
            className="rounded-xl bg-accent px-5 py-3 font-semibold text-slate-950 transition hover:brightness-110"
          >
            Go to Claim
          </Link>
          <Link
            href="/admin"
            className="rounded-xl border border-white/25 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Open Admin Panel
          </Link>
        </div>
      </section>
    </main>
  );
}
