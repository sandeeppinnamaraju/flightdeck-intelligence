import { Search, Calendar, ChevronDown } from "lucide-react";

const filters = [
  "Therapeutic Area",
  "Phase",
  "Study Status",
  "Portfolio",
  "Program",
  "Region",
];

export function PortfolioFilters({ total }: { total: number }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <div className="relative max-w-md flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by ID, title, indication..."
            className="h-10 w-full rounded-lg border border-input bg-card pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">1–25</span> of{" "}
          <span className="font-semibold text-foreground">{total}</span> studies
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((f) => (
          <button
            key={f}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-input bg-card px-3 text-sm text-foreground hover:bg-muted"
          >
            {f}
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        ))}
        <button className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-input bg-card px-3 text-sm text-foreground hover:bg-muted">
          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
          FPI / LPO
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
