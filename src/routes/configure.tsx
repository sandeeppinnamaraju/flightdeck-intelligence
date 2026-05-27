import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Info, TrendingUp, AlertTriangle, TrendingDown } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/configure")({
  head: () => ({
    meta: [
      { title: "Configure — Flight Deck" },
      { name: "description", content: "Configure performance status thresholds for studies, countries, and sites." },
    ],
  }),
  component: ConfigurePage,
});

const STORAGE_KEY = "flightdeck.thresholds";

interface Thresholds {
  onTrack: number;
  atRiskFrom: number;
}

const DEFAULTS: Thresholds = { onTrack: 95, atRiskFrom: 80 };

function loadThresholds(): Thresholds {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as Partial<Thresholds>;
    return {
      onTrack: typeof parsed.onTrack === "number" ? parsed.onTrack : DEFAULTS.onTrack,
      atRiskFrom: typeof parsed.atRiskFrom === "number" ? parsed.atRiskFrom : DEFAULTS.atRiskFrom,
    };
  } catch {
    return DEFAULTS;
  }
}

function ConfigurePage() {
  const [onTrack, setOnTrack] = useState<number>(DEFAULTS.onTrack);
  const [atRiskFrom, setAtRiskFrom] = useState<number>(DEFAULTS.atRiskFrom);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const t = loadThresholds();
    setOnTrack(t.onTrack);
    setAtRiskFrom(t.atRiskFrom);
  }, []);

  const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
  const safeOnTrack = clamp(Number.isFinite(onTrack) ? onTrack : 95, 1, 100);
  const safeAtRiskFrom = clamp(
    Number.isFinite(atRiskFrom) ? atRiskFrom : 80,
    1,
    Math.max(1, safeOnTrack - 1),
  );
  const offTrackMax = safeAtRiskFrom;

  function handleSave() {
    setSaving(true);
    const payload: Thresholds = { onTrack: safeOnTrack, atRiskFrom: safeAtRiskFrom };
    setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        toast.success("Configuration saved");
      } catch {
        toast.error("Could not save configuration");
      } finally {
        setSaving(false);
      }
    }, 400);
  }

  return (
    <main className="mx-auto max-w-[1600px] px-6 py-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Performance Status Thresholds</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Define how <span className="font-semibold text-foreground">% Enrollment vs Plan</span> maps to a study's performance status across the portfolio dashboard and study overview pages.
        </p>
      </header>

      <div className="mt-6 flex items-start gap-3 rounded-lg border border-info/30 bg-info-bg/60 px-4 py-3 text-sm text-info-foreground">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <p>Thresholds apply globally. Changes will affect the performance status badge on every study, country, and site view.</p>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {/* On Track */}
        <section className="rounded-xl border border-success/40 bg-success-bg/40 p-5 shadow-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success-bg px-2.5 py-1 text-xs font-semibold text-success-foreground">
            <TrendingUp className="h-3.5 w-3.5" /> On Track
          </span>
          <p className="mt-3 text-sm text-muted-foreground">
            A study is <span className="font-semibold text-foreground">On Track</span> when its cumulative enrollment meets or exceeds the scheduled plan.
          </p>
          <div className="mt-5 flex items-end gap-3">
            <span className="pb-2 text-sm text-muted-foreground">More than</span>
            <div className="flex-1">
              <label className="block text-center text-xs font-medium text-muted-foreground">Minimum threshold</label>
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={onTrack}
                  onChange={(e) => setOnTrack(Number(e.target.value))}
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-center text-base font-semibold text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
                />
                <span className="text-sm text-muted-foreground">%</span>
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm font-medium text-success-foreground">
            Enrollment vs Plan ≥ {safeOnTrack}%
          </p>
        </section>

        {/* At Risk */}
        <section className="rounded-xl border border-warning/40 bg-warning-bg/40 p-5 shadow-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-warning-bg px-2.5 py-1 text-xs font-semibold text-warning-foreground">
            <AlertTriangle className="h-3.5 w-3.5" /> At Risk
          </span>
          <p className="mt-3 text-sm text-muted-foreground">
            A study is <span className="font-semibold text-foreground">At Risk</span> when enrollment is below plan but within an acceptable tolerance.
          </p>
          <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-end gap-3">
            <div>
              <label className="block text-xs font-medium text-muted-foreground">From</label>
              <div className="mt-1 flex items-center gap-1.5">
                <input
                  type="number"
                  min={1}
                  max={safeOnTrack - 1}
                  value={atRiskFrom}
                  onChange={(e) => setAtRiskFrom(Number(e.target.value))}
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-center text-base font-semibold text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
                />
                <span className="text-sm text-muted-foreground">%</span>
              </div>
            </div>
            <span className="pb-2.5 text-sm text-muted-foreground">to</span>
            <div>
              <label className="block text-xs font-medium text-muted-foreground">To (auto)</label>
              <div className="mt-1 flex items-center gap-1.5">
                <input
                  type="text"
                  readOnly
                  value={`<${safeOnTrack}`}
                  className="h-10 w-full rounded-md border border-dashed border-input bg-muted px-3 text-center text-sm font-semibold text-muted-foreground"
                />
                <span className="text-sm text-muted-foreground">%</span>
              </div>
              <p className="mt-1 text-center text-[11px] text-muted-foreground">Derived from On Track</p>
            </div>
          </div>
          <p className="mt-4 text-sm font-medium text-warning-foreground">
            Enrollment vs Plan ≥{safeAtRiskFrom}% and &lt;{safeOnTrack}%
          </p>
        </section>

        {/* Off Track */}
        <section className="rounded-xl border border-destructive/30 bg-danger-bg/40 p-5 shadow-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-danger-bg px-2.5 py-1 text-xs font-semibold text-danger-foreground">
            <TrendingDown className="h-3.5 w-3.5" /> Off Track
          </span>
          <p className="mt-3 text-sm text-muted-foreground">
            A study is <span className="font-semibold text-foreground">Off Track</span> when enrollment has fallen significantly behind the planned schedule.
          </p>
          <div className="mt-5 flex items-end gap-3">
            <span className="pb-2 text-sm text-muted-foreground">Less than</span>
            <div className="flex-1">
              <label className="block text-center text-xs font-medium text-muted-foreground">Threshold (auto)</label>
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={offTrackMax}
                  className="h-10 w-full rounded-md border border-dashed border-input bg-muted px-3 text-center text-base font-semibold text-muted-foreground"
                />
                <span className="text-sm text-muted-foreground">%</span>
              </div>
              <p className="mt-1 text-center text-[11px] text-muted-foreground">Matches At Risk from</p>
            </div>
          </div>
          <p className="mt-4 text-sm font-medium text-danger-foreground">
            Enrollment vs Plan &lt; {offTrackMax}%
          </p>
        </section>
      </div>

      {/* Threshold Band Preview */}
      <section className="mt-6 rounded-xl border border-border bg-card p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-foreground">Threshold Band Preview</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Live preview of how the 0–100% enrollment range is divided by the current settings.
        </p>
        <div className="mt-4">
          <div className="relative flex h-6 w-full overflow-hidden rounded-full ring-1 ring-border">
            <div
              className="h-full bg-[oklch(0.7_0.15_25)]"
              style={{ width: `${offTrackMax}%` }}
            />
            <div
              className="h-full bg-[oklch(0.82_0.16_85)]"
              style={{ width: `${Math.max(0, safeOnTrack - offTrackMax)}%` }}
            />
            <div
              className="h-full bg-[oklch(0.68_0.15_150)]"
              style={{ width: `${Math.max(0, 100 - safeOnTrack)}%` }}
            />
          </div>
          <div className="relative mt-2 h-4 text-[11px] text-muted-foreground">
            <span className="absolute left-0">0%</span>
            <span className="absolute -translate-x-1/2" style={{ left: `${offTrackMax}%` }}>{offTrackMax}%</span>
            <span className="absolute -translate-x-1/2" style={{ left: `${safeOnTrack}%` }}>{safeOnTrack}%</span>
            <span className="absolute right-0">100%</span>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-[oklch(0.7_0.15_25)]" />
            Off Track (&lt;{offTrackMax}%)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-[oklch(0.82_0.16_85)]" />
            At Risk (≥{safeAtRiskFrom}% and &lt;{safeOnTrack}%)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-[oklch(0.68_0.15_150)]" />
            On Track (≥{safeOnTrack}%)
          </span>
        </div>
      </section>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save configuration"}
        </button>
      </div>
    </main>
  );
}
