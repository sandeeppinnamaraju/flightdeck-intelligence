import type { Study } from "./data";
import type { FilterState } from "@/components/portfolio-filters";

type Key = keyof FilterState;

export function filterStudies(
  studies: Study[],
  f: FilterState,
  except?: Key,
): Study[] {
  const q = f.search.trim().toLowerCase();
  const use = (k: Key) => k !== except;
  return studies.filter((s) => {
    if (use("search") && q && !(
      s.id.toLowerCase().includes(q) ||
      s.title.toLowerCase().includes(q) ||
      s.indication.toLowerCase().includes(q)
    )) return false;
    if (use("areas") && f.areas.length > 0 && !f.areas.includes(s.therapeuticArea)) return false;
    if (use("phase") && f.phase && s.phase !== f.phase) return false;
    if (use("status") && f.status && s.status !== f.status) return false;
    if (use("portfolio") && f.portfolio && s.portfolio !== f.portfolio) return false;
    if (use("program") && f.program && s.program !== f.program) return false;
    // region & dateRange: no underlying data — no-op
    return true;
  });
}
