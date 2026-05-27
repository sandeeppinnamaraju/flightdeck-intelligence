import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, FlaskConical, LayoutGrid, Activity, ShieldCheck, Sparkles } from "lucide-react";
import { AUTH_USERS } from "@/config/auth-users";
import { setSession } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Flight Deck" },
      { name: "description", content: "Sign in to Flight Deck." },
    ],
  }),
  component: LoginPage,
});

const HIGHLIGHTS = [
  {
    icon: LayoutGrid,
    title: "Unified portfolio",
    body: "Track every study, site, and milestone across regions in one live workspace.",
  },
  {
    icon: Activity,
    title: "Real-time signals",
    body: "Enrollment velocity, screen-fail rates, and risk scores updated as data arrives.",
  },
  {
    icon: ShieldCheck,
    title: "Protocol intelligence",
    body: "Search 100k+ protocols and benchmark designs against your therapeutic area.",
  },
];

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const match = AUTH_USERS.find(
      (c) => c.username === username.trim().toLowerCase() && c.password === password,
    );
    if (!match) {
      setError("Invalid username or password.");
      return;
    }
    setError("");
    setSession({ username: match.username, role: match.role });
    navigate({ to: "/home" });
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background to-accent/40">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[520px] w-[520px] rounded-full bg-info/15 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 py-10 lg:py-16">
        {/* Brand header */}
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-card">
            <FlaskConical className="h-5 w-5" />
          </span>
          <span className="text-2xl font-bold tracking-tight text-foreground">Flight Deck</span>
        </div>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: marketing */}
          <section>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Clinical Trials Intelligence
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              Pilot every protocol
              <br />
              with <span className="text-primary">precision</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              Flight Deck is the operating cockpit for clinical operations teams. Turn enrollment
              signals, site performance, and protocol risk into the decisions that move medicine
              forward — from first patient in to final readout.
            </p>

            <ul className="mt-8 space-y-5">
              {HIGHLIGHTS.map(({ icon: Icon, title, body }) => (
                <li key={title} className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{title}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Right: sign-in card */}
          <section className="lg:pt-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
              <h2 className="text-2xl font-bold text-foreground">Sign in</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Enter your credentials to access Flight Deck.
              </p>

              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username" className="text-sm font-semibold text-foreground">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="mt-1.5 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground shadow-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="text-sm font-semibold text-foreground">
                    Password
                  </label>
                  <div className="relative mt-1.5">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="h-11 w-full rounded-lg border border-input bg-background px-3 pr-10 text-sm text-foreground shadow-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute inset-y-0 right-0 inline-flex w-10 items-center justify-center text-muted-foreground hover:text-foreground"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="rounded-md bg-danger-bg px-3 py-2 text-sm text-danger-foreground">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="mt-2 h-11 w-full rounded-lg bg-primary text-sm font-semibold text-primary-foreground shadow-card transition hover:bg-primary/90 hover:shadow-card-hover"
                >
                  Sign in
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
