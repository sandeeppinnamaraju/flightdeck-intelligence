import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Calendar, TrendingDown, TrendingUp, ChevronRight } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, CartesianGrid, Legend,
} from "recharts";
import { studies } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const Route = createFileRoute("/studies/$studyId")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.studyId} — Study Overview — Flight Deck` },
      { name: "description", content: "Detailed study overview including enrollment, performance, and country breakdown." },
    ],
  }),
  component: StudyOverviewPage,
});

const detailMap: Record<string, StudyDetail> = {
  "ST-2024-003": {
    asset: "OMP-770",
    assetLead: "Dr. Lisa Miller",
    fsoModel: "Full Service Outsourcing (FSO) · Hybrid",
    sponsor: "ApexBio Research",
    designation: "Fast Track",
    targetEnrollment: 148,
    plannedFPI: "28 Mar 2024",
    actualFPI: "27 Mar 2024",
    plannedLPI: "30 Sept 2029",
    forecastLPI: "—",
    enrollmentVsPlan: 106.5,
    enrollmentActual: 49,
    enrollmentPlan: 46,
    rateActual: 0.5,
    ratePlan: 0.4,
    screenFailureRate: 17.3,
    dropoutRate: 3.6,
    sitesActivated: 24,
    sitesPlanned: 24,
    countriesActivated: 6,
    countriesPlanned: 6,
    countries: [
      { name: "Canada", target: 31, actual: 27, pct: 87.1, sitesActive: 2, avgRate: 3.4, status: "At Risk" },
      { name: "France", target: 18, actual: 0, pct: 0.0, sitesActive: 2, avgRate: 0.0, status: "Off Track" },
      { name: "Mexico", target: 31, actual: 16, pct: 51.6, sitesActive: 5, avgRate: 0.9, status: "Off Track" },
      { name: "New Zealand", target: 22, actual: 0, pct: 0.0, sitesActive: 3, avgRate: 0.0, status: "Off Track" },
      { name: "South Korea", target: 17, actual: 0, pct: 0.0, sitesActive: 6, avgRate: 0.0, status: "Off Track" },
      { name: "Sweden", target: 29, actual: 0, pct: 0.0, sitesActive: 6, avgRate: 0.0, status: "Off Track" },
    ],
    sites: [
      { id: "S0001", name: "CANA-Cancer Center", country: "Canada", target: 20, actual: 16, pct: 80.0, status: "ON HOLD" },
      { id: "S0002", name: "CANA-Research Institute", country: "Canada", target: 11, actual: 11, pct: 100.0, status: "SCREENING" },
      { id: "S0008", name: "FRAN-General Hospital", country: "France", target: 10, actual: 0, pct: 0.0, status: "ON HOLD" },
      { id: "S0009", name: "FRAN-Medical Center", country: "France", target: 8, actual: 0, pct: 0.0, status: "SCREENING" },
      { id: "S0005", name: "MEXI-Cancer Center", country: "Mexico", target: 6, actual: 3, pct: 50.0, status: "ON HOLD" },
      { id: "S0003", name: "MEXI-Clinical Center", country: "Mexico", target: 8, actual: 8, pct: 100.0, status: "ON HOLD" },
      { id: "S0006", name: "MEXI-Medical Center", country: "Mexico", target: 7, actual: 0, pct: 0.0, status: "SCREENING" },
      { id: "S0004", name: "MEXI-Research Institute", country: "Mexico", target: 6, actual: 5, pct: 83.3, status: "ON HOLD" },
      { id: "S0007", name: "MEXI-University Hospital", country: "Mexico", target: 4, actual: 0, pct: 0.0, status: "CLOSED" },
      { id: "S0017", name: "NEW-Clinical Center", country: "New Zealand", target: 6, actual: 0, pct: 0.0, status: "SCREENING" },
      { id: "S0016", name: "NEW-Health System", country: "New Zealand", target: 9, actual: 0, pct: 0.0, status: "CLOSED" },
      { id: "S0018", name: "NEW-Medical Center", country: "New Zealand", target: 7, actual: 0, pct: 0.0, status: "SCREENING" },
      { id: "S0024", name: "SOUT-Clinical Center", country: "South Korea", target: 3, actual: 0, pct: 0.0, status: "ON HOLD" },
      { id: "S0023", name: "SOUT-General Hospital", country: "South Korea", target: 3, actual: 0, pct: 0.0, status: "ON HOLD" },
      { id: "S0019", name: "SOUT-Health System", country: "South Korea", target: 2, actual: 0, pct: 0.0, status: "CLOSED" },
      { id: "S0020", name: "SOUT-Research Institute", country: "South Korea", target: 3, actual: 0, pct: 0.0, status: "CLOSED" },
      { id: "S0021", name: "SOUT-Research Institute", country: "South Korea", target: 3, actual: 0, pct: 0.0, status: "ON HOLD" },
      { id: "S0022", name: "SOUT-University Hospital", country: "South Korea", target: 3, actual: 0, pct: 0.0, status: "SCREENING" },
      { id: "S0014", name: "SWED-Cancer Center", country: "Sweden", target: 6, actual: 0, pct: 0.0, status: "ON HOLD" },
      { id: "S0013", name: "SWED-Cancer Center", country: "Sweden", target: 3, actual: 0, pct: 0.0, status: "ON HOLD" },
      { id: "S0011", name: "SWED-Cancer Center", country: "Sweden", target: 5, actual: 0, pct: 0.0, status: "ON HOLD" },
      { id: "S0010", name: "SWED-Clinical Center", country: "Sweden", target: 4, actual: 0, pct: 0.0, status: "ON HOLD" },
      { id: "S0012", name: "SWED-General Hospital", country: "Sweden", target: 5, actual: 0, pct: 0.0, status: "ON HOLD" },
      { id: "S0015", name: "SWED-Research Institute", country: "Sweden", target: 6, actual: 0, pct: 0.0, status: "ON HOLD" },
    ],
    underperformingTop: {
      shortfall: [
        { rank: 1, name: "NETH-University Hospital", value: "-23 pts" },
        { rank: 2, name: "POLA-Medical Center", value: "-18 pts" },
        { rank: 3, name: "POLA-Research Institute", value: "-15 pts" },
      ],
      pctBelow: [
        { rank: 1, name: "NETH-University Hospital", value: "-100%" },
        { rank: 2, name: "POLA-Medical Center", value: "-100%" },
        { rank: 3, name: "POLA-Research Institute", value: "-100%" },
      ],
    },
    overperformingTop: {
      shortfall: [
        { rank: 1, name: "CANA-Research Institute", value: "+11 pts" },
        { rank: 2, name: "MEXI-Clinical Center", value: "+8 pts" },
        { rank: 3, name: "CANA-Cancer Center", value: "+3 pts" },
      ],
      pctBelow: [
        { rank: 1, name: "CANA-Research Institute", value: "+100%" },
        { rank: 2, name: "MEXI-Clinical Center", value: "+100%" },
        { rank: 3, name: "MEXI-Research Institute", value: "+83%" },
      ],
    },
  },
};

interface SiteRow {
  id: string; name: string; country: string; target: number; actual: number; pct: number;
  status: "ON HOLD" | "SCREENING" | "CLOSED" | "ENROLLING";
}
interface PerfList { rank: number; name: string; value: string }
interface PerfGroups { shortfall: PerfList[]; pctBelow: PerfList[] }

interface StudyDetail {
  asset: string;
  assetLead: string;
  fsoModel: string;
  sponsor: string;
  designation: string;
  targetEnrollment: number;
  plannedFPI: string;
  actualFPI: string;
  plannedLPI: string;
  forecastLPI: string;
  enrollmentVsPlan: number;
  enrollmentActual: number;
  enrollmentPlan: number;
  rateActual: number;
  ratePlan: number;
  screenFailureRate: number;
  dropoutRate: number;
  sitesActivated: number;
  sitesPlanned: number;
  countriesActivated: number;
  countriesPlanned: number;
  countries: Array<{
    name: string; target: number; actual: number; pct: number;
    sitesActive: number; avgRate: number; status: "On Track" | "At Risk" | "Off Track";
  }>;
  sites?: SiteRow[];
  underperformingTop?: PerfGroups;
  overperformingTop?: PerfGroups;
}

function cumulativeData(target: number, actual: number) {
  const months = ["Mar 24", "Oct 24", "May 25", "Dec 25", "Jul 26", "Feb 27", "Sept 27", "Apr 28", "Nov 28", "Jun 29"];
  return months.map((m, i) => {
    const t = i / (months.length - 1);
    const s = 1 / (1 + Math.exp(-6 * (t - 0.45)));
    const planned = Math.round(target * s);
    const forecast = Math.round(target * s * 0.98);
    const a = i <= 4 ? Math.round(actual * (i / 4)) : null;
    return { month: m, planned, forecast, actual: a };
  });
}

function rateData() {
  const months = ["Mar 24","May 24","Jul 24","Sept 24","Nov 24","Jan 25","Mar 25","May 25","Jul 25","Sept 25","Nov 25","Jan 26","Mar 26","May 26"];
  return months.map((m, i) => ({
    month: m,
    actual: [2,0,1,1,1,1,2,1,2,3,3,2,1,3][i] ?? 0,
    planned: [1,1,1,1,1,1,2,2,2,3,3,2,3,5][i] ?? 0,
  }));
}

function StudyOverviewPage() {
  const { studyId } = Route.useParams();
  const study = studies.find((s) => s.id === studyId);
  const detail = detailMap[studyId] ?? {
    asset: study?.program ?? "—",
    assetLead: "—",
    fsoModel: "—",
    sponsor: "—",
    designation: "—",
    targetEnrollment: study?.target ?? 0,
    plannedFPI: "—", actualFPI: "—", plannedLPI: "—", forecastLPI: "—",
    enrollmentVsPlan: study?.percentVsPlan ?? 0,
    enrollmentActual: study?.actual ?? 0,
    enrollmentPlan: Math.round((study?.actual ?? 0) * 0.95),
    rateActual: 0, ratePlan: 0,
    screenFailureRate: 0, dropoutRate: 0,
    sitesActivated: study?.sites ?? 0, sitesPlanned: study?.sites ?? 0,
    countriesActivated: study?.countries ?? 0, countriesPlanned: study?.countries ?? 0,
    countries: [],
  } satisfies StudyDetail;

  const [range, setRange] = useState<"full" | "since" | "last3">("full");
  const [view, setView] = useState<"country" | "site">("country");

  if (!study) {
    return (
      <main className="mx-auto max-w-[1600px] px-6 py-12 text-center">
        <p className="text-muted-foreground">Study not found.</p>
        <Link to="/studies" className="mt-4 inline-block text-primary hover:underline">← Back to Studies</Link>
      </main>
    );
  }

  const cumulative = cumulativeData(detail.targetEnrollment, detail.enrollmentActual);
  const rates = rateData();
  const perfColor =
    study.performance === "On Track" ? "bg-success-bg text-success-foreground"
    : study.performance === "At Risk" ? "bg-warning-bg text-warning-foreground"
    : study.performance === "Off Track" ? "bg-danger-bg text-danger-foreground"
    : "bg-muted text-muted-foreground";

  return (
    <main className="mx-auto max-w-[1600px] px-6 py-6">
      <Link to="/studies" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back to Studies
      </Link>

      <section className="mt-4 rounded-xl border border-border bg-card p-6 shadow-card border-l-4 border-l-success">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-mono font-semibold text-primary">{study.id}</span>
              <span className="rounded-md bg-accent px-2 py-0.5 font-semibold text-accent-foreground">{study.phase}</span>
              <span className="rounded-full bg-info-bg px-2.5 py-0.5 font-semibold uppercase tracking-wide text-info-foreground">
                {study.status}
              </span>
              <span className="rounded-full border border-border px-2.5 py-0.5 text-muted-foreground">
                {study.priority} Priority
              </span>
              <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-medium", perfColor)}>
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                {study.performance}
              </span>
            </div>
            <h1 className="mt-3 text-2xl font-bold leading-tight text-foreground">{study.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {study.indication} · {study.therapeuticArea} · {study.portfolio.replace(" Portfolio", "")} & Hematology
            </p>
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-md border border-input bg-card px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted">
            <Calendar className="h-4 w-4" /> Milestones
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-5">
          <MetaField label="Asset" value={detail.asset} />
          <MetaField label="Asset Lead" value={detail.assetLead} />
          <MetaField label="FSO Model" value={detail.fsoModel} />
          <MetaField label="Study Sponsor" value={detail.sponsor} />
          <MetaField label="Designation" value={detail.designation} />

          <MetaField label="Target Enrollment" value={String(detail.targetEnrollment)} />
          <MetaField label="Planned FPI" value={detail.plannedFPI} />
          <MetaField label="Actual FPI" value={detail.actualFPI} />
          <MetaField label="Planned LPI" value={detail.plannedLPI} />
          <MetaField label="Forecast LPI" value={detail.forecastLPI} />
        </div>
      </section>

      <section className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        <KpiTile
          label="Enrollment vs Plan"
          value={`${detail.enrollmentVsPlan}%`}
          progress={Math.min(100, detail.enrollmentVsPlan)}
          footer={[`Actual: ${detail.enrollmentActual}`, `Plan: ${detail.enrollmentPlan}`]}
          tone="success"
        />
        <KpiTile
          label="Enrollment Rate"
          value={`${detail.rateActual}`}
          valueSuffix="pts/wk"
          progress={detail.ratePlan ? Math.min(100, (detail.rateActual / detail.ratePlan) * 100) : 0}
          footer={[`Actual: ${detail.rateActual}`, `Plan: ${detail.ratePlan}`]}
          tone="success"
        />
        <KpiTile label="Screen Failure Rate" value={`${detail.screenFailureRate}%`} />
        <KpiTile label="Dropout Rate" value={`${detail.dropoutRate}%`} />
        <KpiTile
          label="Sites Activated"
          value={String(detail.sitesActivated)}
          valueSuffix={`/ ${detail.sitesPlanned}`}
          progress={(detail.sitesActivated / detail.sitesPlanned) * 100}
          footer={[`Actual: ${detail.sitesActivated}`, `Plan: ${detail.sitesPlanned}`]}
          tone="success"
        />
        <KpiTile
          label="Countries Activated"
          value={String(detail.countriesActivated)}
          valueSuffix={`/ ${detail.countriesPlanned}`}
          progress={(detail.countriesActivated / detail.countriesPlanned) * 100}
          footer={[`Actual: ${detail.countriesActivated}`, `Plan: ${detail.countriesPlanned}`]}
          tone="success"
        />
      </section>

      <div className="mt-6 inline-flex rounded-lg bg-muted p-1">
        {[
          { id: "full", label: "Full Study" },
          { id: "since", label: "Since FPI" },
          { id: "last3", label: "Last 3 Months" },
        ].map((p) => (
          <button
            key={p.id}
            onClick={() => setRange(p.id as typeof range)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              range === p.id ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      <section className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="CUMULATIVE ENROLLMENT">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={cumulative} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid stroke="oklch(0.91 0.01 255)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "oklch(0.5 0.02 260)" }} />
              <YAxis tick={{ fontSize: 11, fill: "oklch(0.5 0.02 260)" }} />
              <Tooltip />
              <Legend iconType="plainline" wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="actual" name="Actual" stroke="oklch(0.45 0.2 263)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="forecast" name="Forecast" stroke="oklch(0.55 0.14 170)" strokeWidth={2} strokeDasharray="5 4" dot={false} />
              <Line type="monotone" dataKey="planned" name="Planned" stroke="oklch(0.7 0.08 200)" strokeWidth={2} strokeDasharray="2 3" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="ENROLLMENT RATE" subtitle="(per month)">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={rates} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid stroke="oklch(0.91 0.01 255)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "oklch(0.5 0.02 260)" }} />
              <YAxis tick={{ fontSize: 11, fill: "oklch(0.5 0.02 260)" }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="actual" name="Actual" fill="oklch(0.45 0.2 263)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="planned" name="Planned" fill="oklch(0.75 0.1 263)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="mt-2 text-xs text-muted-foreground">
            <span className="mr-1 inline-block h-2 w-2 rounded-sm bg-danger" />
            Red bars indicate periods below plan
          </p>
        </ChartCard>
      </section>

      <section className="mt-5">
        <div className="flex items-center justify-between">
          <div className="inline-flex rounded-lg bg-muted p-1">
            <button
              onClick={() => setView("country")}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                view === "country" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground",
              )}
            >
              By Country
            </button>
            <button
              onClick={() => setView("site")}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                view === "site" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground",
              )}
            >
              By Site
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md border border-danger/30 bg-danger-bg/50 px-2.5 py-1 text-xs font-medium text-danger-foreground">
              <TrendingDown className="h-3.5 w-3.5" /> Underperforming
            </span>
            <span className="inline-flex items-center gap-1 rounded-md border border-success/30 bg-success-bg/50 px-2.5 py-1 text-xs font-medium text-success-foreground">
              <TrendingUp className="h-3.5 w-3.5" /> Overperforming
            </span>
          </div>
        </div>

        <div className="mt-3 rounded-xl border border-border bg-card shadow-card">
          <div className="border-b border-border px-5 py-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {view === "country" ? "Country Breakdown" : "Site Breakdown"}
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs font-semibold text-muted-foreground">
                  <th className="px-4 py-3 font-medium" />
                  <th className="px-4 py-3 font-medium">{view === "country" ? "Country" : "Site"}</th>
                  <th className="px-4 py-3 text-right font-medium">Target</th>
                  <th className="px-4 py-3 text-right font-medium">Actual</th>
                  <th className="px-4 py-3 text-right font-medium">% Enrolled</th>
                  <th className="px-4 py-3 text-right font-medium">Sites Active</th>
                  <th className="px-4 py-3 text-right font-medium">Avg Rate</th>
                  <th className="px-4 py-3 text-center font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {detail.countries.map((c) => {
                  const sColor =
                    c.status === "On Track" ? "bg-success-bg text-success-foreground"
                    : c.status === "At Risk" ? "bg-warning-bg text-warning-foreground"
                    : "bg-danger-bg text-danger-foreground";
                  const dotColor =
                    c.status === "On Track" ? "bg-success"
                    : c.status === "At Risk" ? "bg-warning"
                    : "bg-danger";
                  return (
                    <tr key={c.name} className="border-b border-border/60 last:border-0 hover:bg-muted/40">
                      <td className="px-4 py-3 text-muted-foreground">
                        <ChevronRight className="h-4 w-4" />
                      </td>
                      <td className="px-4 py-3 font-medium text-foreground">{c.name}</td>
                      <td className="px-4 py-3 text-right tabular-nums text-foreground">{c.target}</td>
                      <td className="px-4 py-3 text-right tabular-nums text-foreground">{c.actual}</td>
                      <td className="px-4 py-3 text-right tabular-nums text-foreground">{c.pct.toFixed(1)}%</td>
                      <td className="px-4 py-3 text-right tabular-nums text-foreground">{c.sitesActive}</td>
                      <td className="px-4 py-3 text-right tabular-nums text-foreground">{c.avgRate.toFixed(1)}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium", sColor)}>
                          <span className={cn("h-1.5 w-1.5 rounded-full", dotColor)} />
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {detail.countries.length === 0 && (
                  <tr><td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">No breakdown data available.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 truncate text-sm font-medium text-foreground" title={value}>{value}</p>
    </div>
  );
}

function KpiTile({
  label, value, valueSuffix, progress, footer, tone,
}: {
  label: string; value: string; valueSuffix?: string;
  progress?: number; footer?: string[]; tone?: "success";
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-card">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-bold tabular-nums text-foreground">
        {value}
        {valueSuffix && <span className="ml-1 text-sm font-medium text-muted-foreground">{valueSuffix}</span>}
      </p>
      {progress != null && (
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={cn("h-full rounded-full", tone === "success" ? "bg-success" : "bg-primary")}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}
      {footer && (
        <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>{footer[0]}</span><span>{footer[1]}</span>
        </div>
      )}
    </div>
  );
}

function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title} {subtitle && <span className="ml-1 normal-case tracking-normal text-muted-foreground/70">{subtitle}</span>}
      </h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}
