import { useState } from "react";
import { Mail, Linkedin, Github, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { contact, personal } from "../data/portfolioData.js";
import { sendContactMessage } from "../utils/visitorTracker.js";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";

export default function Contact() {
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("sending");
    const success = await sendContactMessage(formData);
    if (success) {
      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-surface/40">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeading eyebrow="08" title={t(contact.heading)} sub={t(contact.sub)} />

        {/* Quick Contact Badges */}
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

        {/* Interactive Direct Message Form */}
        <Reveal delay={0.2} className="mt-10 max-w-2xl">
          <div className="rounded-2xl border border-line bg-surface/90 p-6 sm:p-8 backdrop-blur-sm shadow-lg">
            <h3 className="font-display text-xl font-medium text-text mb-2">
              {lang === "fr" ? "Envoyez-moi un message direct" : "Send Me a Direct Message"}
            </h3>
            <p className="text-xs text-muted mb-6">
              {lang === "fr"
                ? "Le message me parviendra instantanément sur mes notifications privées."
                : "The message will be delivered directly to my private live notifications."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-muted uppercase mb-1.5">
                    {lang === "fr" ? "Nom complet *" : "Full Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={lang === "fr" ? "Votre nom" : "Your name"}
                    className="w-full px-4 py-2.5 rounded-xl border border-line bg-ink/60 text-sm text-text placeholder-muted/50 focus:border-teal focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-muted uppercase mb-1.5">
                    {lang === "fr" ? "Adresse email *" : "Email Address *"}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@domain.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-line bg-ink/60 text-sm text-text placeholder-muted/50 focus:border-teal focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-muted uppercase mb-1.5">
                  {lang === "fr" ? "Message *" : "Message *"}
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={
                    lang === "fr"
                      ? "Parlez-moi de votre projet ou opportunité..."
                      : "Tell me about your project, idea or opportunity..."
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-line bg-ink/60 text-sm text-text placeholder-muted/50 focus:border-teal focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="submit"
                  disabled={status === "sending" || status === "sent"}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-teal text-ink font-medium text-sm hover:bg-white transition-all disabled:opacity-60 shadow-md cursor-pointer"
                >
                  {status === "sending" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-ink border-t-transparent rounded-full animate-spin" />
                      {lang === "fr" ? "Envoi..." : "Sending..."}
                    </>
                  ) : status === "sent" ? (
                    <>
                      <CheckCircle2 size={16} />
                      {lang === "fr" ? "Envoyé avec succès !" : "Message Sent !"}
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      {lang === "fr" ? "Envoyer le message" : "Send Message"}
                    </>
                  )}
                </button>

                {status === "sent" && (
                  <span className="text-xs text-teal font-mono animate-fade-in">
                    {lang === "fr" ? "Merci ! Je vous répondrai très vite." : "Thank you! I will reply soon."}
                  </span>
                )}
                {status === "error" && (
                  <span className="text-xs text-rose-400 font-mono">
                    {lang === "fr" ? "Erreur. Veuillez réessayer." : "Error. Please try again."}
                  </span>
                )}
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
