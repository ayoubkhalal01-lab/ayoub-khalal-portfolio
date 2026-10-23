import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, Layers, Target, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { projects } from "../data/portfolioData.js";
import { trackProjectView } from "../utils/visitorTracker.js";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";

export default function Projects() {
  const { t, lang } = useLanguage();
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = (index, project) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
      try {
        trackProjectView(t(project.title));
      } catch (e) {
        console.debug(e);
      }
    }
  };

  return (
    <section id="projects" className="py-20 md:py-28 bg-surface/40 relative z-10">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeading eyebrow="05" title={t(projects.heading)} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
          {projects.items.map((p, i) => {
            const isExpanded = expandedIndex === i;

            return (
              <Reveal key={i} delay={i * 0.08} className="w-full">
                <div
                  className={`rounded-2xl border transition-all duration-300 p-6 bg-surface shadow-md ${
                    isExpanded
                      ? "border-teal/60 ring-1 ring-teal/30 bg-surface/95"
                      : "border-line hover:border-teal/40 hover:-translate-y-1"
                  }`}
                >
                  {/* Card Header */}
                  <div>
                    <div className="flex items-start justify-between">
                      <h3 className="font-display text-lg font-medium leading-snug pr-3 text-text">
                        {t(p.title)}
                      </h3>
                      <div className="w-7 h-7 rounded-full border border-line flex items-center justify-center text-muted shrink-0 mt-0.5">
                        <ArrowUpRight size={15} />
                      </div>
                    </div>
                    <p className="text-sm text-muted mt-2.5 leading-relaxed">{t(p.desc)}</p>
                  </div>

                  {/* Tech stack tags */}
                  <div className="mt-5 flex flex-wrap gap-1.5 pt-3 border-t border-line/40">
                    {p.tech.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] text-gold border border-gold/25 rounded-full px-2.5 py-0.5 bg-gold/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Interactive Toggle Button */}
                  <button
                    type="button"
                    onClick={() => handleToggle(i, p)}
                    className={`mt-5 w-full py-2.5 rounded-xl border text-xs font-mono transition-all flex items-center justify-center gap-2 cursor-pointer font-medium ${
                      isExpanded
                        ? "bg-teal text-ink border-teal shadow-md"
                        : "border-teal/40 bg-teal/10 text-teal hover:bg-teal hover:text-ink"
                    }`}
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp size={14} />
                        {lang === "fr"
                          ? "Masquer l'étude de cas"
                          : lang === "ar"
                          ? "إخفاء دراسة الحالة"
                          : "Hide Case Study"}
                      </>
                    ) : (
                      <>
                        <Sparkles size={14} />
                        {lang === "fr"
                          ? "Voir l'étude de cas"
                          : lang === "ar"
                          ? "عرض دراسة الحالة"
                          : "View Case Study"}
                        <ChevronDown size={14} />
                      </>
                    )}
                  </button>

                  {/* Smooth Inline Expandable Case Study Drawer */}
                  <AnimatePresence>
                    {isExpanded && p.caseStudy && (
                      <motion.div
                        key="case-study-details"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="mt-5 pt-5 border-t border-line space-y-3.5 text-xs leading-relaxed">
                          {/* Problem */}
                          <div className="rounded-xl border border-line/60 bg-[#090c12]/70 p-3.5">
                            <div className="flex items-center gap-1.5 text-gold font-mono uppercase mb-1 font-semibold text-[11px]">
                              <Target size={13} />
                              {lang === "fr"
                                ? "La Problématique"
                                : lang === "ar"
                                ? "الإشكالية والهدف"
                                : "The Challenge"}
                            </div>
                            <p className="text-text/90">
                              {p.caseStudy[lang]?.problem || p.caseStudy.en?.problem}
                            </p>
                          </div>

                          {/* Methodology */}
                          <div className="rounded-xl border border-line/60 bg-[#090c12]/70 p-3.5">
                            <div className="flex items-center gap-1.5 text-teal font-mono uppercase mb-1 font-semibold text-[11px]">
                              <Layers size={13} />
                              {lang === "fr"
                                ? "Méthodologie & Solution"
                                : lang === "ar"
                                ? "المنهجية والحل"
                                : "Methodology & Solution"}
                            </div>
                            <p className="text-text/90">
                              {p.caseStudy[lang]?.methodology || p.caseStudy.en?.methodology}
                            </p>
                          </div>

                          {/* Results */}
                          <div className="rounded-xl border border-teal/40 bg-teal/10 p-3.5">
                            <div className="flex items-center gap-1.5 text-teal font-mono uppercase mb-1 font-semibold text-[11px]">
                              <CheckCircle2 size={13} />
                              {lang === "fr"
                                ? "Résultats & Impact"
                                : lang === "ar"
                                ? "النتائج والتأثير"
                                : "Key Results & Impact"}
                            </div>
                            <p className="text-text/90 font-medium">
                              {p.caseStudy[lang]?.results || p.caseStudy.en?.results}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
