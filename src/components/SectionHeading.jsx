import Reveal from "./Reveal.jsx";

export default function SectionHeading({ eyebrow, title, sub }) {
  return (
    <Reveal className="mb-10 md:mb-14">
      {eyebrow && (
        <span className="font-mono text-[11px] uppercase tracking-widest text-teal">{eyebrow}</span>
      )}
      <h2 className="font-display text-3xl sm:text-4xl mt-2 tracking-tight">{title}</h2>
      {sub && <p className="text-muted mt-2 max-w-lg text-[15px]">{sub}</p>}
    </Reveal>
  );
}
