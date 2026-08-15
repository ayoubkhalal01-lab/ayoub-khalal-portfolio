import { createContext, useContext, useState, useCallback, useMemo } from "react";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  const toggle = useCallback((next) => setLang(next), []);

  // t(field) resolves a bilingual object { en, fr } or a plain string.
  const t = useCallback(
    (field) => {
      if (field == null) return "";
      if (typeof field === "string") return field;
      return field[lang] ?? field.en ?? "";
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang: toggle, t }), [lang, toggle, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
