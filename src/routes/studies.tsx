import { createFileRoute } from "@tanstack/react-router";
import { StudyTable } from "@/components/study-table";
import { PortfolioFilters } from "@/components/portfolio-filters";
import { studies } from "@/lib/data";

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
  return (
    <main className="mx-auto max-w-[1600px] px-6 py-6">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">Studies</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Full catalog of clinical studies across all portfolios.
      </p>
      <div className="mt-5">
        <PortfolioFilters total={studies.length} />
      </div>
      <div className="mt-5">
        <StudyTable studies={studies} />
      </div>
    </main>
  );
}
