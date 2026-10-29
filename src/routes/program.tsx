import { createFileRoute } from "@tanstack/react-router";
import { Clock, CalendarDays, Hand, MapPin, Users, Package, GraduationCap, Award } from "lucide-react";
import { PageHero, Section, CTA, RegisterButton } from "@/components/site";
import { TrainerProfile } from "@/components/trainer-profile";
import { meta } from "@/lib/site";

export const Route = createFileRoute("/program")({
  staticData: { sitemap: true },
  head: () => meta("Hardware Internship Training Program — Embeddly", "Two-week offline, mentor-guided hardware internship in Salem: electronics, PCB design and fabrication, prototyping."),
  component: Program,
});

const details = [
  [Clock, "Duration", "Approximately 2 weeks"],
  [CalendarDays, "Start date", "Late November 2026 (proposed)"],
  [Hand, "Mode", "Offline, hands-on learning"],
  [MapPin, "Venue", "Sai Foundation, Sona College of Technology, Salem, Tamil Nadu"],
  [Users, "Batch capacity", "24 students only"],
] as const;

const learn = [
  ["Electronics Fundamentals", "Understand electronic components, circuit concepts, and how hardware systems work."],
  ["PCB Design and Fabrication", "Explore PCB design, board development, and turning a circuit design into a physical board."],
  ["Hands-on Hardware Development", "Work with a component kit, assemble circuits, test connections, and troubleshoot practical issues."],
  ["Guided Project Development", "Develop project skills through mentor guidance, experimentation, and prototype building."],
];

function Program() {
  return (
    <>
      <PageHero eyebrow="Featured program" title="Hardware Internship Training Program">
        A practical, mentor-guided learning experience for students interested in electronics and hardware development.
      </PageHero>
      <Section>
        <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
          {details.map(([I, k, v]) => (
            <div key={k} className="flex gap-4 bg-card p-6">
              <I className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{k}</div>
                <div className="mt-1 font-medium">{v}</div>
              </div>
            </div>
          ))}
          <div className="flex items-center bg-card p-6"><RegisterButton /></div>
        </div>
      </Section>
      <Section className="pt-0">
        <h2 className="text-3xl font-bold md:text-4xl">From Components to Working Prototypes</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {learn.map(([t, d], i) => (
            <div key={t} className="rounded-lg border border-border bg-card p-7 transition-colors hover:border-primary/50">
              <span className="font-display text-sm text-primary">0{i + 1}</span>
              <h3 className="mt-3 text-xl font-semibold">{t}</h3>
              <p className="mt-2 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
        <h3 className="mt-16 text-2xl font-bold">What you get</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[[Package, "30+ electronics component kit"], [GraduationCap, "Mentor guidance"], [Award, "Internship certificate"]].map(([I, t]) => {
            const Icon = I as typeof Package;
            return (
              <div key={t as string} className="flex items-center gap-3 rounded-lg border border-border bg-card p-5">
                <Icon className="h-5 w-5 text-primary" /> {t as string}
              </div>
            );
          })}
        </div>
      </Section>
      <Section className="pt-0">
        <h2 className="text-3xl font-bold md:text-4xl">Who guides the batch</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">The same person runs the sessions end to end — so the guidance students get is hands-on, not just theoretical.</p>
        <div className="mt-8">
          <TrainerProfile eyebrow="Your trainer" />
        </div>
      </Section>
      <CTA />
    </>
  );
}
