import { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';
import { useLanguage } from '../i18n/LanguageProvider';

const SECTIONS = ['home', 'about', 'skills', 'projects', 'contact'] as const;

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState<string>('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t, toggleLang } = useLanguage();
  const isDark = theme === 'dark';

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const labels: Record<(typeof SECTIONS)[number], string> = {
    home: t.nav.home,
    about: t.nav.about,
    skills: t.nav.skills,
    projects: t.nav.projects,
    contact: t.nav.contact,
  };

  const linkClass = (id: string) =>
    `relative px-3 py-2 text-sm font-semibold transition-colors ${
      active === id ? 'text-fg' : 'text-muted hover:text-fg'
    }`;

  const iconBtn =
    'inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-card text-lg transition hover:bg-card-strong';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'border-b border-line bg-card-strong/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" dir="ltr" className="font-mono text-2xl font-medium text-fg" aria-label={t.brandName}>
          {'{Retur'}
          <span className="text-brand [text-shadow:0_0_1px_rgb(0_0_0/0.35)]">n</span>
          {'}'}
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((id) => (
            <a key={id} href={`#${id}`} className={linkClass(id)} aria-current={active === id ? 'true' : undefined}>
              {labels[id]}
              {active === id && <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded bg-brand" />}
            </a>
          ))}
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t.meta.switchLabel}
            className="ms-3 rounded-full border border-line bg-card px-4 py-2 text-sm font-semibold text-fg transition hover:bg-card-strong"
          >
            {t.meta.switchTo}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? t.nav.toLight : t.nav.toDark}
            className={`${iconBtn} ms-2`}
          >
            <span aria-hidden="true">{isDark ? '☀️' : '🌙'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t.meta.switchLabel}
            className="rounded-full border border-line bg-card px-3 py-2 text-sm font-semibold text-fg"
          >
            {t.meta.switchTo}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? t.nav.toLight : t.nav.toDark}
            className={iconBtn}
          >
            <span aria-hidden="true">{isDark ? '☀️' : '🌙'}</span>
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={t.nav.menu}
            className={iconBtn}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {menuOpen ? (
                <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-line bg-card-strong/95 backdrop-blur-md md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {SECTIONS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-3 py-3 text-base font-semibold ${
                  active === id ? 'bg-brand/20 text-fg' : 'text-muted'
                }`}
              >
                {labels[id]}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
