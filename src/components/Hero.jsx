import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Linkedin, Github, Mail, Download } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { personal, hero } from "../data/portfolioData.js";
import HeroVisual, { AI_MODES } from "./HeroVisual.jsx";

export default function Hero() {
  const { t, lang } = useLanguage();
  const [activeMode, setActiveMode] = useState(0);

  const handleToggleMode = () => {
    setActiveMode((prev) => (prev + 1) % AI_MODES.length);
  };

  // Dynamic CV link based strictly on the current page language
  const activeCvFile = lang === "fr" ? personal.cvFr : personal.cvEn;
  const activeCvFileName = lang === "fr" ? "CV_Ayoub_Khalal_FR.pdf" : "CV_Ayoub_Khalal_EN.pdf";

  const altCvFile = lang === "fr" ? personal.cvEn : personal.cvFr;
  const altCvFileName = lang === "fr" ? "CV_Ayoub_Khalal_EN.pdf" : "CV_Ayoub_Khalal_FR.pdf";

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* 3D persistent background canvas — normal click anywhere on screen morphs AI 3D shape */}
      <HeroVisual activeMode={activeMode} onToggleMode={handleToggleMode} />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8 w-full pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-gold border border-gold/30 rounded-full px-3 py-1 bg-ink/40 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              {t(hero.eyebrow)}
            </span>

            {/* Subtle click hint */}
            <span className="inline-flex items-center gap-1 font-mono text-[11px] text-muted border border-line rounded-full px-3 py-1 bg-ink/40 backdrop-blur-sm">
              ✨ {t(hero.interactiveHint)}
            </span>
          </div>

          <h1 className="font-display mt-6 text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.05] tracking-tight">
            {personal.name}
          </h1>

          <p className="mt-4 text-lg sm:text-xl text-gradient font-display">
            {t(personal.title)}
          </p>

          <p className="mt-3 text-base text-muted max-w-md">
            {t(hero.intro)}
          </p>

          {/* Action buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="px-5 py-2.5 rounded-full bg-teal text-ink text-sm font-medium hover:bg-white transition-colors"
            >
              {t(hero.ctaPrimary)}
            </a>

            {/* Dynamic CV Download matching current page language */}
            <a
              href={activeCvFile}
              download={activeCvFileName}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-teal/50 bg-teal/10 text-sm font-medium text-teal hover:bg-teal hover:text-ink transition-all shadow-sm"
              title={`Download ${lang.toUpperCase()} CV`}
            >
              <Download size={16} />
              {t(hero.downloadCv)} ({lang.toUpperCase()})
            </a>

            {/* Link to download the alternative language version */}
            <a
              href={altCvFile}
              download={altCvFileName}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-line bg-surface/60 text-xs font-mono text-muted hover:text-gold hover:border-gold/40 transition-all"
            >
              <Download size={13} />
              {lang === "fr" ? "CV English (EN)" : "CV Français (FR)"}
            </a>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <a
              href="#about"
              className="px-4 py-2 rounded-full border border-line text-xs font-medium text-text hover:border-teal hover:text-teal transition-colors"
            >
              {t(hero.ctaSecondary)}
            </a>
            <a
              href="#contact"
              className="px-4 py-2 rounded-full border border-line text-xs font-medium text-text hover:border-gold hover:text-gold transition-colors"
            >
              {t(hero.ctaTertiary)}
            </a>

            <div className="flex items-center gap-1 ml-1">
              <a
                href={personal.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 grid place-items-center rounded-full border border-line text-muted hover:text-teal hover:border-teal transition-colors"
              >
                <Github size={16} />
              </a>
              <a
                href={personal.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                title={personal.linkedinLabel}
                aria-label="LinkedIn"
                className="w-9 h-9 grid place-items-center rounded-full border border-line text-muted hover:text-teal hover:border-teal transition-colors"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={`mailto:${personal.email}`}
                aria-label="Email"
                className="w-9 h-9 grid place-items-center rounded-full border border-line text-muted hover:text-teal hover:border-teal transition-colors"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted"
        aria-label="Scroll down"
      >
        <ArrowDown size={18} />
      </motion.a>
    </section>
  );
}
