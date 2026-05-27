import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, FlaskConical } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Flight Deck" },
      { name: "description", content: "Sign in to Flight Deck to access your clinical trial portfolio." },
    ],
  }),
  component: LoginPage,
});

const TEST_CREDS = [
  {
    role: "ADMIN",
    username: "admin",
    password: "Admin@123",
    description: "Full portfolio access · All studies · Export capabilities",
    tone: "primary" as const,
  },
  {
    role: "VIEWER",
    username: "viewer",
    password: "Viewer@123",
    description: "Read-only access · Portfolio & protocol search",
    tone: "muted" as const,
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
    const match = TEST_CREDS.find(
      (c) => c.username === username.trim() && c.password === password,
    );
    if (!match) {
      setError("Invalid username or password.");
      return;
    }
    setError("");
    navigate({ to: "/portfolio" });
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background to-accent/40">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-[-10%] h-[480px] w-[480px] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-[-15%] left-[-10%] h-[480px] w-[480px] rounded-full bg-info/15 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col items-stretch px-5 py-10 sm:py-14">
        {/* Brand */}
        <div className="flex items-center justify-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-card">
            <FlaskConical className="h-5 w-5" />
          </span>
          <span className="text-2xl font-bold tracking-tight text-foreground">Flight Deck</span>
        </div>

        {/* Sign in card */}
        <section className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-card sm:p-7">
          <h1 className="text-2xl font-bold text-foreground">Sign in</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Use the test credentials below or enter your own.
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
                placeholder="admin or viewer"
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
        </section>

        {/* Test credentials */}
        <div className="mt-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Test credentials
          </p>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {TEST_CREDS.map((c) => (
              <button
                key={c.role}
                type="button"
                onClick={() => {
                  setUsername(c.username);
                  setPassword(c.password);
                  setError("");
                }}
                className="group rounded-xl border border-border bg-card p-4 text-left shadow-card transition hover:border-primary/40 hover:shadow-card-hover"
              >
                <span
                  className={
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wide " +
                    (c.tone === "primary"
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground")
                  }
                >
                  <span
                    className={
                      "h-1.5 w-1.5 rounded-full " +
                      (c.tone === "primary" ? "bg-primary" : "bg-muted-foreground")
                    }
                  />
                  {c.role}
                </span>
                <dl className="mt-3 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <dt className="w-16 text-muted-foreground">Username</dt>
                    <dd className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground">
                      {c.username}
                    </dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <dt className="w-16 text-muted-foreground">Password</dt>
                    <dd className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground">
                      {c.password}
                    </dd>
                  </div>
                </dl>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {c.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          MVP · Mock data only · No real authentication
        </p>
      </div>
    </main>
  );
}
