import { Link } from "@tanstack/react-router";
import { ChevronsUpDown, Columns3 } from "lucide-react";
import type { Study } from "@/lib/data";
import { PriorityBadge, PerformanceBadge } from "./badges";

interface Props {
  studies: Study[];
}

export function StudyTable({ studies }: Props) {
  return (
    <div className="rounded-xl border border-border bg-card shadow-card">
      <div className="flex items-center justify-end border-b border-border px-4 py-2.5">
        <button className="inline-flex items-center gap-1.5 rounded-md border border-input px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted">
          <Columns3 className="h-3.5 w-3.5" />
          Columns
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {[
                "Study ID", "Phase", "Therapeutic Area", "Indication",
                "Portfolio / Program", "Status", "Priority", "Target",
                "Actual", "% vs Plan", "Countries", "Sites", "Performance",
              ].map((h) => (
                <th key={h} className="whitespace-nowrap px-4 py-3 font-semibold">
                  <span className="inline-flex items-center gap-1">
                    {h}
                    {(h === "% vs Plan" || h === "Performance") && (
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
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-semibold text-primary hover:underline">
                  {s.id}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-foreground">{s.phase}</td>
                <td className="whitespace-nowrap px-4 py-3 text-foreground">{s.therapeuticArea}</td>
                <td className="max-w-[200px] truncate px-4 py-3 text-foreground" title={s.indication}>
                  {s.indication}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                  {s.portfolio} / <span className="font-mono text-xs">{s.program}</span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-foreground">{s.status}</td>
                <td className="whitespace-nowrap px-4 py-3"><PriorityBadge value={s.priority} /></td>
                <td className="px-4 py-3 text-right tabular-nums text-foreground">{s.target.toLocaleString()}</td>
                <td className="px-4 py-3 text-right tabular-nums text-foreground">{s.actual.toLocaleString()}</td>
                <td className="px-4 py-3 text-right font-semibold tabular-nums text-foreground">
                  {s.percentVsPlan != null ? `${s.percentVsPlan}%` : "—"}
                </td>
                <td className="px-4 py-3 text-center tabular-nums text-foreground">{s.countries}</td>
                <td className="px-4 py-3 text-center tabular-nums text-foreground">{s.sites}</td>
                <td className="whitespace-nowrap px-4 py-3"><PerformanceBadge value={s.performance} /></td>
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
