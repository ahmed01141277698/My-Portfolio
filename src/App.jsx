import { useEffect, useState } from "react";
import { ThemeProvider } from "./components/ThemeProvider";
import { LanguageProvider, useLanguage } from "./i18n/LanguageProvider";
import { LoadingScreen } from "./components/LoadingScreen";
import { StarryBackground } from "./components/StarryBackground";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { SkillsSection } from "./components/SkillsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

function BackToTop() {
  const { t } = useLanguage();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t.nav.toTop}
      className="fixed bottom-6 end-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-brand text-brand-ink shadow-lg transition hover:-translate-y-0.5"
    >
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}

function Site() {
  // loading -> leaving (fade out) -> done
  const [phase, setPhase] = useState("loading");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("leaving"), 1800);
    const t2 = setTimeout(() => setPhase("done"), 2300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <StarryBackground />
      {phase !== "done" && <LoadingScreen leaving={phase === "leaving"} />}
      {phase !== "loading" && (
        <>
          <Navigation />
          <main className="relative z-10">
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
          </main>
          <Footer />
          <BackToTop />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Site />
      </LanguageProvider>
    </ThemeProvider>
  );
}
