export type MediaType = 'image' | 'video' | 'embed' | 'link';

export interface MediaItem {
  type: MediaType;
  /** Either an absolute URL, or a path relative to the site root such as "uploads/abc.png". */
  src: string;
  label?: string;
}

const IMAGE_RE = /\.(png|jpe?g|webp|gif|avif)(\?.*)?$/i;
const VIDEO_RE = /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i;

export function isExternal(src: string) {
  return /^(https?:)?\/\//i.test(src) || src.startsWith('data:');
}

/** Turns "uploads/x.png" into a URL that works under the Vite base path. */
export function resolveSrc(src: string) {
  if (isExternal(src)) return src;
  return `${import.meta.env.BASE_URL}${src.replace(/^\/+/, '')}`;
}

/** Only http(s) and site-relative links are allowed in hrefs. */
export function safeHref(url?: string) {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  if (/^(javascript|data|vbscript):/i.test(url)) return undefined;
  return resolveSrc(url);
}

export interface EmbedInfo {
  embedUrl: string;
  thumbnail?: string;
}

export function embedInfo(url: string): EmbedInfo | null {
  const yt = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/))([\w-]{11})/i,
  );
  if (yt) {
    return {
      embedUrl: `https://www.youtube-nocookie.com/embed/${yt[1]}`,
      thumbnail: `https://i.ytimg.com/vi/${yt[1]}/hqdefault.jpg`,
    };
  }
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vimeo) return { embedUrl: `https://player.vimeo.com/video/${vimeo[1]}` };
  return null;
}

/** Guess a media type from a pasted URL or an uploaded file name. */
export function detectType(src: string): MediaType {
  if (embedInfo(src)) return 'embed';
  if (VIDEO_RE.test(src)) return 'video';
  if (IMAGE_RE.test(src)) return 'image';
  return 'link';
}

export type Cover =
  | { kind: 'image'; src: string }
  | { kind: 'video'; src: string }
  | { kind: 'none' };

/** What to show on the project card before the gallery is opened. */
export function coverOf(media: MediaItem[]): Cover {
  for (const m of media) {
    if (m.type === 'image') return { kind: 'image', src: resolveSrc(m.src) };
  }
  for (const m of media) {
    if (m.type === 'embed') {
      const thumb = embedInfo(m.src)?.thumbnail;
      if (thumb) return { kind: 'image', src: thumb };
    }
  }
  for (const m of media) {
    if (m.type === 'video') return { kind: 'video', src: resolveSrc(m.src) };
  }
  return { kind: 'none' };
}

export function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}
