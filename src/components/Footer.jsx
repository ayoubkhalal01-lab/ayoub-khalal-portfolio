import { personal } from "../data/portfolioData.js";

export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="max-w-6xl mx-auto px-5 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted font-mono">
        <span>© {new Date().getFullYear()} {personal.name}</span>
        <span>Built with React · Three.js · Tailwind</span>
      </div>
    </footer>
  );
}
