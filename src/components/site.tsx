import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV, REGISTRATION_URL, LINKEDIN_URL, CONTACT_EMAIL, CONTACT_PHONES } from "@/lib/site";
import embeddlyLogo from "@/assets/embeddly-logo.png.asset.json";
import squarootsLogo from "@/assets/squaroots-logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { AccountMenu } from "@/components/account-menu";

export function RegisterButton({ children = "Register Your Interest", variant = "solid" }: { children?: ReactNode; variant?: "solid" | "ghost" }) {
  return (
    <Button asChild variant={variant === "solid" ? "default" : "outline"} size="lg" className="h-auto min-h-12 whitespace-normal text-center font-semibold">
    <a href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer">
      {children} <ArrowUpRight className="h-4 w-4" />
    </a>
    </Button>
  );
}

export function Logo() {
  return (
    <Link to="/" aria-label="Embeddly home" className="flex items-center">
      <img src={embeddlyLogo.url} alt="Embeddly" className="block h-8 w-auto" />
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="relative z-40 border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Logo />
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="text-sm text-muted-foreground hover:text-primary" activeProps={{ className: "text-sm font-semibold text-primary" }} activeOptions={{ exact: true }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <AccountMenu />
          <RegisterButton>Register Your Interest</RegisterButton>
        </div>
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} aria-controls="mobile-navigation">
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav id="mobile-navigation" className="flex flex-col gap-4 border-t border-border px-5 py-5 lg:hidden">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="text-muted-foreground">{n.label}</Link>
          ))}
          <AccountMenu />
          <RegisterButton>Register Your Interest</RegisterButton>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-muted-foreground">Learn by Building. Build by Doing.</p>
          <div className="mt-3 flex items-center gap-3">
            <img src={squarootsLogo.url} alt="Squaroots" className="h-8 w-auto rounded-md" />
            <span className="text-sm text-muted-foreground">An initiative by Squaroots Technology LLP.</span>
          </div>
          <div className="mt-3 space-y-1 text-sm text-muted-foreground">
            <p><a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-foreground">{CONTACT_EMAIL}</a></p>
            <p>{CONTACT_PHONES.join(" / ")}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">LinkedIn</a>
          <a href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Register</a>
          <span>© 2026 Squaroots Technology LLP</span>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="border-b border-border bg-muted">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <p className="text-sm font-semibold text-secondary">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold text-primary md:text-6xl">{title}</h1>
        {children && <div className="mt-6 max-w-2xl text-lg text-muted-foreground">{children}</div>}
      </div>
    </section>
  );
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`mx-auto max-w-6xl px-5 py-16 md:py-24 ${className}`}>{children}</section>;
}

export function CTA() {
  return (
    <section className="border-t border-border bg-accent">
      <div className="mx-auto max-w-6xl px-5 py-14 text-center md:py-20">
        <h2 className="text-3xl font-bold text-primary md:text-4xl">Ready to build real hardware?</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Only 24 seats in the first batch. Secure your place in the Hardware Internship Training Program.</p>
        <div className="mt-8 flex justify-center"><RegisterButton /></div>
      </div>
    </section>
  );
}
