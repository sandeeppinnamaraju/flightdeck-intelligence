import { createFileRoute, Link } from "@tanstack/react-router";
import { LayoutGrid, Search, ArrowRight, FlaskConical } from "lucide-react";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Flight Deck — Home" },
      { name: "description", content: "Flight Deck — the operating cockpit for clinical operations." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const tiles = [
    {
      to: "/portfolio" as const,
      title: "Study Portfolio",
      description:
        "Browse every active and planned study with live enrollment, site coverage, and performance signals in one place.",
      icon: LayoutGrid,
    },
    {
      to: "/protocol-search" as const,
      title: "Protocol Search",
      description:
        "Search across protocols to find precedents, eligibility patterns, and design intelligence for your next study.",
      icon: Search,
    },
  ];

  return (
    <main className="relative min-h-[calc(100vh-3.5rem)] overflow-hidden bg-gradient-to-br from-background via-background to-accent/30">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-[-15%] left-[-10%] h-[520px] w-[520px] rounded-full bg-info/15 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-[1100px] flex-col items-center px-6 py-16 lg:py-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <FlaskConical className="h-3.5 w-3.5" />
          Flight Deck
        </span>
        <h1 className="mt-5 text-center text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
            Flight Deck
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-center text-base text-muted-foreground lg:text-lg">
          The operating cockpit for clinical operations. Pick where you want to go next.
        </p>

        <section className="mt-12 grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
          {tiles.map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.to}
                to={t.to}
                className="group relative flex flex-col rounded-2xl border border-border bg-card p-8 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card-hover"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </span>
                <h2 className="mt-5 text-xl font-bold text-foreground">{t.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.description}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Open
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
}
