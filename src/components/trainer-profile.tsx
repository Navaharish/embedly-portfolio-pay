import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Award, Rocket, Satellite } from "lucide-react";
import trainer from "@/assets/trainer.png.asset.json";
import { CountUp } from "@/components/count-up";
import { Button } from "@/components/ui/button";
import { LINKEDIN_URL } from "@/lib/site";

const trainerStats = [
  { icon: Rocket, n: 7, suffix: "+", label: "Years in hardware" },
  { icon: Satellite, text: "World Record", label: "Smallest wooden femto satellite" },
  { icon: Award, text: "NASA", label: "Scientist for a Day 2020–21" },
];

export function TrainerProfile({ eyebrow = "Meet your trainer" }: { eyebrow?: string }) {
  return (
    <div className="border-y border-border bg-muted py-10 md:py-12">
      <div className="relative grid items-center gap-10 md:grid-cols-[280px_1fr]">
        <div className="relative">
          <img src={trainer.url} alt="Akshay V, Embeddly trainer" className="relative aspect-square w-full rounded-lg object-cover" />
        </div>
        <div>
          <p className="text-sm font-semibold text-primary">{eyebrow}</p>
          <h3 className="mt-3 text-4xl font-bold">Akshay V</h3>
          <p className="mt-2 text-muted-foreground">Co-founder, Squaroots Technology LLP · Kalam's World Record holder for the world's smallest & lightest wooden femto-category satellite.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {trainerStats.map(({ icon: I, n, suffix, text, label }) => (
              <div key={label} className="border-l border-border pl-4 py-2">
                <I className="h-5 w-5 text-secondary" />
                <div className="mt-3 font-display text-2xl font-bold">{n !== undefined ? <CountUp to={n} suffix={suffix} /> : text}</div>
                <div className="mt-1 text-xs text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button asChild size="lg" className="h-auto min-h-12 whitespace-normal text-center"><Link to="/trainer">
              Full profile & achievements <ArrowUpRight className="h-4 w-4" />
            </Link></Button>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-secondary hover:underline">LinkedIn →</a>
          </div>
        </div>
      </div>
    </div>
  );
}
