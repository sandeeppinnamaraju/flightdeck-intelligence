import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, FlaskConical } from "lucide-react";
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
        <div className="absolute -top-40 right-[-10%] h-[480px] w-[480px] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-[-15%] left-[-10%] h-[480px] w-[480px] rounded-full bg-info/15 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-5 py-10">
        {/* Brand */}
        <div className="flex items-center justify-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-card">
            <FlaskConical className="h-5 w-5" />
          </span>
          <span className="text-2xl font-bold tracking-tight text-foreground">Flight Deck</span>
        </div>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          The operating cockpit for clinical operations.
        </p>

        {/* Sign in card */}
        <section className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-card sm:p-7">
          <h1 className="text-2xl font-bold text-foreground">Sign in</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter your credentials to continue.
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
        </section>
      </div>
    </main>
  );
}
