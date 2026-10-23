import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Sparkles, User, ExternalLink } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { personal, education, experience, skills, projects, contact } from "../data/portfolioData.js";
import { trackAiQuestion } from "../utils/visitorTracker.js";

const KNOWLEDGE = {
  education: {
    en: "🎓 **Ayoub's Academic Background:**\n- **Master d'Excellence in Actuarial Science & Data Science** at FEG Settat (Nov 2025).\n- **Licence d'Excellence in Actuarial Science & Artificial Intelligence** at FEG Settat (2024–2025).\n- **Digital Infrastructure Diploma** (Networks & Systems) at OFPPT Ifrane (2022–2024).",
    fr: "🎓 **Formation d'Ayoub Khalal :**\n- **Master d'Excellence en Actuariat & Data Science** à la FEG de Settat (Nov 2025).\n- **Licence d'Excellence en Actuariat & Intelligence Artificielle** à la FEG Settat (2024–2025).\n- **Diplôme en Infrastructure Digitale** (Réseaux & Systèmes) à l'OFPPT Ifrane (2022–2024).",
    ar: "🎓 **المسار الدراسي لأيوب خلال:**\n- **ماستر التميز في العلوم الأكتوارية وعلوم البيانات** — كلية الاقتصاد والتدبير بسطات (2025).\n- **إجازة التميز في العلوم الأكتوارية والذكاء الاصطناعي** — كلية الاقتصاد والتدبير بسطات (2024–2025).\n- **دبلوم البنية التحتية الرقمية (مسار الشبكات والأنظمة)** — مكتب التكوين المهني بإفران (2022–2024).",
  },
  skills: {
    en: "💡 **Ayoub's Core Technical Skills:**\n- **Data Science & ML:** Python, Pandas, Scikit-learn, TensorFlow, NumPy.\n- **Actuarial Science:** Risk theory, Insurance Pricing, Credibility theory, Bayesian methods, Survival analysis.\n- **Artificial Intelligence:** PyTorch, Keras, Hugging Face, LangChain, RAG architectures.\n- **Big Data & Cloud:** Apache Spark, PySpark, Hadoop, AWS, Azure.\n- **Systems & Infrastructure:** Linux, Windows Server, Cisco CCNA, Cybersecurity.",
    fr: "💡 **Compétences clés d'Ayoub :**\n- **Data Science & ML :** Python, Pandas, Scikit-learn, TensorFlow, NumPy.\n- **Actuariat & Statistiques :** Théorie du risque, Tarification d'assurance, Théorie de la crédibilité, Méthodes bayésiennes.\n- **Intelligence Artificielle :** PyTorch, Hugging Face, LangChain, agents LLM et RAG.\n- **Big Data & Cloud :** Apache Spark, PySpark, Hadoop, AWS, Azure.\n- **Systèmes & Réseaux :** Linux, Windows Server, Cisco CCNA, Cybersécurité.",
    ar: "💡 **أبرز المهارات التقنية لأيوب:**\n- **علوم البيانات والتعلم الآلي:** Python, Pandas, Scikit-learn, TensorFlow, NumPy.\n- **العلوم الأكتوارية والإحصاء:** نظرية المخاطر، التسعير التأميني، نظرية المصداقية، التحليل البايزي.\n- **الذكاء الاصطناعي:** PyTorch, Hugging Face, LangChain, بناء وكلاء الذكاء الاصطناعي RAG.\n- **البيانات الضخمة والحوسبة السحابية:** Apache Spark, PySpark, Hadoop, AWS, Azure.",
  },
  experience: {
    en: "💼 **Ayoub's Professional Experience:**\n1. **GAO Tek (New York, Remote · Ongoing):** Data collection, web scraping, and data mining for enterprise projects.\n2. **CNSS (National Social Security Fund):** Verification and management of insured members' files; administrative digitization.\n3. **Ifrane Municipality:** HR database design and implementation; network security maintenance.",
    fr: "💼 **Expériences professionnelles :**\n1. **GAO Tek (New York, Télétravail · En cours) :** Collecte et data mining pour des projets internationaux.\n2. **CNSS :** Gestion et vérification des dossiers d'assurés, contribution aux processus de digitalisation.\n3. **Commune d'Ifrane :** Conception d'une base de données RH et sécurisation des infrastructures réseaux.",
    ar: "💼 **الخبرات المهنية لأيوب:**\n1. **شركة GAO Tek (نيويورك - عن بعد · مستمر):** جمع وتعدين البيانات لمشاريع دولية.\n2. **الصندوق الوطني للضمان الاجتماعي (CNSS):** تدقيق ملفات المنخرطين والمساهمة في الرقمنة.\n3. **جماعة إفران:** تصميم قاعدة بيانات للموارد البشرية وصيانة أمن الشبكات.",
  },
  projects: {
    en: "📊 **Key Projects:**\n1. **NVIDIA Stock Price Forecasting:** Time series financial prediction using statistical ARIMA and machine learning models.\n2. **Bank Customer Risk Classification:** Credit risk default classifier achieving a **92% ROC-AUC** score.\n3. **HR & Labor Law AI Assistant:** Conversational RAG AI chatbot trained on Moroccan labor regulations.",
    fr: "📊 **Principaux Projets :**\n1. **Prévision de l'action NVIDIA :** Modélisation prédictive par séries temporelles financières.\n2. **Classification du Risque Client Bancaire :** Modèle de prédiction du défaut de paiement avec un score **ROC-AUC de 92%**.\n3. **Assistant IA Droit du Travail & RH :** Agent conversationnel RAG spécialisé dans les réglementations juridiques.",
    ar: "📊 **أبرز المشاريع المنجزة:**\n1. **التنبؤ بأسعار أسهم NVIDIA:** نموذج بالسلاسل الزمنية لتحليل اتجاهات وتقلبات الأسواق المالية.\n2. **تصنيف مخاطر عملاء الأبناك:** نموذج تعلم آلي لتوقع التعثر في سداد القروض بدقة **92% ROC-AUC**.\n3. **مساعد الذكاء الاصطناعي لقانون الشغل:** وكيل ذكي بنظام RAG للإجابة الدقيقة على استفسارات قانون العمل.",
  },
  contact: {
    en: `📞 **Contact Ayoub:**\n- **Email:** ${personal.email}\n- **Phone:** ${personal.phone}\n- **LinkedIn:** [Ayoub Khalal](${personal.linkedinUrl})\n- **Location:** ${personal.location}\n- Feel free to also use the contact form at the bottom of the page!`,
    fr: `📞 **Contacter Ayoub :**\n- **Email :** ${personal.email}\n- **Téléphone :** ${personal.phone}\n- **LinkedIn :** [Ayoub Khalal](${personal.linkedinUrl})\n- **Ville :** ${personal.location}\n- Vous pouvez également utiliser le formulaire de contact en bas de page !`,
    ar: `📞 **معلومات التواصل مع أيوب:**\n- **البريد الإلكتروني:** ${personal.email}\n- **رقم الهاتف:** ${personal.phone}\n- **LinkedIn:** [Ayoub Khalal](${personal.linkedinUrl})\n- **الموقع:** إفران، المغرب.\n- يمكنك أيضاً مراسلته مباشرة عبر نموذج المراسلة في أسفل الصفحة!`,
  },
};

function answerQuery(query, lang = "en") {
  const q = query.toLowerCase();

  if (/education|etude|formation|master|licence|diplome|ecole|feg|settat|univ|دراسة|ماستر|إجازة|دبلوم/i.test(q)) {
    return KNOWLEDGE.education[lang] || KNOWLEDGE.education.en;
  }
  if (/skill|competence|techno|python|machine learning|actuariat|stat|deep learning|spark|sql|مهارات|تقنيات/i.test(q)) {
    return KNOWLEDGE.skills[lang] || KNOWLEDGE.skills.en;
  }
  if (/experience|stage|travail|job|gao|cnss|ifrane|work|intern|خبرة|تدريب|عمل/i.test(q)) {
    return KNOWLEDGE.experience[lang] || KNOWLEDGE.experience.en;
  }
  if (/project|projet|nvidia|bank|banque|risk|risq|bourse|assistant|rag|مشروع|مشاريع/i.test(q)) {
    return KNOWLEDGE.projects[lang] || KNOWLEDGE.projects.en;
  }
  if (/contact|email|mail|phone|tele|reach|linkedin|embauche|recrut|message|تواصل|هاتف|إيميل/i.test(q)) {
    return KNOWLEDGE.contact[lang] || KNOWLEDGE.contact.en;
  }

  // Default helpful response
  if (lang === "fr") {
    return `Bonjour ! Je peux vous renseigner sur le parcours d'**Ayoub Khalal** :
- 🎓 Sa **formation** (Master Actuariat & Data Science)
- 💡 Ses **compétences** (Python, Machine Learning, Actuariat, Big Data)
- 💼 Ses **expériences** (GAO Tek, CNSS, Commune d'Ifrane)
- 📊 Ses **projets** (NVIDIA Stock, Bank Risk, Assistant IA)
- 📞 Ses coordonnées de **contact**

Cliquez sur l'une des suggestions ci-dessous ou posez votre question !`;
  }
  if (lang === "ar") {
    return `مرحباً بك! يسعدني إفادتك بأي معلومة عن **أيوب خلال**:
- 🎓 **مساره الأكاديمي** (ماستر التميز في الأكتواريا وعلوم البيانات)
- 💡 **مهاراته التقنية** (Python, التعلم الآلي, الإحصاء, البيانات الضخمة)
- 💼 **خبراته المهنية** (GAO Tek New York, CNSS, جماعة إفران)
- 📊 **مشاريعه المنجزة** (توقع أسهم NVIDIA, مخاطر البنوك, مساعد قانون الشغل)
- 📞 **معلومات التواصل المباشر**`;
  }
  return `Hi! I can share details about **Ayoub Khalal**'s professional profile:
- 🎓 His **Education** (Master's in Actuarial Science & Data Science)
- 💡 His **Skills** (Python, Machine Learning, Actuarial modeling, Spark)
- 💼 His **Experience** (GAO Tek, CNSS, Municipality of Ifrane)
- 📊 His **Projects** (NVIDIA Forecasting, Credit Risk, AI Assistant)
- 📞 How to **Contact** him directly`;
}

export default function AiChatbot() {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text:
        lang === "fr"
          ? "Bonjour ! Je suis l'assistant IA d'Ayoub Khalal. Posez-moi vos questions sur ses compétences, études ou projets !"
          : lang === "ar"
          ? "مرحباً بك! أنا المساعد الذكي لأيوب خلال. تفضل بطرح أي سؤال حول دراسته أو مهاراته أو مشاريعه!"
          : "Hello! I am Ayoub Khalal's AI assistant. Ask me anything about his actuarial science background, ML skills, or projects!",
    },
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (textToSend = input) => {
    const text = textToSend.trim();
    if (!text) return;

    const userMsg = { sender: "user", text };
    const answer = answerQuery(text, lang);
    const aiMsg = { sender: "ai", text: answer };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput("");

    // Send question to Discord Webhook log
    trackAiQuestion(text, answer);
  };

  const suggestions = [
    { label: lang === "fr" ? "🎓 Formation" : lang === "ar" ? "🎓 المسار الدراسي" : "🎓 Education", query: "Tell me about education" },
    { label: lang === "fr" ? "💡 Compétences" : lang === "ar" ? "💡 المهارات" : "💡 Skills", query: "What are your core skills?" },
    { label: lang === "fr" ? "📊 Projets" : lang === "ar" ? "📊 المشاريع" : "📊 Projects", query: "Tell me about your projects" },
    { label: lang === "fr" ? "💼 Expériences" : lang === "ar" ? "💼 الخبرات" : "💼 Experience", query: "What is your work experience?" },
    { label: lang === "fr" ? "📞 Contact" : lang === "ar" ? "📞 التواصل" : "📞 Contact", query: "How to contact Ayoub?" },
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-teal to-teal/90 text-ink font-medium shadow-xl hover:shadow-teal/20 transition-all cursor-pointer border border-teal/40"
          aria-label="Open AI Assistant"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ink opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-ink" />
          </span>
          <Bot size={18} />
          <span className="text-xs font-mono font-semibold tracking-wide">
            {lang === "fr" ? "IA Assistant" : lang === "ar" ? "المساعد الذكي" : "Ask AI"}
          </span>
        </motion.button>
      </div>

      {/* Floating Chat Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed bottom-20 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[400px] h-[520px] max-h-[80vh] rounded-2xl border border-line bg-surface/95 backdrop-blur-xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-line bg-ink/40">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-teal/20 border border-teal/40 flex items-center justify-center text-teal">
                  <Bot size={17} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display text-sm font-medium text-text">
                      {lang === "fr" ? "Assistant IA d'Ayoub" : lang === "ar" ? "المساعد الذكي لأيوب" : "Ayoub's AI Assistant"}
                    </h3>
                    <Sparkles size={13} className="text-gold" />
                  </div>
                  <span className="text-[10px] font-mono text-teal flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                    Online • Actuarial & Data Science
                  </span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-muted hover:text-text transition-colors cursor-pointer"
                aria-label="Close Chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs leading-relaxed">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.sender === "ai" && (
                    <div className="w-6 h-6 rounded-full bg-teal/15 text-teal border border-teal/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot size={13} />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 whitespace-pre-line ${
                      m.sender === "user"
                        ? "bg-teal text-ink font-medium rounded-tr-none"
                        : "bg-ink/60 text-text/90 border border-line/60 rounded-tl-none shadow-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                  {m.sender === "user" && (
                    <div className="w-6 h-6 rounded-full bg-line text-muted flex items-center justify-center shrink-0 mt-0.5">
                      <User size={13} />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-3 py-2 border-t border-line/40 bg-ink/20 flex gap-1.5 overflow-x-auto no-scrollbar">
              {suggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(s.query)}
                  className="shrink-0 px-2.5 py-1 rounded-full border border-line/70 bg-surface text-[11px] font-mono text-muted hover:border-teal hover:text-teal transition-colors cursor-pointer"
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t border-line bg-ink/40 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  lang === "fr"
                    ? "Posez une question sur Ayoub..."
                    : lang === "ar"
                    ? "اطرح سؤالك هنا..."
                    : "Ask about Ayoub's background..."
                }
                className="flex-1 px-3.5 py-2 rounded-xl border border-line bg-surface text-xs text-text placeholder-muted/50 focus:border-teal focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-8 h-8 rounded-xl bg-teal text-ink flex items-center justify-center disabled:opacity-40 hover:bg-white transition-colors cursor-pointer shrink-0"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
