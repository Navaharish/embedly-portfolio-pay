import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfile, type AccountSnapshot } from "@/lib/account.functions";
import { accountQueryOptions } from "@/lib/account-queries";
import { meta, REGISTRATION_URL } from "@/lib/site";

export const Route = createFileRoute("/_authenticated/dashboard")({
  staticData: { sitemap: false },
  loader: ({ context }) => context.queryClient.ensureQueryData(accountQueryOptions),
  head: () =>
    meta(
      "Your account — Embeddly",
      "Manage your Embeddly account details.",
    ),
  component: Dashboard,
});

function Dashboard() {
  const { data } = useSuspenseQuery(accountQueryOptions);

  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <p className="text-sm text-primary">Embeddly account</p>
      <h1 className="mt-1 font-heading text-3xl font-bold text-foreground">
        {data.profile.full_name || "Welcome"}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">{data.profile.email}</p>

      <DetailsCard profile={data.profile} />
    </div>
  );
}

function DetailsCard({ profile }: { profile: AccountSnapshot["profile"] }) {
  const save = useServerFn(updateProfile);
  const queryClient = useQueryClient();
  const [fullName, setFullName] = useState(profile.full_name ?? "");
  const [phone, setPhone] = useState(profile.phone ?? "");
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setSaved(false);
    try {
      await save({ data: { full_name: fullName, phone } });
      await queryClient.invalidateQueries({ queryKey: ["account"] });
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save your details.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mt-8 rounded-2xl border border-border bg-card p-6">
      <h2 className="font-heading text-lg font-bold text-foreground">Your details</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Used on your attendance record and internship certificate.
      </p>

      <form className="mt-5 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            required
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="+91 ..."
          />
        </div>

        <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
          <Button type="submit" disabled={busy}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save details"}
          </Button>
          {saved && <span className="text-sm text-primary">Saved</span>}
          {error && <span className="text-sm text-destructive">{error}</span>}
          <a
            href={REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Register Your Interest
          </a>
        </div>
      </form>
    </section>
  );
}
