import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { StudyTable } from "@/components/study-table";
import { PortfolioFilters, emptyFilters, type FilterState } from "@/components/portfolio-filters";
import { studies } from "@/lib/data";
import { filterStudies } from "@/lib/filter-studies";

export const Route = createFileRoute("/studies")({
  head: () => ({
    meta: [
      { title: "Studies — Flight Deck" },
      { name: "description", content: "Browse the complete catalog of clinical studies across portfolios and programs." },
    ],
  }),
  component: StudiesPage,
});

function StudiesPage() {
  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const filtered = useMemo(() => filterStudies(studies, filters), [filters]);

  return (
    <main className="mx-auto max-w-[1600px] px-6 py-6">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">Studies</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Full catalog of clinical studies across all portfolios.
      </p>
      <div className="mt-5">
        <PortfolioFilters
          studies={studies}
          total={studies.length}
          shown={filtered.length}
          filters={filters}
          onChange={setFilters}
        />
      </div>
      <div className="mt-5">
        <StudyTable studies={filtered} />
      </div>
    </main>
  );
}
