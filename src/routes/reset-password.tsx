import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { meta } from "@/lib/site";

export const Route = createFileRoute("/reset-password")({
  staticData: { sitemap: false },
  head: () =>
    meta("Set a new password — Embeddly", "Choose a new password for your Embeddly account."),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // The recovery link arrives as #type=recovery; the client needs a moment to
    // exchange it for a session before updateUser will accept a new password.
    if (!window.location.hash.includes("type=recovery")) return;

    let attempts = 0;
    const timer = window.setInterval(async () => {
      attempts += 1;
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setReady(true);
        window.clearInterval(timer);
      } else if (attempts > 12) {
        window.clearInterval(timer);
      }
    }, 250);

    return () => window.clearInterval(timer);
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Both passwords must match.");
      return;
    }

    setBusy(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setBusy(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    navigate({ to: "/dashboard", replace: true });
  }

  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-5 py-16">
      <div className="rounded-2xl border border-border bg-card p-8">
        <h1 className="font-heading text-2xl font-bold text-foreground">Set a new password</h1>

        {!ready && (
          <p className="mt-3 text-sm text-muted-foreground">
            This link has expired or was already used. Request a new reset link from the sign-in page.
          </p>
        )}

        {ready && (
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="new-password">New password</Label>
              <Input
                id="new-password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm new password</Label>
              <Input
                id="confirm-password"
                type="password"
                required
                minLength={6}
                value={confirm}
                onChange={(event) => setConfirm(event.target.value)}
                autoComplete="new-password"
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" className="w-full" disabled={busy}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save new password"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
