import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";
import { AUTH_TARGET_KEY, sanitizeRedirect } from "@/lib/account";
import { meta } from "@/lib/site";

import "@lovable.dev/cloud-auth-js/styles.css";

export const Route = createFileRoute("/auth")({
  staticData: { sitemap: false },
  validateSearch: (search: Record<string, unknown>): { redirect?: string } =>
    typeof search["redirect"] === "string" ? { redirect: search["redirect"] } : {},
  head: () =>
    meta(
      "Sign in — Embeddly",
      "Sign in to your Embeddly account to manage your name and phone details.",
    ),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);

  const intendedTarget = sanitizeRedirect(redirect);

  useEffect(() => {
    if (intendedTarget) sessionStorage.setItem(AUTH_TARGET_KEY, redirect ?? "");

    // Covers the OAuth round-trip: the provider sends the browser back here
    // with a live session, and we then finish at the intended page.
    const timer = window.setInterval(async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) return;
      window.clearInterval(timer);
      const stored = sanitizeRedirect(sessionStorage.getItem(AUTH_TARGET_KEY));
      sessionStorage.removeItem(AUTH_TARGET_KEY);
      navigate({ to: stored ?? "/dashboard", replace: true });
    }, 300);

    return () => window.clearInterval(timer);
  }, [intendedTarget, navigate, redirect]);

  function destination() {
    const stored = sanitizeRedirect(sessionStorage.getItem(AUTH_TARGET_KEY));
    sessionStorage.removeItem(AUTH_TARGET_KEY);
    return stored ?? "/dashboard";
  }

  async function run(action: () => Promise<void>) {
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      await action();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function handleEmailSignIn() {
    await run(async () => {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) throw new Error(signInError.message);
      navigate({ to: destination(), replace: true });
    });
  }

  async function handleEmailSignUp() {
    await run(async () => {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: { full_name: fullName },
        },
      });
      if (signUpError) throw new Error(signUpError.message);

      if (data.session) {
        navigate({ to: destination(), replace: true });
        return;
      }

      setAwaitingConfirmation(true);
      setNotice("Check your inbox and confirm your email address, then sign in.");
    });
  }

  async function handleOAuth(provider: "google" | "lovable") {
    await run(async () => {
      const result = await lovable.auth.signInWithOAuth(provider, {
        redirect_uri: window.location.origin,
      });
      if (result.error) throw new Error(result.error.message);
      if (result.redirected) return;
      navigate({ to: destination(), replace: true });
    });
  }

  async function handleForgotPassword() {
    await run(async () => {
      if (!email) throw new Error("Enter your email address first.");
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (resetError) throw new Error(resetError.message);
      setNotice("If that email has an account, a reset link is on its way.");
    });
  }

  if (awaitingConfirmation) {
    return (
      <section className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-5 py-16">
        <div className="rounded-2xl border border-border bg-card p-8">
          <h1 className="font-heading text-2xl font-bold text-foreground">Confirm your email</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            We sent a confirmation link to <span className="font-medium text-foreground">{email}</span>. Open
             it, then come back and sign in to your account.
          </p>
          <Button className="mt-6 w-full" onClick={() => setAwaitingConfirmation(false)}>
            Back to sign in
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-5 py-16">
      <div className="rounded-2xl border border-border bg-card p-8">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          {mode === "signin" ? "Sign in to Embeddly" : "Create your Embeddly account"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "signin"
            ? "Manage your name and phone details."
            : "Save your name and phone details in your Embeddly account."}
        </p>

        <div className="mt-6 space-y-4">
          <Button variant="outline" className="w-full" disabled={busy} onClick={() => handleOAuth("google")}>
            Continue with Google
          </Button>
          <button
            type="button"
            className="lovable-auth-button w-full"
            disabled={busy}
            onClick={() => handleOAuth("lovable")}
          >
            Continue with Lovable
          </button>
        </div>

        <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          or with email
          <span className="h-px flex-1 bg-border" />
        </div>

        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            mode === "signin" ? handleEmailSignIn() : handleEmailSignUp();
          }}
        >
          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="full-name">Full name</Label>
              <Input
                id="full-name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Akshay V"
                autoComplete="name"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 6 characters"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
          {notice && <p className="text-sm text-muted-foreground">{notice}</p>}

          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                {mode === "signin" ? "Sign in" : "Create account"}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
          <button
            type="button"
            className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError(null);
              setNotice(null);
            }}
          >
            {mode === "signin" ? "New here? Create an account" : "Already registered? Sign in"}
          </button>
          {mode === "signin" && (
            <button
              type="button"
              className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              onClick={handleForgotPassword}
            >
              Forgot password?
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
