import { Link, useLocation } from "@tanstack/react-router";

const tabs = [
  { to: "/", label: "Portfolio" },
  { to: "/studies/ST-2024-003", label: "Study Overview" },
  { to: "/protocol-search", label: "Protocol Search" },
] as const;

export function TopNav() {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-30 w-full bg-nav text-nav-foreground shadow-sm">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center gap-8 px-6">
        <Link to="/" className="text-lg font-bold tracking-tight">
          Flight Deck
        </Link>
        <nav className="flex items-center gap-1">
          {tabs.map((t) => {
            const active =
              t.to === "/" ? pathname === "/"
              : t.label === "Study Overview" ? pathname.startsWith("/studies")
              : pathname.startsWith(t.to);
            return (
              <Link
                key={t.to}
                to={t.to}
                className={
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors " +
                  (active
                    ? "bg-white/15 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white")
                }
              >
                {t.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-white/20 ring-1 ring-white/30" />
        </div>
      </div>
    </header>
  );
}
