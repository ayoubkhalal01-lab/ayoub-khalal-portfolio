import { Briefcase } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { experience } from "../data/portfolioData.js";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";

export default function Experience() {
  const { t, lang } = useLanguage();

  return (
    <section id="experience" className="py-20 md:py-28 bg-surface/40">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeading eyebrow="03" title={t(experience.heading)} />

        <div className="relative border-l border-line pl-8 space-y-10 max-w-2xl">
          {experience.items.map((item, i) => (
            <Reveal key={i} delay={i * 0.08} className="relative">
              <span className="absolute -left-[38px] top-1 w-4 h-4 rounded-full bg-ink border-2 border-gold grid place-items-center">
                <Briefcase size={9} className="text-gold" />
              </span>
              <div className="font-mono text-xs text-gold">{t(item.date)}</div>
              <h3 className="font-display text-lg mt-1">
                {t(item.role)} <span className="text-muted">— {t(item.org)}</span>
              </h3>
              <ul className="mt-2 space-y-1">
                {item.points[lang].map((pt, j) => (
                  <li key={j} className="text-sm text-muted flex gap-2">
                    <span className="text-teal">·</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
