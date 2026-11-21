import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageProvider';
import { embedInfo, hostOf, resolveSrc, safeHref, type MediaItem } from '../../lib/media';

interface Props {
  items: MediaItem[];
  title: string;
  /** Index to open at, or null when closed. */
  startIndex: number | null;
  onClose: () => void;
}

function Thumb({ item }: { item: MediaItem }) {
  if (item.type === 'image') {
    return <img src={resolveSrc(item.src)} alt="" className="h-full w-full object-cover" loading="lazy" />;
  }
  if (item.type === 'embed') {
    const thumb = embedInfo(item.src)?.thumbnail;
    if (thumb) return <img src={thumb} alt="" className="h-full w-full object-cover" loading="lazy" />;
  }
  if (item.type === 'video') {
    return (
      <video
        src={`${resolveSrc(item.src)}#t=0.1`}
        preload="metadata"
        muted
        playsInline
        className="h-full w-full object-cover"
      />
    );
  }
  return (
    <span className="flex h-full w-full items-center justify-center text-xl" aria-hidden="true">
      {item.type === 'link' ? '🔗' : '▶'}
    </span>
  );
}

export function MediaGallery({ items, title, startIndex, onClose }: Props) {
  const { t } = useLanguage();
  const ref = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const count = items.length;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (startIndex !== null) {
      setIndex(Math.min(startIndex, Math.max(count - 1, 0)));
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      if (dialog.open) dialog.close();
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [startIndex, count]);

  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);

  const onKeyDown = (e: React.KeyboardEvent) => {
    // Arrow keys follow the reading direction: in RTL the right arrow goes to the previous item.
    const rtl = document.documentElement.dir === 'rtl';
    if (e.key === 'ArrowRight') go(rtl ? -1 : 1);
    if (e.key === 'ArrowLeft') go(rtl ? 1 : -1);
  };

  const current = items[index];
  const navBtn =
    'flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-card-strong text-fg transition hover:bg-brand hover:text-brand-ink';

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      aria-label={title}
      className="m-auto max-h-[94vh] w-[min(96vw,1100px)] max-w-none overflow-hidden rounded-2xl border border-line bg-card-strong p-0 text-fg backdrop:bg-black/75"
    >
      {current && (
        <div className="flex max-h-[94vh] flex-col">
          <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3">
            <h3 className="truncate text-lg font-bold">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              aria-label={t.projects.close}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line hover:bg-brand hover:text-brand-ink"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex min-h-0 flex-1 items-center gap-3 p-4">
            {count > 1 && (
              <button type="button" onClick={() => go(-1)} aria-label={t.projects.prev} className={navBtn}>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" className="rtl:rotate-180">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            <div className="flex min-h-[220px] min-w-0 flex-1 items-center justify-center">
              {current.type === 'image' && (
                <img
                  key={index}
                  src={resolveSrc(current.src)}
                  alt={current.label || title}
                  className="max-h-[62vh] max-w-full rounded-lg object-contain"
                />
              )}
              {current.type === 'video' && (
                <video
                  key={index}
                  src={resolveSrc(current.src)}
                  controls
                  playsInline
                  preload="metadata"
                  className="max-h-[62vh] max-w-full rounded-lg bg-black"
                />
              )}
              {current.type === 'embed' && embedInfo(current.src) && (
                <iframe
                  key={index}
                  src={embedInfo(current.src)!.embedUrl}
                  title={current.label || title}
                  allow="accelerometer; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="aspect-video w-full max-h-[62vh] rounded-lg bg-black"
                />
              )}
              {current.type === 'link' && (
                <div className="text-center">
                  <p className="mb-1 text-lg font-semibold">{current.label || hostOf(current.src)}</p>
                  <p className="mb-5 text-sm text-muted" dir="ltr">
                    {hostOf(current.src)}
                  </p>
                  <a
                    href={safeHref(current.src)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-full bg-brand px-6 py-3 font-semibold text-brand-ink"
                  >
                    {t.projects.openLink}
                  </a>
                </div>
              )}
            </div>

            {count > 1 && (
              <button type="button" onClick={() => go(1)} aria-label={t.projects.next} className={navBtn}>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" className="rtl:rotate-180">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {count > 1 && (
            <div className="flex gap-2 overflow-x-auto border-t border-line px-4 py-3">
              {items.map((item, i) => (
                <button
                  key={`${item.src}-${i}`}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`${i + 1} / ${count}`}
                  aria-current={i === index ? 'true' : undefined}
                  className={`h-14 w-20 shrink-0 overflow-hidden rounded-md border-2 bg-card ${
                    i === index ? 'border-brand' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Thumb item={item} />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}
