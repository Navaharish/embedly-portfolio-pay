import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageHero, Section, CTA } from "@/components/site";
import { meta } from "@/lib/site";

export const Route = createFileRoute("/faq")({
  staticData: { sitemap: true },
  head: () => meta("FAQ — Embeddly Hardware Internship", "Answers about duration, venue, seats and what you receive in the Embeddly hardware internship."),
  component: Faq,
});

const faqs = [
  ["How long is the program?", "Approximately two weeks."],
  ["When does it start?", "The proposed start is late November 2026. The exact date will be confirmed to registered students."],
  ["Is it online or offline?", "Offline, hands-on learning."],
  ["Where is it held?", "Sai Foundation, Sona College of Technology, Salem, Tamil Nadu."],
  ["How many seats are there?", "The first batch is limited to 24 students."],
  ["What do I receive?", "A 30+ electronics component kit, mentor guidance and an internship certificate."],
  ["How do I register?", "Use any \"Register Your Interest\" button on this site to fill our registration form — we'll get back to you with the next steps."],
] as const;

function Faq() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Questions, answered." />
      <Section>
        <Accordion type="single" collapsible className="max-w-3xl">
          {faqs.map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="text-left text-lg">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>
      <CTA />
    </>
  );
}
