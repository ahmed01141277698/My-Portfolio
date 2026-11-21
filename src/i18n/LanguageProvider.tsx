import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { translations, type Lang } from './translations';

type Dictionary = (typeof translations)['ar'] | (typeof translations)['en'];

interface LanguageContextType {
  lang: Lang;
  t: Dictionary;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function readInitialLang(): Lang {
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'ar' || saved === 'en') return saved;
  } catch {
    /* storage unavailable */
  }
  return 'ar';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(readInitialLang);
  const t = translations[lang];

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = t.meta.dir;
    document.title = t.meta.title;
    try {
      localStorage.setItem('lang', lang);
    } catch {
      /* storage unavailable */
    }
  }, [lang, t]);

  const toggleLang = useCallback(() => setLang((l) => (l === 'ar' ? 'en' : 'ar')), []);
  const value = useMemo(() => ({ lang, t, toggleLang }), [lang, t, toggleLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
