import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, CTA } from "@/components/site";
import { meta } from "@/lib/site";

export const Route = createFileRoute("/experience")({
  staticData: { sitemap: true },
  head: () => meta("Learning Experience — Embeddly", "How Embeddly students go from components to circuits, PCBs, testing and working prototypes."),
  component: Experience,
});

const steps = [
  ["Components", "Get to know the parts in your 30+ component kit and what each one does."],
  ["Circuits", "Assemble circuits, make connections, and see concepts come alive."],
  ["PCB", "Design a board and follow the path from layout to fabrication."],
  ["Testing", "Measure, debug and troubleshoot real hardware issues."],
  ["Prototype", "Bring it together into a working, mentor-reviewed prototype."],
];

function Experience() {
  return (
    <>
      <PageHero eyebrow="Learning experience" title="Learn by Building. Build by Doing.">
        Every day is spent at the bench — experimenting, building and fixing, guided by a mentor.
      </PageHero>
      <Section>
        <ol className="relative space-y-10 border-l border-primary/30 pl-8">
          {steps.map(([t, d], i) => (
            <li key={t} className="relative">
              <span className="absolute -left-[45px] grid h-7 w-7 place-items-center rounded-full border border-primary bg-background font-display text-xs text-primary">{i + 1}</span>
              <h3 className="text-2xl font-semibold">{t}</h3>
              <p className="mt-2 max-w-xl text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
      </Section>
      <CTA />
    </>
  );
}
