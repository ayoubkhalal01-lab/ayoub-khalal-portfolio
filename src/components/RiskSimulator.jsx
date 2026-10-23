import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Activity, ShieldCheck, AlertTriangle, TrendingUp, Sparkles, Sliders } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";

export default function RiskSimulator() {
  const { lang } = useLanguage();

  const [age, setAge] = useState(28);
  const [claims, setClaims] = useState(0);
  const [assetValue, setAssetValue] = useState(150000);
  const [coverage, setCoverage] = useState("comprehensive"); // third_party | intermediate | comprehensive

  // Actuarial Compound Poisson & Frequency/Severity Model
  const { riskScore, purePremium, commercialPremium, defaultProb, riskCategory } = useMemo(() => {
    // 1. Age factor (U-shaped actuarial curve: young <25 and elderly >65 have higher risk)
    let ageFactor = 1.0;
    if (age < 22) ageFactor = 1.65;
    else if (age < 26) ageFactor = 1.35;
    else if (age > 65) ageFactor = 1.4;
    else if (age > 55) ageFactor = 1.15;
    else ageFactor = 0.9;

    // 2. Bonus-Malus Claims factor
    const claimsFactor = 1.0 + claims * 0.45;

    // 3. Coverage multiplier
    const coverageMultiplier = coverage === "third_party" ? 0.45 : coverage === "intermediate" ? 0.75 : 1.0;

    // 4. Base Frequency lambda (Poisson)
    const lambda = 0.06 * ageFactor * (1 + claims * 0.4);
    const probPercent = Math.min(48, Math.max(3.2, lambda * 100)).toFixed(1);

    // 5. Severity expectation (Gamma distribution mean)
    const expectedSeverity = assetValue * 0.08 * coverageMultiplier;

    // Pure Premium = E(N) * E(X)
    const pure = Math.round(lambda * expectedSeverity);
    // Commercial Premium = Pure Premium / (1 - expense loading - safety margin)
    const commercial = Math.round(pure * 1.35 + 850);

    // Risk Score 0 - 100
    const rawScore = (ageFactor * 25) + (claims * 18) + (coverageMultiplier * 20);
    const score = Math.min(98, Math.max(12, Math.round(rawScore)));

    let category = {
      label: { en: "Low Risk", fr: "Risque Faible", ar: "مستوى خطر منخفض" },
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/30",
    };
    if (score >= 65) {
      category = {
        label: { en: "High Risk", fr: "Risque Élevé", ar: "مستوى خطر مرتفع" },
        color: "text-rose-400",
        bg: "bg-rose-500/10 border-rose-500/30",
      };
    } else if (score >= 40) {
      category = {
        label: { en: "Moderate Risk", fr: "Risque Modéré", ar: "مستوى خطر متوسط" },
        color: "text-amber-400",
        bg: "bg-amber-500/10 border-amber-500/30",
      };
    }

    return {
      riskScore: score,
      purePremium: pure,
      commercialPremium: commercial,
      defaultProb: probPercent,
      riskCategory: category,
    };
  }, [age, claims, assetValue, coverage]);

  return (
    <section id="simulator" className="py-20 md:py-28 bg-surface/30 relative z-10 border-t border-line/40">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeading
          eyebrow="06 • Quant & ML Live Demo"
          title={
            lang === "fr"
              ? "Simulateur de Risque Actuariel"
              : lang === "ar"
              ? "محاكي المخاطر والتسعير الأكتواري"
              : "Actuarial Risk & Pricing Simulator"
          }
          sub={
            lang === "fr"
              ? "Modélisation en direct de la tarification d'assurance basée sur la théorie du risque (Modèle Poisson composé & Fréquence-Coût)."
              : lang === "ar"
              ? "محاكاة فورية لتسعير التأمين وتقدير مؤشرات الخطورة بالاعتماد على النماذج الإحصائية للأكتواريا."
              : "Live interactive insurance risk scoring and predictive premium estimation (Compound Poisson & Generalized Linear Models)."
          }
        />

        <Reveal className="mt-8 rounded-3xl border border-line bg-surface/90 p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Inputs Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-line text-xs font-mono text-teal uppercase tracking-wider">
                <Sliders size={14} />
                <span>
                  {lang === "fr"
                    ? "Paramètres de souscription"
                    : lang === "ar"
                    ? "معطيات المشترك"
                    : "Underwriting Parameters"}
                </span>
              </div>

              {/* Age Slider */}
              <div>
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-text font-medium">
                    {lang === "fr" ? "Âge de l'assuré" : lang === "ar" ? "عمر المؤمن له" : "Insured Age"}
                  </span>
                  <span className="font-mono text-teal font-semibold px-2.5 py-0.5 rounded-lg bg-teal/10 border border-teal/30">
                    {age} {lang === "ar" ? "سنة" : "ans"}
                  </span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="80"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full accent-teal cursor-pointer h-2 bg-ink/70 rounded-lg"
                />
                <div className="flex justify-between text-[11px] font-mono text-muted mt-1">
                  <span>18</span>
                  <span>45</span>
                  <span>80</span>
                </div>
              </div>

              {/* Historical Claims Slider */}
              <div>
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-text font-medium">
                    {lang === "fr" ? "Historique des sinistres (3 ans)" : lang === "ar" ? "عدد الحوادث السابقة (3 سنوات)" : "Prior Claims (Past 3 Years)"}
                  </span>
                  <span className="font-mono text-gold font-semibold px-2.5 py-0.5 rounded-lg bg-gold/10 border border-gold/30">
                    {claims} {lang === "fr" ? "sinistre(s)" : lang === "ar" ? "حوادث" : "claim(s)"}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={claims}
                  onChange={(e) => setClaims(Number(e.target.value))}
                  className="w-full accent-gold cursor-pointer h-2 bg-ink/70 rounded-lg"
                />
                <div className="flex justify-between text-[11px] font-mono text-muted mt-1">
                  <span>0 (Bonus 100%)</span>
                  <span>2</span>
                  <span>5 (Malus max)</span>
                </div>
              </div>

              {/* Asset Value Slider */}
              <div>
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-text font-medium">
                    {lang === "fr" ? "Valeur du véhicule / Capital assuré" : lang === "ar" ? "قيمة المركبة / رأس المال المؤمن" : "Asset Value / Insured Capital"}
                  </span>
                  <span className="font-mono text-text font-semibold px-2.5 py-0.5 rounded-lg bg-surface border border-line">
                    {assetValue.toLocaleString()} MAD
                  </span>
                </div>
                <input
                  type="range"
                  min="40000"
                  max="500000"
                  step="10000"
                  value={assetValue}
                  onChange={(e) => setAssetValue(Number(e.target.value))}
                  className="w-full accent-teal cursor-pointer h-2 bg-ink/70 rounded-lg"
                />
                <div className="flex justify-between text-[11px] font-mono text-muted mt-1">
                  <span>40,000 MAD</span>
                  <span>250,000 MAD</span>
                  <span>500,000 MAD</span>
                </div>
              </div>

              {/* Coverage Options */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  {lang === "fr" ? "Formule de couverture" : lang === "ar" ? "نوع التغطية التأمينية" : "Coverage Tier"}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "third_party", label: { en: "Third Party", fr: "Responsabilité Civile", ar: "المسؤولية المدنية" } },
                    { id: "intermediate", label: { en: "Extended", fr: "Tiers + Vol/Incendie", ar: "تغطية موسعة" } },
                    { id: "comprehensive", label: { en: "Comprehensive", fr: "Tous Risques", ar: "تأمين شامل" } },
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCoverage(c.id)}
                      className={`py-2 px-3 rounded-xl border text-xs font-mono transition-all cursor-pointer text-center ${
                        coverage === c.id
                          ? "bg-teal text-ink border-teal font-semibold shadow-sm"
                          : "border-line bg-surface text-muted hover:text-text hover:border-teal/30"
                      }`}
                    >
                      {c.label[lang] || c.label.en}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Actuarial Output Dashboard Column */}
            <div className="lg:col-span-5 rounded-2xl border border-line bg-ink/70 p-6 sm:p-7 shadow-inner space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-line/60">
                <span className="text-xs font-mono text-muted uppercase tracking-wider flex items-center gap-1.5">
                  <Activity size={14} className="text-teal" />
                  {lang === "fr" ? "Indicateurs Actuariels" : lang === "ar" ? "المؤشرات الأكتوارية" : "Actuarial Metrics"}
                </span>
                <span className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-full border ${riskCategory.bg} ${riskCategory.color}`}>
                  {riskCategory.label[lang] || riskCategory.label.en}
                </span>
              </div>

              {/* Gauge Meter */}
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-xs text-muted font-mono uppercase">Risk Score (GLM)</span>
                  <span className="text-3xl font-display font-semibold text-text">
                    {riskScore} <span className="text-xs font-mono text-muted">/ 100</span>
                  </span>
                </div>
                <div className="w-full h-3 bg-surface rounded-full overflow-hidden border border-line/60 p-0.5">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500"
                    animate={{ width: `${riskScore}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                </div>
              </div>

              {/* Output Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border border-line/60 bg-surface">
                  <span className="block text-[11px] font-mono text-muted uppercase mb-1">
                    {lang === "fr" ? "Prime Pure E(S)" : lang === "ar" ? "القسط الصافي E(S)" : "Pure Premium"}
                  </span>
                  <span className="text-lg font-mono font-semibold text-teal">
                    {purePremium.toLocaleString()} <span className="text-xs font-normal">MAD</span>
                  </span>
                </div>

                <div className="p-3.5 rounded-xl border border-line/60 bg-surface">
                  <span className="block text-[11px] font-mono text-muted uppercase mb-1">
                    {lang === "fr" ? "Probabilité Sinistre" : lang === "ar" ? "احتمال الحادث P(N>0)" : "Claim Frequency"}
                  </span>
                  <span className="text-lg font-mono font-semibold text-gold">
                    {defaultProb}%
                  </span>
                </div>
              </div>

              {/* Final Commercial Premium */}
              <div className="p-4 rounded-xl border border-teal/40 bg-teal/5 text-center">
                <span className="block text-xs font-mono text-muted uppercase mb-1">
                  {lang === "fr" ? "Prime Commerciale Annuelle Estimée" : lang === "ar" ? "القسط التجاري السنوي التقديري" : "Estimated Annual Premium"}
                </span>
                <div className="text-3xl font-display font-semibold text-text">
                  {commercialPremium.toLocaleString()} <span className="text-sm font-mono text-teal">MAD / an</span>
                </div>
                <span className="block text-[10px] font-mono text-muted mt-2">
                  E(S) = λ × E(X) • Poisson/Gamma Compound Loss Model
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
