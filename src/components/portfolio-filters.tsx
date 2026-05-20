import { useState } from "react";
import { Search, Calendar, ChevronDown, Check, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { therapeuticAreas } from "@/lib/data";
import { cn } from "@/lib/utils";

const phases = ["Ph I", "Ph II", "Ph III", "Ph IV"];
const statuses = ["Recruiting", "Planned", "Follow-up"];
const portfolios = [
  "Oncology Portfolio",
  "Cardiovascular Portfolio",
  "Neurology Portfolio",
  "Immunology Portfolio",
  "Respiratory Portfolio",
];
const programs = ["ZPH-505", "OMP-770", "GEN-330", "PHX-873", "NXG-810", "CRX-255", "VRD-698"];
const regions = ["North America", "EU", "APAC", "LATAM", "MEA"];
const dateOptions = ["Last 30 days", "Last 90 days", "YTD", "Last 12 months", "All time"];

export interface FilterState {
  search: string;
  areas: string[];
  phase: string | null;
  status: string | null;
  portfolio: string | null;
  program: string | null;
  region: string | null;
  dateRange: string | null;
}

export const emptyFilters: FilterState = {
  search: "",
  areas: [],
  phase: null,
  status: null,
  portfolio: null,
  program: null,
  region: null,
  dateRange: null,
};

function SingleSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string | null;
  onChange: (v: string | null) => void;
}) {
  return (
    <Select value={value ?? ""} onValueChange={(v) => onChange(v === "__all__" ? null : v)}>
      <SelectTrigger className="h-9 w-auto gap-1.5 rounded-lg border border-input bg-card px-3 text-sm">
        <SelectValue placeholder={label}>
          {value ? (
            <span>
              <span className="text-muted-foreground">{label}:</span>{" "}
              <span className="font-medium">{value}</span>
            </span>
          ) : (
            label
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="__all__">All</SelectItem>
        {options.map((o) => (
          <SelectItem key={o} value={o}>
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function MultiSelectTA({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (v: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const toggle = (a: string) =>
    onChange(selected.includes(a) ? selected.filter((s) => s !== a) : [...selected, a]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-input bg-card px-3 text-sm text-foreground hover:bg-muted">
          <span className="text-muted-foreground">Therapeutic Area</span>
          {selected.length > 0 && (
            <span className="rounded-full bg-primary px-1.5 py-0.5 text-[11px] font-semibold text-primary-foreground">
              {selected.length}
            </span>
          )}
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64 p-2">
        <div className="mb-1 flex items-center justify-between px-1 pb-1">
          <span className="text-xs font-medium text-muted-foreground">
            {selected.length} selected
          </span>
          {selected.length > 0 && (
            <button
              onClick={() => onChange([])}
              className="text-xs font-medium text-primary hover:underline"
            >
              Clear
            </button>
          )}
        </div>
        <div className="max-h-64 overflow-y-auto">
          {therapeuticAreas.map((a) => {
            const isSel = selected.includes(a);
            return (
              <button
                key={a}
                onClick={() => toggle(a)}
                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted"
              >
                <span
                  className={cn(
                    "flex h-4 w-4 items-center justify-center rounded border",
                    isSel ? "border-primary bg-primary text-primary-foreground" : "border-input",
                  )}
                >
                  {isSel && <Check className="h-3 w-3" />}
                </span>
                {a}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function PortfolioFilters({
  total,
  shown,
  filters,
  onChange,
}: {
  total: number;
  shown: number;
  filters: FilterState;
  onChange: (f: FilterState) => void;
}) {
  const set = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
    onChange({ ...filters, [key]: value });

  const hasAny =
    filters.areas.length > 0 ||
    filters.phase ||
    filters.status ||
    filters.portfolio ||
    filters.program ||
    filters.region ||
    filters.dateRange ||
    filters.search.length > 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <div className="relative max-w-md flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => set("search", e.target.value)}
            placeholder="Search by ID, title, indication..."
            className="h-10 w-full rounded-lg border border-input bg-card pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{shown}</span> of{" "}
          <span className="font-semibold text-foreground">{total}</span> studies
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <MultiSelectTA selected={filters.areas} onChange={(v) => set("areas", v)} />
        <SingleSelect label="Phase" options={phases} value={filters.phase} onChange={(v) => set("phase", v)} />
        <SingleSelect label="Study Status" options={statuses} value={filters.status} onChange={(v) => set("status", v)} />
        <SingleSelect
          label="Portfolio"
          options={portfolios}
          value={filters.portfolio}
          onChange={(v) => set("portfolio", v)}
        />
        <SingleSelect label="Program" options={programs} value={filters.program} onChange={(v) => set("program", v)} />
        <SingleSelect label="Region" options={regions} value={filters.region} onChange={(v) => set("region", v)} />
        <Select
          value={filters.dateRange ?? ""}
          onValueChange={(v) => set("dateRange", v === "__all__" ? null : v)}
        >
          <SelectTrigger className="h-9 w-auto gap-1.5 rounded-lg border border-input bg-card px-3 text-sm">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            <SelectValue placeholder="FPI / LPO">
              {filters.dateRange ? (
                <span>
                  <span className="text-muted-foreground">FPI / LPO:</span>{" "}
                  <span className="font-medium">{filters.dateRange}</span>
                </span>
              ) : (
                "FPI / LPO"
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">All time</SelectItem>
            {dateOptions.map((o) => (
              <SelectItem key={o} value={o}>
                {o}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {hasAny && (
          <button
            onClick={() => onChange(emptyFilters)}
            className="inline-flex h-9 items-center gap-1 rounded-lg px-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
            Clear all
          </button>
        )}
      </div>
      {filters.areas.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          {filters.areas.map((a) => (
            <span
              key={a}
              className="inline-flex items-center gap-1 rounded-full border border-input bg-card px-2 py-0.5 text-xs text-foreground"
            >
              {a}
              <button
                onClick={() => set("areas", filters.areas.filter((x) => x !== a))}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
