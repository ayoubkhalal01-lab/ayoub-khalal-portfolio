import { GraduationCap } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { education } from "../data/portfolioData.js";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";

export default function Education() {
  const { t } = useLanguage();

  return (
    <section id="education" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeading eyebrow="02" title={t(education.heading)} />

        <div className="relative border-l border-line pl-8 space-y-8 max-w-2xl">
          {education.items.map((item, i) => (
            <Reveal key={i} delay={i * 0.08} className="relative">
              <span className="absolute -left-[38px] top-1 w-4 h-4 rounded-full bg-ink border-2 border-teal grid place-items-center">
                <GraduationCap size={9} className="text-teal" />
              </span>
              <div className="font-mono text-xs text-gold">{t(item.date)}</div>
              <h3 className="font-display text-lg mt-1">{t(item.degree)}</h3>
              <p className="text-sm text-muted mt-1">{item.school}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
