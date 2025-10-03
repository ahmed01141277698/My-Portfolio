import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ["home", "about", "skills", "projects", "contact"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  setTimeout(() => setIsMobileMenuOpen(false), 300);  };




  const navItems = [
    { id: "home", label: "الرئيسية"  },
    { id: "about", label: "نبذة عني" },
    { id: "skills", label: "مهاراتي" },
    { id: "projects", label: "أعمالي" },
    { id: "contact", label: "تواصل معي" },
  ];

  const isDark = theme === "dark";



  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 font-semibold z-50 transition-all duration-300 ${
        isScrolled
          ? `backdrop-blur-md border-b ${
              isDark
                ? "bg-slate-900/90 border-slate-700/50"
                : "bg-white/90 border-gray-200/50"
            }`
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className={`text-3xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
            whileHover={{ scale: 1.05 }}
            // style={{
            //   background: isDark
            //     ? 'linear-gradient(45deg, #60A5FA, #A78BFA, #F472B6)'
            //     : 'linear-gradient(45deg, #3B82F6, #8B5CF6, #EC4899)',
            //   WebkitBackgroundClip: 'text',
            //   WebkitTextFillColor: 'transparent',
            //   backgroundClip: 'text',
            // }}
          >
            {`{Retur`}
            <span style={{ color: "yellow" }}>{`n`}</span>
            {`}`}
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={` relative px-3 py-2 text-sm transition-colors ${
                  activeSection === item.id
                    ? "text-blue-500"
                    : `${
                        isDark
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-600 hover:text-gray-900"
                      }`
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                isDark
                  ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                  : "bg-blue-500/20 text-blue-600 hover:bg-blue-500/30"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDark ? "☀️" : "🌙"}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Mobile Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                isDark
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-blue-500/20 text-blue-600"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDark ? "☀️" : "🌙"}
            </motion.button>

            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 ${isDark ? "text-white" : "text-gray-900"}`}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className={`transform transition-transform duration-300 ${
                  isMobileMenuOpen ? "rotate-90" : ""
                }`}
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden overflow-hidden border-t ${
                isDark ? "border-slate-700/50" : "border-gray-200/50"
              }`}
            >
              <div className="py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    
                    key={index}
                onClick={() => scrollToSection(item.id)}
                    className={`scroll-mt-20 block w-full text-right px-4 py-3 text-base transition-colors ${
                      activeSection === item.id
                        ? "text-blue-500 bg-blue-500/10"
                        : `${
                            isDark
                              ? "text-gray-300 hover:text-white hover:bg-slate-800/50"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
                          }`
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.98 }}
                                      viewport={{ once: true }}

                  >
                        {item.label}
                {activeSection === item.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
           
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
