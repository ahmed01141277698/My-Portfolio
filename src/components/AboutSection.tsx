import { useLanguage } from '../i18n/LanguageProvider';

export function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-14 max-w-3xl">
      <h2 className="text-4xl font-bold text-fg md:text-5xl">{title}</h2>
      <div className="mt-5 h-1 w-24 rounded bg-brand" />
      {subtitle && <p className="mt-6 max-w-[62ch] text-xl leading-8 text-muted">{subtitle}</p>}
    </div>
  );
}

export function AboutSection() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <section id="about" className="relative scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={a.title} />

        <div className="grid gap-16 lg:grid-cols-2">
          <div className="space-y-10">
            <div className="border-s-4 border-brand ps-6">
              <h3 className="text-2xl font-bold text-fg">{a.journeyTitle}</h3>
              <p className="mt-3 max-w-[62ch] text-lg leading-8 text-muted">{a.journeyText}</p>
            </div>
            <div className="border-s-4 border-brand ps-6">
              <h3 className="text-2xl font-bold text-fg">{a.philosophyTitle}</h3>
              <p className="mt-3 max-w-[62ch] text-lg leading-8 text-muted">{a.philosophyText}</p>
            </div>

            <dl className="surface grid grid-cols-3 gap-4 rounded-2xl p-6 text-center">
              {a.stats.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <dt className="order-2 mt-1 text-sm text-muted">{s.label}</dt>
                  <dd className="text-3xl font-bold text-fg sm:text-4xl" dir="ltr">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {a.values.map((v) => (
              <li key={v.title} className="border-t border-line pt-5">
                <span className="text-3xl" aria-hidden="true">
                  {v.icon}
                </span>
                <h4 className="mt-3 text-xl font-bold text-fg">{v.title}</h4>
                <p className="mt-2 leading-7 text-muted">{v.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
