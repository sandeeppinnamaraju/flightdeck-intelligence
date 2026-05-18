import { useState, useRef, useEffect } from "react";
import { Lightbulb, TrendingDown, AlertTriangle, CheckCircle2, Info } from "lucide-react";

const insights = [
  { icon: TrendingDown, tone: "danger", text: "10 of 21 active studies are off-track and require immediate attention." },
  { icon: AlertTriangle, tone: "warning", text: "7 studies are at risk — early intervention can prevent escalation." },
  { icon: CheckCircle2, tone: "success", text: "Immunology leads at 89% enrollment vs plan." },
  { icon: Info, tone: "info", text: "Portfolio is 76,870 patients behind total enrollment target." },
  { icon: AlertTriangle, tone: "warning", text: "4 high-priority studies below plan — escalate for review." },
] as const;

const toneStyles = {
  danger: { bg: "bg-danger-bg/60", icon: "text-danger", text: "text-danger-foreground" },
  warning: { bg: "bg-warning-bg/70", icon: "text-warning-foreground", text: "text-warning-foreground" },
  success: { bg: "bg-success-bg/60", icon: "text-success", text: "text-success-foreground" },
  info: { bg: "bg-info-bg/60", icon: "text-info", text: "text-info-foreground" },
};

export function InsightsButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.85_0.1_85)] bg-warning-bg/40 px-3.5 py-1.5 text-sm font-medium text-warning-foreground transition-colors hover:bg-warning-bg/70"
      >
        <Lightbulb className="h-4 w-4" />
        {insights.length} Insights
      </button>
      {open && (
        <div className="absolute right-0 top-full z-40 mt-2 w-[420px] rounded-xl border border-border bg-popover p-4 shadow-popover">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Portfolio Insights
          </p>
          <div className="space-y-2">
            {insights.map((ins, i) => {
              const Icon = ins.icon;
              const s = toneStyles[ins.tone];
              return (
                <div
                  key={i}
                  className={`flex items-start gap-3 rounded-lg p-3 ${s.bg}`}
                >
                  <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${s.icon}`} />
                  <p className={`text-sm leading-snug ${s.text}`}>{ins.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
