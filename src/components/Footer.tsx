import { useLanguage } from '../i18n/LanguageProvider';
import { SOCIAL_LINKS } from './ContactSection';

const FOOTER_SOCIALS = SOCIAL_LINKS.filter((s) => ['LinkedIn', 'GitHub', 'Facebook', 'TikTok'].includes(s.name));
const SECTIONS = ['home', 'about', 'skills', 'projects', 'contact'] as const;

export function Footer() {
  const { t } = useLanguage();
  const f = t.footer;

  return (
    <footer className="relative z-10 border-t border-line bg-card-strong">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-5">
            <div dir="ltr" className="font-mono text-3xl font-medium text-fg">
              {'{Retur'}
              <span className="text-brand [text-shadow:0_0_1px_rgb(0_0_0/0.35)]">n</span>
              {'}'}
            </div>
            <p className="max-w-[40ch] leading-7 text-muted">{f.about}</p>
            <ul className="flex items-center gap-3">
              {FOOTER_SOCIALS.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-lg text-fg transition hover:bg-brand hover:text-brand-ink"
                  >
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label={f.quickLinks}>
            <h3 className="mb-5 text-xl font-bold text-fg">{f.quickLinks}</h3>
            <ul className="space-y-3">
              {SECTIONS.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-muted transition-colors hover:text-fg">
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-5 text-xl font-bold text-fg">{f.services}</h3>
            <ul className="space-y-3 text-muted">
              {f.servicesList.map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xl font-bold text-fg">{f.contactInfo}</h3>
            <ul className="space-y-4 text-muted">
              <li className="flex items-center gap-3">
                <span aria-hidden="true">📧</span>
                <span dir="ltr">ab1340@fayoum.edu.eg</span>
              </li>
              <li className="flex items-center gap-3">
                <span aria-hidden="true">📱</span>
                <span dir="ltr">+20 11 412 77 698</span>
              </li>
              <li className="flex items-center gap-3">
                <span aria-hidden="true">📍</span>
                <span>{f.location}</span>
              </li>
              <li className="flex items-center gap-3 text-ok">
                <span className="h-3 w-3 rounded-full bg-green-500" style={{ animation: 'pulse-dot 2s ease-in-out infinite' }} />
                <span className="text-sm">{f.available}</span>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-line pt-8 text-sm text-muted">{f.rights(new Date().getFullYear())}</p>
      </div>
    </footer>
  );
}
