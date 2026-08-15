import { Award, Languages as LangIcon } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { certifications, languages } from "../data/portfolioData.js";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";

export default function CertsAndLanguages() {
  const { t, lang } = useLanguage();

  return (
    <section id="certifications" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-14">
        <div>
          <SectionHeading eyebrow="06" title={t(certifications.heading)} />
          <div className="space-y-3">
            {certifications.items.map((c, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3">
                  <Award size={16} className="text-gold shrink-0" />
                  <div>
                    <div className="text-sm font-medium">{t(c.name)}</div>
                    {c.org && <div className="text-xs text-muted">{c.org}</div>}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          <SectionHeading eyebrow="07" title={t(languages.heading)} />
          <Reveal className="flex flex-wrap gap-2">
            {languages.items.map((l, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm"
              >
                <LangIcon size={14} className="text-teal" />
                {l[lang]}
              </span>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
