import { useLanguage } from "../context/LanguageContext.jsx";
import { about } from "../data/portfolioData.js";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";

export default function About() {
  const { t, lang } = useLanguage();
  const paragraphs = about.paragraphs[lang];

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeading eyebrow="01" title={t(about.heading)} />

        <div className="grid md:grid-cols-5 gap-10 md:gap-16">
          <Reveal className="md:col-span-3 space-y-4">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-[15px] sm:text-base text-muted leading-relaxed">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.15} className="md:col-span-2 grid grid-cols-3 md:grid-cols-1 gap-4">
            {about.stats.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl border border-line bg-surface px-5 py-4 hover:border-teal/40 transition-colors"
              >
                <div className="font-display text-3xl text-gradient">{s.value}</div>
                <div className="text-xs text-muted mt-1 uppercase tracking-wide">{t(s.label)}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
