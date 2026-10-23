import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { useLanguage } from "./context/LanguageContext.jsx";
import { seo } from "./data/portfolioData.js";
import { trackVisitor } from "./utils/visitorTracker.js";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Education from "./components/Education.jsx";
import Experience from "./components/Experience.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import CertsAndLanguages from "./components/CertsAndLanguages.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import AiChatbot from "./components/AiChatbot.jsx";

export default function App() {
  const { t, lang } = useLanguage();

  useEffect(() => {
    document.title = t(seo.title);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t(seo.description));
  }, [lang, t]);

  useEffect(() => {
    trackVisitor();
  }, []);

  return (
    <div className="relative">
      <div className="grain" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Skills />
        <Projects />
        <CertsAndLanguages />
        <Contact />
      </main>
      <Footer />
      <AiChatbot />
      <Analytics />
    </div>
  );
}
