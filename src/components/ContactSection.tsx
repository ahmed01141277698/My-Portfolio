import { useState } from 'react';
import emailjs from 'emailjs-com';
import { FaFacebook, FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa6';
import { AiFillTikTok } from 'react-icons/ai';
import { useLanguage } from '../i18n/LanguageProvider';
import { SectionHeading } from './AboutSection';

export const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    icon: <FaLinkedin />,
    url: 'https://www.linkedin.com/in/ahmed-badawy-a69a7733a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
  },
  { name: 'GitHub', icon: <FaGithub />, url: 'https://github.com/ahmed01141277698/ahmed01141277698.git' },
  { name: 'Facebook', icon: <FaFacebook />, url: 'https://www.facebook.com/share/1FJ1B3brfT/' },
  { name: 'TikTok', icon: <AiFillTikTok />, url: 'https://www.tiktok.com/@ahmedbadawy845?_t=ZS-90AY853nYMi&_r=1' },
  { name: 'Instagram', icon: <FaInstagram />, url: 'https://www.instagram.com/mazika7210?igsh=M2lhYmJuZGJmdnh4' },
  { name: 'Whatsapp', icon: <FaWhatsapp />, url: 'https://wa.me/201141277698' },
];

const EMAIL = 'ab1340@fayoum.edu.eg';

const fieldClass =
  'w-full rounded-lg border border-line bg-field px-4 py-3 text-fg placeholder:text-muted/70 focus:border-fg focus:outline-none';

export function ContactSection() {
  const { t } = useLanguage();
  const c = t.contact;
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setStatus('idle');
    try {
      await emailjs.send('service_c7jjl0j', 'template_l32l0j2', { ...form }, 'e8_MjB-Un9xbKp4NB');
      setStatus('ok');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={c.title} subtitle={c.subtitle} />

        <div className="grid gap-12 lg:grid-cols-2">
          <form onSubmit={onSubmit} className="surface space-y-5 rounded-2xl p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-fg">{c.formTitle}</h3>

            <div aria-live="polite" role="status">
              {status === 'ok' && (
                <p className="rounded-lg border border-ok/40 bg-ok-bg p-4 text-ok">✅ {c.success}</p>
              )}
              {status === 'error' && (
                <p className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-red-700 dark:text-red-300">
                  {c.error}
                </p>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="c-name" className="mb-2 block font-semibold text-fg">
                  {c.name}
                </label>
                <input id="c-name" name="name" required value={form.name} onChange={onChange} placeholder={c.namePh} autoComplete="name" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="c-email" className="mb-2 block font-semibold text-fg">
                  {c.email}
                </label>
                <input id="c-email" type="email" name="email" required value={form.email} onChange={onChange} placeholder="example@email.com" autoComplete="email" dir="ltr" className={fieldClass} />
              </div>
            </div>
            <div>
              <label htmlFor="c-subject" className="mb-2 block font-semibold text-fg">
                {c.subject}
              </label>
              <input id="c-subject" name="subject" required value={form.subject} onChange={onChange} placeholder={c.subjectPh} className={fieldClass} />
            </div>
            <div>
              <label htmlFor="c-message" className="mb-2 block font-semibold text-fg">
                {c.message}
              </label>
              <textarea id="c-message" name="message" required rows={6} value={form.message} onChange={onChange} placeholder={c.messagePh} className={`${fieldClass} resize-none`} />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-lg bg-brand py-4 font-semibold text-brand-ink transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? c.sending : c.send}
            </button>
          </form>

          <div className="space-y-6">
            <a
              href={`mailto:${EMAIL}`}
              className="surface flex items-center gap-4 rounded-xl p-5 transition hover:bg-card-strong"
            >
              <span className="text-3xl" aria-hidden="true">
                📧
              </span>
              <span>
                <span className="block font-semibold text-fg">{c.email}</span>
                <span className="text-muted" dir="ltr">
                  {EMAIL}
                </span>
              </span>
            </a>
            <a
              href="https://wa.me/201141277698"
              target="_blank"
              rel="noopener noreferrer"
              className="surface flex items-center gap-4 rounded-xl p-5 transition hover:bg-card-strong"
            >
              <span className="text-3xl" aria-hidden="true">
                📱
              </span>
              <span>
                <span className="block font-semibold text-fg">{c.phone}</span>
                <span className="text-muted" dir="ltr">
                  {c.phoneValue}
                </span>
              </span>
            </a>

            <div className="surface rounded-xl p-6">
              <h3 className="mb-5 text-xl font-bold text-fg">{c.follow}</h3>
              <ul className="grid grid-cols-2 gap-3">
                {SOCIAL_LINKS.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-lg border border-line px-4 py-3 font-semibold text-fg transition hover:bg-brand hover:text-brand-ink"
                    >
                      <span className="text-xl" aria-hidden="true">
                        {s.icon}
                      </span>
                      <span>{s.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-ok/40 bg-ok-bg p-6">
              <div className="flex items-center gap-3">
                <span className="h-3.5 w-3.5 rounded-full bg-green-500" style={{ animation: 'pulse-dot 2s ease-in-out infinite' }} />
                <h3 className="font-semibold text-ok">{c.availableTitle}</h3>
              </div>
              <p className="mt-2 text-ok">{c.availableText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
