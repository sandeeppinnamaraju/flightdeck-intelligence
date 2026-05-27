import { createFileRoute, Link } from "@tanstack/react-router";
import {
  LayoutGrid,
  Search,
  ArrowRight,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Globe2,
  FlaskConical,
  Activity,
} from "lucide-react";
import { studies } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flight Deck — Portfolio Insights" },
      { name: "description", content: "Real-time insights across your clinical trial portfolio." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  // Derived insights
  const total = studies.length;
  const recruiting = studies.filter((s) => s.status === "Recruiting").length;
  const planned = studies.filter((s) => s.status === "Planned").length;
  const onTrack = studies.filter((s) => s.performance === "On Track").length;
  const atRisk = studies.filter((s) => s.performance === "At Risk").length;
  const offTrack = studies.filter((s) => s.performance === "Off Track").length;

  const targetSum = studies.reduce((a, s) => a + s.target, 0);
  const actualSum = studies.reduce((a, s) => a + s.actual, 0);
  const enrollmentPct = Math.round((actualSum / targetSum) * 100);

  const sitesSum = studies.reduce((a, s) => a + s.sites, 0);
  const countriesMax = Math.max(...studies.map((s) => s.countries));

  // Therapeutic area breakdown
  const taMap = new Map<string, { count: number; actual: number; target: number }>();
  studies.forEach((s) => {
    const e = taMap.get(s.therapeuticArea) ?? { count: 0, actual: 0, target: 0 };
    e.count += 1;
    e.actual += s.actual;
    e.target += s.target;
    taMap.set(s.therapeuticArea, e);
  });
  const taBreakdown = Array.from(taMap.entries())
    .map(([name, v]) => ({ name, ...v, pct: Math.round((v.actual / Math.max(v.target, 1)) * 100) }))
    .sort((a, b) => b.count - a.count);

  // Top attention studies (Off Track, sorted by target gap)
  const attention = studies
    .filter((s) => s.performance === "Off Track" || s.performance === "At Risk")
    .sort((a, b) => (b.target - b.actual) - (a.target - a.actual))
    .slice(0, 5);

  const kpis = [
    {
      label: "Active studies",
      value: total.toString(),
      sub: `${recruiting} recruiting · ${planned} planned`,
      icon: FlaskConical,
      tone: "primary" as const,
    },
    {
      label: "Enrollment vs plan",
      value: `${enrollmentPct}%`,
      sub: `${actualSum.toLocaleString()} of ${targetSum.toLocaleString()} participants`,
      icon: TrendingUp,
      tone: "success" as const,
    },
    {
      label: "Studies on track",
      value: onTrack.toString(),
      sub: `${atRisk} at risk · ${offTrack} off track`,
      icon: CheckCircle2,
      tone: "success" as const,
    },
    {
      label: "Global footprint",
      value: sitesSum.toLocaleString(),
      sub: `Sites across up to ${countriesMax} countries`,
      icon: Globe2,
      tone: "info" as const,
    },
  ];

  return (
    <main className="relative min-h-[calc(100vh-3.5rem)] overflow-hidden bg-gradient-to-br from-background via-background to-accent/30">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-[-15%] left-[-10%] h-[520px] w-[520px] rounded-full bg-info/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 py-8 lg:py-10">
        {/* Header */}
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Portfolio Insights · Live
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Welcome back to{" "}
              <span className="bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
                Flight Deck
              </span>
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground lg:text-base">
              Today's snapshot across every study, site, and signal in your portfolio.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              to="/portfolio"
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-card transition-all hover:bg-primary/90 hover:shadow-card-hover"
            >
              <LayoutGrid className="h-4 w-4" />
              Open Study Portfolio
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/protocol-search"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <Search className="h-4 w-4" />
              Protocol Search
            </Link>
          </div>
        </section>

        {/* KPI grid */}
        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((k) => (
            <div
              key={k.label}
              className="rounded-2xl border border-border bg-card p-5 shadow-card transition hover:shadow-card-hover"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {k.label}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-foreground">{k.value}</p>
                </div>
                <span
                  className={
                    "inline-flex h-9 w-9 items-center justify-center rounded-lg " +
                    (k.tone === "success"
                      ? "bg-success-bg text-success-foreground"
                      : k.tone === "info"
                        ? "bg-accent text-accent-foreground"
                        : "bg-primary/10 text-primary")
                  }
                >
                  <k.icon className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">{k.sub}</p>
            </div>
          ))}
        </section>

        {/* Insights row */}
        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
          {/* Therapeutic area breakdown */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-foreground">Therapeutic Area Mix</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Study count and enrollment progress by TA
                </p>
              </div>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </div>
            <ul className="mt-5 space-y-4">
              {taBreakdown.map((ta) => (
                <li key={ta.name}>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{ta.name}</span>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                        {ta.count} {ta.count === 1 ? "study" : "studies"}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-foreground">{ta.pct}%</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-info"
                      style={{ width: `${Math.min(ta.pct, 100)}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {ta.actual.toLocaleString()} / {ta.target.toLocaleString()} participants enrolled
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Attention list */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-foreground">Needs Attention</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Studies with the largest enrollment gap
                </p>
              </div>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </div>
            <ul className="mt-4 divide-y divide-border">
              {attention.map((s) => {
                const gap = s.target - s.actual;
                const isOff = s.performance === "Off Track";
                return (
                  <li key={s.id} className="py-3">
                    <Link
                      to="/studies/$studyId"
                      params={{ studyId: s.id }}
                      className="group block"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-foreground group-hover:text-primary">
                            {s.program} · {s.indication}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {s.phase} · {s.therapeuticArea} · {s.sites} sites
                          </p>
                        </div>
                        <span
                          className={
                            "inline-flex flex-shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold " +
                            (isOff
                              ? "bg-danger-bg text-danger-foreground"
                              : "bg-warning-bg text-warning-foreground")
                          }
                        >
                          <span
                            className={
                              "h-1.5 w-1.5 rounded-full " + (isOff ? "bg-danger" : "bg-warning")
                            }
                          />
                          {s.performance}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          {s.actual} / {s.target} enrolled
                        </span>
                        <span className="font-semibold text-foreground">−{gap} gap</span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
