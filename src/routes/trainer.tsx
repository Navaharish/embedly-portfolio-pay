import { createFileRoute } from "@tanstack/react-router";
import trainer from "@/assets/trainer.png.asset.json";
import nasa from "@/assets/nasa-certificate.png.asset.json";
import kalam from "@/assets/kalam-award.png.asset.json";
import cert from "@/assets/world-record-certificate.png.asset.json";
import femto from "@/assets/femto-satellite.png.asset.json";
import news from "@/assets/newspaper.png.asset.json";
import { PageHero, Section, CTA } from "@/components/site";
import { meta, LINKEDIN_URL } from "@/lib/site";

export const Route = createFileRoute("/trainer")({
  staticData: { sitemap: true },
  head: () => meta("Trainer Akshay V — Embeddly", "Meet Akshay V, co-founder of Squaroots Technology LLP and world record holder for the smallest, lightest wooden femto-category satellite."),
  component: Trainer,
});

const highlights = [
  "NASA \"Scientist for a Day\" (2020–2021)",
  "Co-founder, Squaroots Technology LLP",
  "Kalam's World Record: world's smallest & lightest wooden femto-category satellite",
  "7+ years of hardware expertise",
];

const gallery = [
  [kalam.url, "Receiving the Kalam's World Records award"],
  [cert.url, "Kalam's World Records certificate"],
  [femto.url, "Femto-category satellite"],
  [nasa.url, "NASA Scientist for a Day certificate"],
  [news.url, "Newspaper coverage"],
];

function Trainer() {
  return (
    <>
      <PageHero eyebrow="Trainer" title="Learn with Experienced Technical Guidance" />
      <Section>
        <div className="grid items-center gap-12 md:grid-cols-[320px_1fr]">
          <img src={trainer.url} alt="Akshay V" className="aspect-square w-full rounded-lg border border-border object-cover" />
          <div>
            <h2 className="text-4xl font-bold">Akshay V</h2>
            <ul className="mt-6 space-y-3">
              {highlights.map((h) => (
                <li key={h} className="flex gap-3 text-muted-foreground"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{h}</li>
              ))}
            </ul>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block text-primary hover:underline">View LinkedIn profile →</a>
          </div>
        </div>
      </Section>
      <Section className="pt-0">
        <h2 className="text-3xl font-bold">Achievements</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map(([src, alt]) => (
            <figure key={alt} className="overflow-hidden rounded-lg border border-border bg-card">
              <img src={src} alt={alt} loading="lazy" className="aspect-[4/3] w-full bg-muted object-contain" />
              <figcaption className="p-4 text-sm text-muted-foreground">{alt}</figcaption>
            </figure>
          ))}
        </div>
      </Section>
      <CTA />
    </>
  );
}
