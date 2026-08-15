import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { nav, personal } from "../data/portfolioData.js";

const ids = ["home", "about", "education", "experience", "skills", "projects", "certifications", "contact"];

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const labels = nav[lang];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink/85 backdrop-blur-md border-b border-line" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <a href="#home" className="font-display text-sm tracking-wide text-text">
          AK<span className="text-teal">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {ids.map((id, i) => (
            <a
              key={id}
              href={`#${id}`}
              className={`relative text-[13px] font-medium tracking-wide transition-colors ${
                active === id ? "text-text" : "text-muted hover:text-text"
              }`}
            >
              {labels[i]}
              {active === id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute -bottom-2 left-0 right-0 h-px bg-teal"
                />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Quick CV Download in Navbar */}
          <a
            href={lang === "fr" ? personal.cvFr : personal.cvEn}
            download={lang === "fr" ? "CV_Ayoub_Khalal_FR.pdf" : "CV_Ayoub_Khalal_EN.pdf"}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-teal/30 bg-teal/10 text-xs font-mono text-teal hover:bg-teal hover:text-ink transition-colors"
            title="Download CV"
          >
            <Download size={13} />
            CV {lang.toUpperCase()}
          </a>

          <div className="hidden sm:flex items-center rounded-full border border-line p-0.5 font-mono text-[11px]">
            {["fr", "en"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`relative px-2.5 py-1 rounded-full transition-colors ${
                  lang === l ? "text-ink" : "text-muted hover:text-text"
                }`}
              >
                {lang === l && (
                  <motion.span
                    layoutId="lang-pill"
                    className="absolute inset-0 rounded-full bg-teal"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative uppercase">{l}</span>
              </button>
            ))}
          </div>

          <button className="md:hidden text-text" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu size={20} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink/98 z-50 md:hidden flex flex-col overflow-y-auto"
          >
            <div className="flex items-center justify-between h-16 px-5 border-b border-line shrink-0">
              <span className="font-display text-sm">AK<span className="text-teal">.</span></span>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X size={22} />
              </button>
            </div>

            <div className="flex flex-col gap-1 px-5 py-4">
              {ids.map((id, i) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className="py-3 text-lg font-display border-b border-line text-text/90"
                >
                  {labels[i]}
                </a>
              ))}

              <div className="flex flex-col gap-3 mt-6">
                <div className="text-xs font-mono text-muted uppercase">Download CV</div>
                <div className="flex gap-2">
                  <a
                    href={personal.cvFr}
                    download="CV_Ayoub_Khalal_FR.pdf"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2 rounded-lg border border-teal/40 bg-teal/10 text-xs font-mono text-teal"
                  >
                    <Download size={14} /> CV FR
                  </a>
                  <a
                    href={personal.cvEn}
                    download="CV_Ayoub_Khalal_EN.pdf"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2 rounded-lg border border-gold/40 bg-gold/10 text-xs font-mono text-gold"
                  >
                    <Download size={14} /> CV EN
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-6">
                {["fr", "en"].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-4 py-1.5 rounded-full font-mono text-xs uppercase border ${
                      lang === l ? "bg-teal text-ink border-teal" : "border-line text-muted"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
