import { createFileRoute, Link } from "@tanstack/react-router";
import { LayoutGrid, Search, Activity, ArrowRight, Sparkles } from "lucide-react";

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

      {/* Quick-access tiles */}
      <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Link
          to="/portfolio"
          className="group rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <LayoutGrid className="h-5 w-5" />
          </div>
          <h3 className="mt-4 text-base font-semibold text-foreground">Study Portfolio</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Track every active study, enrollment health, and performance at a glance.
          </p>
        </Link>

        <Link
          to="/protocol-search"
          className="group rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10 text-info">
            <Search className="h-5 w-5" />
          </div>
          <h3 className="mt-4 text-base font-semibold text-foreground">Protocol Search</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Discover precedent protocols, endpoints, and design patterns across the industry.
          </p>
        </Link>

        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success">
            <Activity className="h-5 w-5" />
          </div>
          <h3 className="mt-4 text-base font-semibold text-foreground">Live Signals</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            30 active studies · 12,932 patients enrolled · 90.1% schedule adherence.
          </p>
        </div>
      </section>
    </main>
  );
}
