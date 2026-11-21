import { useLanguage } from '../i18n/LanguageProvider';

export function LoadingScreen({ leaving }: { leaving: boolean }) {
  const { t } = useLanguage();

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[60] flex items-center justify-center transition-opacity duration-500 ${
        leaving ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ background: 'linear-gradient(180deg, var(--sky-1), var(--sky-2) 60%, var(--sky-3))' }}
    >
      <div className="px-6 text-center">
        <div
          dir="ltr"
          className="font-mono text-5xl font-medium text-fg sm:text-6xl"
          style={{ animation: 'float 3s ease-in-out infinite' }}
        >
          {'{Retur'}
          <span className="text-brand [text-shadow:0_0_1px_rgb(0_0_0/0.35)]">n</span>
          {'}'}
        </div>
        <p className="mt-8 text-xl font-semibold text-fg">{t.loading.title}</p>
        <p className="mt-1 text-muted">{t.loading.sub}</p>
        <div className="mx-auto mt-8 h-1 w-56 overflow-hidden rounded-full bg-line">
          <div
            className="h-full origin-[left_center] rounded-full bg-brand rtl:origin-[right_center]"
            style={{ animation: 'load-bar 1.6s ease-in-out forwards' }}
          />
        </div>
      </div>
    </div>
  );
}
