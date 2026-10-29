import { createFileRoute, Link } from "@tanstack/react-router";
import { Cpu, CircuitBoard, Wrench, MapPin, CalendarDays } from "lucide-react";
import { CountUp } from "@/components/count-up";
import hero from "@/assets/hero-pcb.jpg";
import { RegisterButton, Section, CTA } from "@/components/site";
import { TrainerProfile } from "@/components/trainer-profile";
import { Button } from "@/components/ui/button";
import { meta } from "@/lib/site";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => meta("Embeddly — Learn Hardware by Building It", "Hands-on electronics, embedded systems and PCB design internship training by Embeddly, an initiative of Squaroots Technology LLP."),
  component: Index,
});

const facts: { n?: number; suffix?: string; text?: string; label: string }[] = [
  { n: 2, suffix: " weeks", label: "Approx. duration" },
  { n: 24, label: "Seats only" },
  { n: 30, suffix: "+", label: "Component kit" },
  { text: "Offline", label: "Hands-on mode" },
];

function Index() {
  return (
    <>
      <section data-navigation-intro className="relative overflow-hidden border-b border-border">
        <img src={hero} alt="Soldering a circuit board" width={1600} height={1104} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto max-w-6xl px-5 py-12 md:py-24 text-hero-foreground">
          <p className="text-sm font-semibold text-hero-muted">Learn by Building. Build by Doing.</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.05] md:text-7xl">Learn Hardware by <span>Building It.</span></h1>
          <p className="mt-6 max-w-xl text-lg text-hero-muted">Get hands-on experience in electronics, embedded systems, PCB design, and hardware prototyping through Embeddly's practical internship training program.</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <RegisterButton>Register Your Interest</RegisterButton>
            <Button asChild variant="outline" size="lg" className="h-auto min-h-12 whitespace-normal"><Link to="/program">Explore the Program</Link></Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-hero-muted">
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-secondary" />Sai Foundation, Sona College of Technology, Salem, Tamil Nadu</span>
            <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-secondary" />Late November 2026 (proposed)</span>
          </div>
          <p className="mt-4 text-sm text-hero-muted">An initiative by Squaroots Technology LLP.</p>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="rounded-lg border border-border bg-card p-6">
              <div className="font-display text-3xl font-bold text-primary">{f.n !== undefined ? <CountUp to={f.n} suffix={f.suffix} /> : f.text}</div>
              <div className="mt-1 text-sm text-muted-foreground">{f.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <TrainerProfile />
      </Section>

      <Section className="pt-0">
        <h2 className="max-w-2xl text-3xl font-bold md:text-4xl">Beyond Theory. Into Real Hardware.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            [Wrench, "Learn by Doing", "Experiment, test and troubleshoot with your own hands."],
            [CircuitBoard, "Build Real Hardware", "Turn circuit ideas into physical boards and prototypes."],
            [Cpu, "Practical Engineering Skills", "Gain skills that go beyond the textbook."],
          ].map(([Icon, t, d]) => {
            const I = Icon as typeof Cpu;
            return (
              <div key={t as string} className="rounded-lg border border-border bg-card p-6">
                <I className="h-6 w-6 text-secondary" />
                <h3 className="mt-4 text-lg font-semibold">{t as string}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d as string}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-8 flex gap-6 text-sm">
          <Link to="/about" className="text-primary hover:underline">About Embeddly →</Link>
          <Link to="/trainer" className="text-primary hover:underline">Meet the trainer →</Link>
        </div>
      </Section>
      <CTA />
    </>
  );
}
