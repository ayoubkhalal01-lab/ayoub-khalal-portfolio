import { Mail, Linkedin, Github, MapPin, Phone } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { contact, personal } from "../data/portfolioData.js";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20 md:py-28 bg-surface/40">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeading eyebrow="08" title={t(contact.heading)} sub={t(contact.sub)} />

        <Reveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl">
          <a
            href={`mailto:${personal.email}`}
            className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3.5 hover:border-teal/50 transition-colors"
          >
            <Mail size={16} className="text-teal shrink-0" />
            <span className="text-sm truncate">{personal.email}</span>
          </a>

          <a
            href={personal.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3.5 hover:border-teal/50 transition-colors"
          >
            <Github size={16} className="text-teal shrink-0" />
            <span className="text-sm truncate">{personal.githubLabel}</span>
          </a>

          <a
            href={personal.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3.5 hover:border-teal/50 transition-colors"
          >
            <Linkedin size={16} className="text-teal shrink-0" />
            <span className="text-sm truncate">{personal.linkedinLabel}</span>
          </a>

          <span className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3.5">
            <Phone size={16} className="text-teal shrink-0" />
            <span className="text-sm truncate font-mono">{personal.phone}</span>
          </span>
        </Reveal>

        <Reveal delay={0.1} className="mt-3 flex items-center gap-2 text-muted text-sm max-w-4xl">
          <MapPin size={14} />
          {personal.location}
        </Reveal>
      </div>
    </section>
  );
}
