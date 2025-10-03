import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { ThemeProvider } from "./components/ThemeProvider";
import { LoadingScreen } from "./components/LoadingScreen";
import { StarryBackground } from "./components/StarryBackground";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { SkillsSection } from "./components/SkillsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-500 relative overflow-x-hidden">
        {/* Loading Screen */}
        <AnimatePresence mode="wait">
          {isLoading && <LoadingScreen isLoading={isLoading} />}
        </AnimatePresence>

        {/* Main App Content */}
        <AnimatePresence mode="wait">
          {!isLoading && (
            <>
              {/* Starry Background */}
              <StarryBackground />

              {/* Navigation */}
              <Navigation />

              {/* Main Content */}
              <main className="relative z-10">
                <HeroSection />
                <AboutSection />
                <SkillsSection />
                <ProjectsSection />
                <ContactSection />
              </main>

              {/* Footer */}
              <Footer />
            </>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}
