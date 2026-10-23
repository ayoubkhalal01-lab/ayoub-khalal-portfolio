import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Sparkles, Layers, Target, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { projects } from "../data/portfolioData.js";
import { trackProjectView } from "../utils/visitorTracker.js";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";

export default function Projects() {
  const { t, lang } = useLanguage();
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    try {
      trackProjectView(t(project.title));
    } catch (e) {
      console.debug(e);
    }
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  // Close on ESC key
  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleCloseModal();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  return (
    <section id="projects" className="py-20 md:py-28 bg-surface/40">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeading eyebrow="05" title={t(projects.heading)} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.items.map((p, i) => (
            <Reveal key={i} delay={i * 0.08} className="h-full">
              <div
                onClick={() => handleOpenModal(p)}
                className="group h-full flex flex-col justify-between rounded-2xl border border-line bg-surface p-6 hover:border-teal/50 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-teal/10"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <h3 className="font-display text-lg leading-snug pr-4 group-hover:text-teal transition-colors">
                      {t(p.title)}
                    </h3>
                    <div className="w-7 h-7 rounded-full border border-line flex items-center justify-center text-muted group-hover:border-teal group-hover:text-teal transition-colors shrink-0 mt-0.5">
                      <ArrowUpRight size={15} />
                    </div>
                  </div>
                  <p className="text-sm text-muted mt-2.5 leading-relaxed">{t(p.desc)}</p>
                </div>

                <div>
                  <div className="mt-5 flex flex-wrap gap-1.5 pt-2 border-t border-line/40">
                    {p.tech.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] text-gold border border-gold/25 rounded-full px-2.5 py-0.5 bg-gold/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenModal(p);
                    }}
                    className="mt-4 w-full py-2 rounded-xl border border-teal/40 bg-teal/10 text-xs font-mono text-teal group-hover:bg-teal group-hover:text-ink transition-all flex items-center justify-center gap-1.5 cursor-pointer font-medium"
                  >
                    <Sparkles size={13} />
                    {lang === "fr"
                      ? "Voir l'étude de cas"
                      : lang === "ar"
                      ? "عرض دراسة الحالة"
                      : "View Case Study"}
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Clean, robust Animated Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key="project-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleCloseModal}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
            style={{ zIndex: 9999 }}
          >
            <motion.div
              key="project-modal-dialog"
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-2xl border border-line bg-[#10141d] p-6 sm:p-8 shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-line">
                <div>
                  <span className="font-mono text-[11px] text-teal uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles size={13} />
                    {lang === "fr"
                      ? "Étude de cas détaillée"
                      : lang === "ar"
                      ? "دراسة حالة تفصيلية"
                      : "Project Case Study"}
                  </span>
                  <h2 className="font-display text-2xl font-medium mt-1 text-text">
                    {t(selectedProject.title)}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  aria-label="Close modal"
                  className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-muted hover:text-text hover:border-text transition-colors shrink-0 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Technologies pills */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {selectedProject.tech.map((tItem) => (
                  <span
                    key={tItem}
                    className="font-mono text-xs text-gold border border-gold/30 rounded-full px-3 py-1 bg-gold/5"
                  >
                    {tItem}
                  </span>
                ))}
              </div>

              {/* Case Study Details */}
              {selectedProject.caseStudy && (
                <div className="mt-6 space-y-4 text-sm leading-relaxed">
                  {/* Problem */}
                  <div className="rounded-xl border border-line/60 bg-[#090c12]/60 p-4">
                    <div className="flex items-center gap-2 text-gold font-mono text-xs uppercase mb-1.5 font-medium">
                      <Target size={14} />
                      {lang === "fr"
                        ? "La Problématique"
                        : lang === "ar"
                        ? "الإشكالية والهدف"
                        : "The Challenge"}
                    </div>
                    <p className="text-text/90">
                      {selectedProject.caseStudy[lang]?.problem ||
                        selectedProject.caseStudy.en?.problem ||
                        ""}
                    </p>
                  </div>

                  {/* Methodology */}
                  <div className="rounded-xl border border-line/60 bg-[#090c12]/60 p-4">
                    <div className="flex items-center gap-2 text-teal font-mono text-xs uppercase mb-1.5 font-medium">
                      <Layers size={14} />
                      {lang === "fr"
                        ? "Méthodologie & Architecture"
                        : lang === "ar"
                        ? "المنهجية والتقنيات"
                        : "Methodology & Architecture"}
                    </div>
                    <p className="text-text/90">
                      {selectedProject.caseStudy[lang]?.methodology ||
                        selectedProject.caseStudy.en?.methodology ||
                        ""}
                    </p>
                  </div>

                  {/* Results */}
                  <div className="rounded-xl border border-teal/30 bg-teal/10 p-4">
                    <div className="flex items-center gap-2 text-teal font-mono text-xs uppercase mb-1.5 font-medium">
                      <CheckCircle2 size={14} />
                      {lang === "fr"
                        ? "Résultats & Impact"
                        : lang === "ar"
                        ? "النتائج والتأثير"
                        : "Key Results & Impact"}
                    </div>
                    <p className="text-text/90 font-medium">
                      {selectedProject.caseStudy[lang]?.results ||
                        selectedProject.caseStudy.en?.results ||
                        ""}
                    </p>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="mt-7 pt-4 border-t border-line flex items-center justify-between">
                <span className="text-xs font-mono text-muted">
                  Ayoub Khalal • Data Science & Actuariat
                </span>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-5 py-2 rounded-full border border-line bg-surface hover:bg-white hover:text-ink text-xs font-medium transition-colors cursor-pointer"
                >
                  {lang === "fr" ? "Fermer" : lang === "ar" ? "إغلاق" : "Close"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
