import { createFileRoute, Link } from "@tanstack/react-router";
import { LayoutGrid, Search, ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flight Deck — Clinical Trials Intelligence" },
      { name: "description", content: "Pilot every protocol with confidence. Real-time visibility across your entire clinical portfolio." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <main className="mx-auto max-w-[1600px] px-6 py-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-card to-card p-10 shadow-card md:p-16">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-info/20 blur-3xl" />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Welcome to Flight Deck
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Pilot every protocol with precision — from first patient in to final readout.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Unified clinical trial intelligence that turns enrollment signals, site performance, and protocol risk into the decisions that move medicine forward.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-card transition-colors hover:bg-primary/90"
            >
              <LayoutGrid className="h-4 w-4" />
              Open Study Portfolio
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/protocol-search"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <Search className="h-4 w-4" />
              Protocol Search
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
