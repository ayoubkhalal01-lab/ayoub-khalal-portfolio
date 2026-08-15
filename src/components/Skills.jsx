import {
  BrainCircuit,
  Sigma,
  Sparkles,
  Database,
  Cloud,
  Network,
  Code2,
  Wrench,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { skills } from "../data/portfolioData.js";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";

const ICONS = { BrainCircuit, Sigma, Sparkles, Database, Cloud, Network, Code2, Wrench };

function resolveChips(chips, lang) {
  if (Array.isArray(chips)) return chips;
  return chips[lang] ?? chips.en;
}

export default function Skills() {
  const { t, lang } = useLanguage();

  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeading eyebrow="04" title={t(skills.heading)} />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {skills.groups.map((g, i) => {
            const Icon = ICONS[g.icon];
            const chips = resolveChips(g.chips, lang);
            return (
              <Reveal key={i} delay={(i % 4) * 0.05} className="group">
                <div className="h-full rounded-2xl border border-line bg-surface p-5 hover:border-teal/50 hover:bg-surface-2 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-ink border border-line grid place-items-center text-teal group-hover:text-gold group-hover:border-gold/40 transition-colors">
                    <Icon size={18} strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display text-[15px] mt-3.5 leading-snug">{t(g.title)}</h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {chips.slice(0, 5).map((c) => (
                      <span
                        key={c}
                        className="font-mono text-[10px] text-muted border border-line rounded-full px-2 py-0.5"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
