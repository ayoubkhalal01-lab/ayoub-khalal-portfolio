// All content sourced strictly from Ayoub Khalal's EN/FR CVs. No invented facts.

export const personal = {
  name: "Ayoub Khalal",
  title: {
    en: "Actuarial Science & Data Science",
    fr: "Actuariat & Data Science",
  },
  subtitle: {
    en: "Artificial Intelligence · Digital Infrastructure",
    fr: "Intelligence Artificielle · Infrastructure Digitale",
  },
  location: "Ifrane, Morocco",
  email: "ayoub.khalal01@gmail.com",
  phone: "+212 614 230 328",
  linkedinLabel: "Ayoub Khalal",
  linkedinUrl: "https://www.linkedin.com/in/ayoub-khalal-36a762392/",
  githubLabel: "ayoubkhalal01-lab",
  githubUrl: "https://github.com/ayoubkhalal01-lab",
  cvFr: "/CV_Ayoub_Khalal_FR.pdf",
  cvEn: "/CV_Ayoub_Khalal_EN.pdf",
};

export const nav = {
  en: ["Home", "About", "Education", "Experience", "Skills", "Projects", "Certifications", "Contact"],
  fr: ["Accueil", "À propos", "Formation", "Expérience", "Compétences", "Projets", "Certifications", "Contact"],
};

export const hero = {
  eyebrow: { en: "Open to Work", fr: "Disponible pour de nouvelles opportunités" },
  intro: {
    en: "Modeling risk, building predictive systems.",
    fr: "Modéliser le risque, construire des systèmes prédictifs.",
  },
  ctaPrimary: { en: "View Projects", fr: "Voir mes projets" },
  ctaSecondary: { en: "About Me", fr: "À propos de moi" },
  ctaTertiary: { en: "Contact Me", fr: "Me contacter" },
  downloadCv: { en: "Download CV", fr: "Télécharger mon CV" },
  downloadCvAlt: { en: "Download FR version", fr: "Télécharger version EN" },
  interactiveHint: {
    en: "Click 3D visual directly to morph shape",
    fr: "Cliquer directement sur la forme 3D pour la modifier",
  },
};

export const about = {
  heading: { en: "About", fr: "À propos" },
  paragraphs: {
    en: [
      "Master's student in Actuarial Science & Data Science, blending insurance risk modeling with Python/R machine learning. Open to new career opportunities in Data Science, AI, Machine Learning, or Actuarial Science.",
    ],
    fr: [
      "Étudiant en Master Actuariat & Data Science, alliant modélisation du risque assurantiel et machine learning avec Python/R. Ouvert aux nouvelles opportunités professionnelles en Data Science, IA, Machine Learning ou Actuariat.",
    ],
  },
  stats: [
    { value: "3", label: { en: "Internships", fr: "Stages" } },
    { value: "3", label: { en: "Degrees", fr: "Diplômes" } },
    { value: "3", label: { en: "Languages", fr: "Langues" } },
  ],
};

export const education = {
  heading: { en: "Education", fr: "Formation" },
  items: [
    {
      degree: { en: "Master's Degree (Excellence Program) — Actuarial Science & Data Science", fr: "Master d'Excellence — Actuariat et Data Science" },
      school: "FEG, Settat",
      date: { en: "November 2025", fr: "Novembre 2025" },
    },
    {
      degree: { en: "Bachelor's Degree (Excellence Program) — Actuarial Science & Artificial Intelligence", fr: "Licence d'Excellence — Actuariat et Intelligence Artificielle" },
      school: "FEG, Settat",
      date: { en: "Nov 2024 – Jun 2025", fr: "Nov 2024 – Juin 2025" },
    },
    {
      degree: { en: "Digital Infrastructure Diploma — Networks & Systems Track", fr: "Diplôme Infrastructure Digitale — Option Réseaux et Systèmes" },
      school: "OFPPT, Ifrane",
      date: { en: "Sep 2022 – Jun 2024", fr: "Sept 2022 – Juin 2024" },
    },
  ],
};

export const experience = {
  heading: { en: "Experience", fr: "Expérience" },
  items: [
    {
      role: { en: "Intern", fr: "Stagiaire" },
      org: "GAO Tek (New York, USA – Remote)",
      date: { en: "Aug 2026 – Nov 2026 · Ongoing", fr: "Août 2026 – Nov 2026 · En cours" },
      points: {
        en: ["Contributing to data collection and data mining for company projects"],
        fr: ["Participation à la collecte de données et au data mining pour les projets de l'entreprise"],
      },
    },
    {
      role: { en: "Intern", fr: "Stagiaire" },
      org: "CNSS — National Social Security Fund",
      date: { en: "Jul 2025 – Aug 2025", fr: "Juil 2025 – Août 2025" },
      points: {
        en: ["Managed and verified insured members' files; contributed to digitalization"],
        fr: ["Gestion et vérification des dossiers d'assurés ; contribution à la digitalisation"],
      },
    },
    {
      role: { en: "Intern", fr: "Stagiaire" },
      org: { en: "Ifrane Municipality", fr: "Commune d'Ifrane" },
      date: { en: "Mar 2024 – Apr 2024", fr: "Mars 2024 – Avril 2024" },
      points: {
        en: ["Built an HR database; maintained network equipment and system security"],
        fr: ["Conception d'une base RH ; maintenance réseau et sécurité du système"],
      },
    },
  ],
};

export const skills = {
  heading: { en: "Skills", fr: "Compétences" },
  groups: [
    {
      icon: "BrainCircuit",
      title: { en: "Data Science & ML", fr: "Data Science & ML" },
      chips: ["Python", "Pandas", "Scikit-learn", "TensorFlow", "NumPy"],
    },
    {
      icon: "Sigma",
      title: { en: "Actuarial & Statistics", fr: "Actuariat & Statistiques" },
      chips: { en: ["Risk theory", "Pricing", "Credibility theory", "Bayesian methods", "Survival analysis"], fr: ["Théorie du risque", "Tarification", "Théorie de la crédibilité", "Méthodes bayésiennes", "Analyse de survie"] },
    },
    {
      icon: "Sparkles",
      title: { en: "Artificial Intelligence", fr: "Intelligence Artificielle" },
      chips: ["PyTorch", "Keras", "Hugging Face", "LangChain", "OpenAI API"],
    },
    {
      icon: "Database",
      title: { en: "Big Data", fr: "Big Data" },
      chips: ["Apache Spark", "PySpark", "Hadoop", "HDFS", "MapReduce"],
    },
    {
      icon: "Cloud",
      title: { en: "Cloud Computing", fr: "Cloud Computing" },
      chips: ["Azure", "AWS", "Google Cloud"],
    },
    {
      icon: "Network",
      title: { en: "Systems & Networks", fr: "Systèmes & Réseaux" },
      chips: { en: ["Linux", "Windows Server", "Cisco (CCNA)", "Cybersecurity"], fr: ["Linux", "Windows Server", "Cisco (CCNA)", "Cybersécurité"] },
    },
    {
      icon: "Code2",
      title: { en: "Programming", fr: "Programmation" },
      chips: ["Python", "SQL", "R", "Java", "Bash"],
    },
    {
      icon: "Wrench",
      title: { en: "Tools & Deployment", fr: "Outils & Déploiement" },
      chips: ["Git", "Docker", "Power BI", "FastAPI", "Streamlit"],
    },
  ],
};

export const projects = {
  heading: { en: "Projects", fr: "Projets" },
  items: [
    {
      title: { en: "NVIDIA Stock Price Forecasting", fr: "Prévision des prix des actions NVIDIA" },
      desc: { en: "Time series forecasting model.", fr: "Modèle de prévision par séries temporelles." },
      tech: ["Python", "Time Series"],
    },
    {
      title: { en: "Bank Customer Risk Classification", fr: "Classification du risque des clients bancaires" },
      desc: { en: "ML model predicting customer risk level.", fr: "Modèle Machine Learning de prédiction du niveau de risque client." },
      tech: ["Machine Learning", "Scikit-learn"],
    },
    {
      title: { en: "HR & Labor Law AI Assistant", fr: "Assistant IA RH et Droit du travail" },
      desc: { en: "Conversational AI agent for HR and labor law questions.", fr: "Agent conversationnel IA sur les questions RH et droit du travail." },
      tech: ["AI Agents", "LLM"],
    },
  ],
};

export const certifications = {
  heading: { en: "Certifications", fr: "Certifications" },
  items: [
    { name: "Certiport Word Office", org: "" },
    { name: { en: "Certificate of Excellence", fr: "Certificat d'Excellence" }, org: "ISTA Ifrane" },
  ],
};

export const languages = {
  heading: { en: "Languages", fr: "Langues" },
  items: [
    { en: "Arabic", fr: "Arabe" },
    { en: "French", fr: "Français" },
    { en: "English", fr: "Anglais" },
  ],
};

export const contact = {
  heading: { en: "Contact", fr: "Contact" },
  sub: {
    en: "Open to career opportunities in Data Science, AI, Machine Learning, or Actuarial Science.",
    fr: "Ouvert aux opportunités professionnelles en Data Science, IA, Machine Learning ou Actuariat.",
  },
};

export const seo = {
  title: {
    en: "Ayoub Khalal — Actuarial Science & Data Science Portfolio",
    fr: "Ayoub Khalal — Portfolio Actuariat & Data Science",
  },
  description: {
    en: "Portfolio of Ayoub Khalal, Master's student in Actuarial Science and Data Science. Risk modeling, machine learning, and AI.",
    fr: "Portfolio d'Ayoub Khalal, étudiant en Master Actuariat et Data Science. Modélisation du risque, machine learning et IA.",
  },
};
