import type { Study } from "./data";
import type { FilterState } from "@/components/portfolio-filters";

export function filterStudies(studies: Study[], f: FilterState): Study[] {
  const q = f.search.trim().toLowerCase();
  return studies.filter((s) => {
    if (q && !(
      s.id.toLowerCase().includes(q) ||
      s.title.toLowerCase().includes(q) ||
      s.indication.toLowerCase().includes(q)
    )) return false;
    if (f.areas.length > 0 && !f.areas.includes(s.therapeuticArea)) return false;
    if (f.phase && s.phase !== f.phase) return false;
    if (f.status && s.status !== f.status) return false;
    if (f.portfolio && s.portfolio !== f.portfolio) return false;
    if (f.program && s.program !== f.program) return false;
    // region & dateRange: no data field — treat as no-op for now
    return true;
  });
}
