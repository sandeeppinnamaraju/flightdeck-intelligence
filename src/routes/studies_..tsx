
// ============================================================
// Milestones popover
// ============================================================
interface MilestoneRow {
  code: string;
  label: string;
  planned: string;
  actual: string;
}

function parseDate(s: string): Date | null {
  if (!s || s === "—") return null;
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

function fmt(d: Date): string {
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function addMonths(d: Date, m: number): Date {
  const x = new Date(d);
  x.setMonth(x.getMonth() + m);
  return x;
}

function buildMilestones(detail: StudyDetail): MilestoneRow[] {
  const plannedFPI = parseDate(detail.plannedFPI);
  const actualFPI = parseDate(detail.actualFPI);
  const plannedLPI = parseDate(detail.plannedLPI);

  const fsaPlanned = plannedFPI ? addMonths(plannedFPI, -3) : null;
  const fsaActual = actualFPI ? addMonths(actualFPI, -2) : null;
  const dblPlanned = plannedLPI ? addMonths(plannedLPI, 5) : null;
  const rcPlanned = plannedLPI ? addMonths(plannedLPI, 10) : null;

  return [
    { code: "FSA",  label: "First Site Activated",   planned: fsaPlanned ? fmt(fsaPlanned) : "—", actual: fsaActual ? fmt(fsaActual) : "—" },
    { code: "FSFV", label: "First Subject First Visit", planned: detail.plannedFPI, actual: detail.actualFPI },
    { code: "LSFV", label: "Last Subject First Visit",  planned: detail.plannedLPI, actual: "—" },
    { code: "DBL",  label: "Database Lock",          planned: dblPlanned ? fmt(dblPlanned) : "—", actual: "—" },
    { code: "RC",   label: "Report Complete",         planned: rcPlanned ? fmt(rcPlanned) : "—", actual: "—" },
  ];
}

function variance(planned: string, actual: string): { text: string; tone: "neutral" | "ok" | "warn" | "bad" } {
  if (!actual || actual === "—") return { text: "Pending", tone: "neutral" };
  const p = parseDate(planned);
  const a = parseDate(actual);
  if (!p || !a) return { text: "—", tone: "neutral" };
  const diff = Math.round((a.getTime() - p.getTime()) / 86400000);
  if (diff <= 0) return { text: "On time", tone: "ok" };
  if (diff <= 14) return { text: `+${diff}d`, tone: "warn" };
  return { text: `+${diff}d`, tone: "bad" };
}

function MilestonesPopover({ detail }: { detail: StudyDetail }) {
  const rows = buildMilestones(detail);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="inline-flex items-center gap-1.5 rounded-md border border-input bg-card px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted">
          <Calendar className="h-4 w-4" /> Milestones
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[520px] rounded-xl border border-border bg-card p-5 shadow-card">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Key Milestone Dates
        </h3>
        <div className="mt-4 overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/60 text-xs font-semibold text-muted-foreground">
                <th className="px-3 py-2 text-left">Milestone</th>
                <th className="px-3 py-2 text-left">Planned</th>
                <th className="px-3 py-2 text-left">Actual</th>
                <th className="px-3 py-2 text-left">Variance</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const v = variance(r.planned, r.actual);
                const toneCls =
                  v.tone === "ok" ? "text-success-foreground"
                  : v.tone === "warn" ? "text-warning-foreground"
                  : v.tone === "bad" ? "text-danger-foreground"
                  : "text-muted-foreground";
                return (
                  <tr key={r.code} className="border-t border-border">
                    <td className="px-3 py-2.5 align-top">
                      <span className="font-semibold text-foreground">{r.code}</span>
                      <span className="text-muted-foreground"> — {r.label}</span>
                    </td>
                    <td className="px-3 py-2.5 align-top tabular-nums text-foreground">{r.planned || "—"}</td>
                    <td className="px-3 py-2.5 align-top tabular-nums text-foreground">{r.actual || "—"}</td>
                    <td className={cn("px-3 py-2.5 align-top text-sm font-medium tabular-nums", toneCls)}>{v.text}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </PopoverContent>
    </Popover>
  );
}
