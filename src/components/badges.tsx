import { cn } from "@/lib/utils";
import type { Performance, Priority, Status } from "@/lib/data";

export function PriorityBadge({ value }: { value: Priority }) {
  const map: Record<Priority, string> = {
    High: "bg-danger-bg text-danger-foreground",
    Medium: "bg-warning-bg text-warning-foreground",
    Low: "bg-success-bg text-success-foreground",
  };
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium", map[value])}>
      {value}
    </span>
  );
}

export function PerformanceBadge({ value }: { value: Performance }) {
  if (value === "—") return <span className="text-muted-foreground">—</span>;
  const map: Record<Exclude<Performance, "—">, string> = {
    "On Track": "bg-success-bg text-success-foreground",
    "At Risk": "bg-warning-bg text-warning-foreground",
    "Off Track": "bg-danger-bg text-danger-foreground",
  };
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium", map[value])}>
      {value}
    </span>
  );
}

export function StatusText({ value }: { value: Status }) {
  return <span className="text-foreground">{value}</span>;
}

export function PhaseBadge({ value }: { value: string }) {
  return (
    <span className="inline-flex rounded-md bg-accent px-2 py-0.5 text-xs font-semibold tracking-wide text-accent-foreground">
      {value}
    </span>
  );
}
