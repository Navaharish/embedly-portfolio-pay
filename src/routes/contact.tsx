import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Linkedin, CreditCard, Mail, Phone } from "lucide-react";
import { PageHero, Section, RegisterButton } from "@/components/site";
import { meta, LINKEDIN_URL, REGISTRATION_URL, CONTACT_EMAIL, CONTACT_PHONES, CONTACT_TEL } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  staticData: { sitemap: true },
  head: () => meta("Contact & Register — Embeddly", "Register your interest in the Embeddly Hardware Internship Training Program through our registration form."),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact & register" title="Secure your seat.">
        Registration starts with a quick interest form. Only 24 seats in the first batch.
      </PageHero>
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <a href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-primary/40 bg-card p-6">
            <CreditCard className="h-6 w-6 text-primary" />
            <h3 className="mt-4 text-lg font-semibold">Register Your Interest</h3>
            <p className="mt-1 text-sm text-muted-foreground">Fill the registration form</p>
          </a>
          <div className="rounded-lg border border-border bg-card p-6">
            <MapPin className="h-6 w-6 text-primary" />
            <h3 className="mt-4 text-lg font-semibold">Venue</h3>
            <p className="mt-1 text-sm text-muted-foreground">Sai Foundation, Sona College of Technology, Salem, Tamil Nadu</p>
          </div>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-border bg-card p-6">
            <Linkedin className="h-6 w-6 text-primary" />
            <h3 className="mt-4 text-lg font-semibold">LinkedIn</h3>
            <p className="mt-1 text-sm text-muted-foreground">Connect with trainer Akshay V</p>
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="rounded-lg border border-border bg-card p-6">
            <Mail className="h-6 w-6 text-primary" />
            <h3 className="mt-4 text-lg font-semibold">Email</h3>
            <p className="mt-1 text-sm text-muted-foreground">{CONTACT_EMAIL}</p>
          </a>
          <a href={CONTACT_TEL} className="rounded-lg border border-border bg-card p-6">
            <Phone className="h-6 w-6 text-primary" />
            <h3 className="mt-4 text-lg font-semibold">Phone</h3>
            <p className="mt-1 text-sm text-muted-foreground">{CONTACT_PHONES.join(" / ")}</p>
          </a>
        </div>
        <div className="mt-12"><RegisterButton /></div>
      </Section>
    </>
  );
}
