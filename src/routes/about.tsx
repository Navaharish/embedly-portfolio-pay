import { createFileRoute } from "@tanstack/react-router";
import pcb from "@/assets/pcb-layout.png.asset.json";
import { PageHero, Section, CTA } from "@/components/site";
import { meta } from "@/lib/site";

export const Route = createFileRoute("/about")({
  staticData: { sitemap: true },
  head: () => meta("About Embeddly — Beyond Theory, Into Real Hardware", "Embeddly is a hands-on technical learning initiative by Squaroots Technology LLP."),
  component: About,
});

function About() {
  return (
    <>
      <PageHero eyebrow="About Embeddly" title="Beyond Theory. Into Real Hardware." />
      <Section>
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-5 text-lg text-muted-foreground">
            <p>Embeddly is a hands-on technical learning initiative by Squaroots Technology LLP. Our focus is to help students develop practical engineering skills through electronics, embedded systems, PCB development, and guided hardware projects.</p>
            <p>We believe students understand technology better when they experiment, build circuits, test ideas, troubleshoot failures, and turn concepts into working prototypes.</p>
          </div>
          <img src={pcb.url} alt="PCB layout design" loading="lazy" className="rounded-lg border border-border" />
        </div>
      </Section>
      <Section className="pt-0">
        <div className="grid gap-6 md:grid-cols-3">
          {["Learn by Doing", "Build Real Hardware", "Develop Practical Engineering Skills"].map((t, i) => (
            <div key={t} className="rounded-lg border border-border bg-card p-6">
              <span className="font-display text-sm text-primary">0{i + 1}</span>
              <h3 className="mt-3 text-xl font-semibold">{t}</h3>
            </div>
          ))}
        </div>
      </Section>
      <CTA />
    </>
  );
}
