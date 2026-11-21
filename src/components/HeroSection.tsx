import { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageProvider';

export function HeroSection() {
  const { t } = useLanguage();
  const full = t.hero.name;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(full.length);
      return;
    }
    setCount(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= full.length) clearInterval(id);
    }, 110);
    return () => clearInterval(id);
  }, [full]);

  return (
    <section id="home" className="relative flex min-h-screen items-center pb-16 pt-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="rise text-2xl font-semibold text-muted sm:text-3xl" style={{ ['--d' as string]: '100ms' }}>
            {t.hero.greeting}
          </p>

          {/* The full name is rendered invisibly so the layout never shifts while the typed copy fills in. */}
          <h1
            aria-label={full}
            className="rise relative mt-2 text-5xl font-bold leading-[1.15] text-fg sm:text-7xl lg:text-8xl"
            style={{ ['--d' as string]: '250ms' }}
          >
            <span className="invisible">{full}</span>
            <span aria-hidden="true" className="absolute inset-0">
              {full.slice(0, count)}
              {count < full.length && (
                <span className="text-brand" style={{ animation: 'caret 1s steps(1) infinite' }}>
                  |
                </span>
              )}
            </span>
          </h1>

          <p
            className="rise mt-8 max-w-2xl text-2xl font-semibold leading-snug text-fg sm:text-3xl"
            style={{ ['--d' as string]: '450ms' }}
          >
            {t.hero.subtitle}
            <span className="block text-muted">{t.hero.subtitleAccent}</span>
          </p>

          <p
            className="rise mt-6 max-w-[62ch] text-lg leading-8 text-muted"
            style={{ ['--d' as string]: '600ms' }}
          >
            {t.hero.description}
          </p>

          <div className="rise mt-10 flex flex-wrap gap-4" style={{ ['--d' as string]: '750ms' }}>
            <a
              href="#projects"
              className="rounded-full bg-brand px-8 py-4 font-semibold text-brand-ink shadow-lg transition hover:-translate-y-0.5 hover:brightness-95"
            >
              {t.hero.ctaProjects}
            </a>
            <a
              href="#contact"
              className="rounded-full border-2 border-fg/70 px-8 py-4 font-semibold text-fg transition hover:-translate-y-0.5 hover:bg-fg hover:text-[var(--sky-1)]"
            >
              {t.hero.ctaContact}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
