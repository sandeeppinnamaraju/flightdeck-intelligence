import { Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { ChevronsUpDown, Columns3, Check } from "lucide-react";
import type { Study } from "@/lib/data";
import { PriorityBadge, PerformanceBadge } from "./badges";

interface Props {
  studies: Study[];
}

const COLUMNS = [
  { key: "id", label: "Study ID" },
  { key: "phase", label: "Phase" },
  { key: "therapeuticArea", label: "Therapeutic Area" },
  { key: "indication", label: "Indication" },
  { key: "portfolio", label: "Portfolio / Program" },
  { key: "status", label: "Status" },
  { key: "priority", label: "Priority" },
  { key: "target", label: "Target" },
  { key: "actual", label: "Actual" },
  { key: "percent", label: "% vs Plan" },
  { key: "countries", label: "Countries" },
  { key: "sites", label: "Sites" },
  { key: "performance", label: "Performance" },
] as const;

type ColKey = (typeof COLUMNS)[number]["key"];

export function StudyTable({ studies }: Props) {
  const [visible, setVisible] = useState<Record<ColKey, boolean>>(
    () => Object.fromEntries(COLUMNS.map((c) => [c.key, true])) as Record<ColKey, boolean>,
  );
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const show = (k: ColKey) => visible[k];
  const toggle = (k: ColKey) =>
    setVisible((v) => ({ ...v, [k]: !v[k] }));

  return (
    <div className="rounded-xl border border-border bg-card shadow-card">
      <div className="flex items-center justify-end border-b border-border px-4 py-2.5">
        <div ref={ref} className="relative">
          <button
            onClick={() => setOpen((o) => !o)}
            className="inline-flex items-center gap-1.5 rounded-md border border-input px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted"
          >
            <Columns3 className="h-3.5 w-3.5" />
            Columns
          </button>
          {open && (
            <div className="absolute right-0 z-20 mt-1 w-56 rounded-md border border-border bg-popover p-1 shadow-md">
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                Toggle columns
              </div>
              {COLUMNS.map((c) => (
                <button
                  key={c.key}
                  onClick={() => toggle(c.key)}
                  className="flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-sm text-foreground hover:bg-muted"
                >
                  <span>{c.label}</span>
                  {visible[c.key] && <Check className="h-3.5 w-3.5 text-primary" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {COLUMNS.filter((c) => visible[c.key]).map((c) => (
                <th key={c.key} className="whitespace-nowrap px-4 py-3 font-semibold">
                  <span className="inline-flex items-center gap-1">
                    {c.label}
                    {(c.key === "percent" || c.key === "performance") && (
                      <ChevronsUpDown className="h-3 w-3" />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {studies.map((s) => (
              <tr
                key={s.id}
                className="border-b border-border/60 transition-colors last:border-0 hover:bg-muted/40"
              >
                {show("id") && (
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-semibold text-primary">
                    <Link to="/studies/$studyId" params={{ studyId: s.id }} className="hover:underline">
                      {s.id}
                    </Link>
                  </td>
                )}
                {show("phase") && <td className="whitespace-nowrap px-4 py-3 text-foreground">{s.phase}</td>}
                {show("therapeuticArea") && <td className="whitespace-nowrap px-4 py-3 text-foreground">{s.therapeuticArea}</td>}
                {show("indication") && (
                  <td className="max-w-[200px] truncate px-4 py-3 text-foreground" title={s.indication}>
                    {s.indication}
                  </td>
                )}
                {show("portfolio") && (
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                    {s.portfolio} / <span className="font-mono text-xs">{s.program}</span>
                  </td>
                )}
                {show("status") && <td className="whitespace-nowrap px-4 py-3 text-foreground">{s.status}</td>}
                {show("priority") && <td className="whitespace-nowrap px-4 py-3"><PriorityBadge value={s.priority} /></td>}
                {show("target") && <td className="px-4 py-3 text-right tabular-nums text-foreground">{s.target.toLocaleString()}</td>}
                {show("actual") && <td className="px-4 py-3 text-right tabular-nums text-foreground">{s.actual.toLocaleString()}</td>}
                {show("percent") && (
                  <td className="px-4 py-3 text-right font-semibold tabular-nums text-foreground">
                    {s.percentVsPlan != null ? `${s.percentVsPlan}%` : "—"}
                  </td>
                )}
                {show("countries") && <td className="px-4 py-3 text-center tabular-nums text-foreground">{s.countries}</td>}
                {show("sites") && <td className="px-4 py-3 text-center tabular-nums text-foreground">{s.sites}</td>}
                {show("performance") && <td className="whitespace-nowrap px-4 py-3"><PerformanceBadge value={s.performance} /></td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-border px-4 py-3 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span>Rows per page:</span>
          <select className="rounded-md border border-input bg-card px-2 py-1 text-foreground">
            <option>25</option>
            <option>50</option>
          </select>
        </div>
        <p className="text-muted-foreground">1–25 of 36</p>
        <div className="flex items-center gap-2">
          <button className="rounded-md border border-input px-3 py-1 text-muted-foreground hover:bg-muted disabled:opacity-40" disabled>
            Previous
          </button>
          <span className="text-muted-foreground">1 / 2</span>
          <button className="rounded-md border border-input px-3 py-1 text-foreground hover:bg-muted">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
