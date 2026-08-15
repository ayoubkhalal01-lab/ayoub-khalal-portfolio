import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { projects } from "../data/portfolioData.js";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="py-20 md:py-28 bg-surface/40">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeading eyebrow="05" title={t(projects.heading)} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.items.map((p, i) => (
            <Reveal key={i} delay={i * 0.08} className="h-full">
              <div className="h-full flex flex-col justify-between rounded-2xl border border-line bg-surface p-6 hover:border-teal/40 hover:-translate-y-1 transition-all duration-300">
                <div>
                  <div className="flex items-start justify-between">
                    <h3 className="font-display text-lg leading-snug pr-4">{t(p.title)}</h3>
                    <ArrowUpRight size={16} className="text-muted shrink-0 mt-1" />
                  </div>
                  <p className="text-sm text-muted mt-2 leading-relaxed">{t(p.desc)}</p>
                </div>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.tech.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] text-gold border border-gold/25 rounded-full px-2 py-0.5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
