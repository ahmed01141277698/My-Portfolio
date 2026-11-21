/**
 * Local-only dashboard for adding NEW portfolio projects.
 *
 * It exists only while `npm run dev` / `npm run dashboard` is running (apply: 'serve'), so nothing
 * from it ends up in the production build. It reads and writes:
 *   - src/data/newProjects.json   (the project list the site renders)
 *   - public/uploads/*            (images and videos uploaded from the dashboard)
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Plugin } from 'vite';

const MAX_UPLOAD_BYTES = 95 * 1024 * 1024; // GitHub rejects single files above 100 MB
const MAX_JSON_BYTES = 2 * 1024 * 1024;
const ALLOWED_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.mp4', '.webm', '.ogg', '.mov', '.m4v']);
const CATEGORIES = new Set(['web', 'mobile', 'other']);
const MEDIA_TYPES = new Set(['image', 'video', 'embed', 'link']);
const UPLOAD_SRC_RE = /^uploads\/[\w.-]+$/;

function send(res: ServerResponse, status: number, body: unknown, type = 'application/json; charset=utf-8') {
  res.statusCode = status;
  res.setHeader('Content-Type', type);
  res.setHeader('Cache-Control', 'no-store');
  res.end(typeof body === 'string' ? body : JSON.stringify(body));
}

function isLocalHost(host: string | undefined) {
  return !!host && /^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(host);
}

function str(v: unknown, max: number) {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

function cleanUrl(v: unknown) {
  const s = str(v, 2000);
  return /^https?:\/\//i.test(s) ? s : '';
}

function sanitizeProjects(input: unknown) {
  if (!Array.isArray(input)) throw new Error('Expected an array of projects');
  const seen = new Set<string>();
  return input.slice(0, 500).map((raw: any) => {
    let id: string = typeof raw?.id === 'string' && /^[\w-]{1,64}$/.test(raw.id) ? raw.id : '';
    while (!id || seen.has(id)) id = crypto.randomBytes(6).toString('hex');
    seen.add(id);

    const media = (Array.isArray(raw?.media) ? raw.media : [])
      .slice(0, 60)
      .map((m: any) => {
        const type = MEDIA_TYPES.has(m?.type) ? m.type : 'link';
        const src = str(m?.src, 2000);
        const ok = UPLOAD_SRC_RE.test(src) || /^https?:\/\//i.test(src);
        if (!ok) return null;
        const label = str(m?.label, 100);
        return label ? { type, src, label } : { type, src };
      })
      .filter(Boolean);

    return {
      id,
      createdAt: typeof raw?.createdAt === 'string' && !isNaN(Date.parse(raw.createdAt)) ? raw.createdAt : new Date().toISOString(),
      title: { ar: str(raw?.title?.ar, 160), en: str(raw?.title?.en, 160) },
      description: { ar: str(raw?.description?.ar, 1200), en: str(raw?.description?.en, 1200) },
      category: CATEGORIES.has(raw?.category) ? raw.category : 'web',
      featured: !!raw?.featured,
      technologies: (Array.isArray(raw?.technologies) ? raw.technologies : [])
        .map((x: unknown) => str(x, 40))
        .filter(Boolean)
        .slice(0, 30),
      demoUrl: cleanUrl(raw?.demoUrl),
      codeUrl: cleanUrl(raw?.codeUrl),
      media,
    };
  });
}

function readBody(req: IncomingMessage, limit: number): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;
    req.on('data', (c: Buffer) => {
      size += c.length;
      if (size > limit) {
        reject(new Error('Body too large'));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export function portfolioDashboard(): Plugin {
  return {
    name: 'portfolio-dashboard',
    apply: 'serve',
    configureServer(server) {
      const root = server.config.root;
      const base = server.config.base.endsWith('/') ? server.config.base : `${server.config.base}/`;
      const dataFile = path.join(root, 'src/data/newProjects.json');
      const uploadsDir = path.join(root, 'public/uploads');
      const pageFile = path.join(root, 'dashboard/index.html');

      const readProjects = (): any[] => {
        try {
          const parsed = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
          return Array.isArray(parsed) ? parsed : [];
        } catch {
          return [];
        }
      };

      const referencedUploads = (projects: any[]) => {
        const set = new Set<string>();
        for (const p of projects) for (const m of p.media || []) if (UPLOAD_SRC_RE.test(m.src)) set.add(m.src);
        return set;
      };

      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url || '/', 'http://localhost');
        let route = url.pathname;
        if (route.startsWith(base)) route = route.slice(base.length);
        else route = route.replace(/^\/+/, '');

        const isPage = route === '__admin' || route === '__admin/';
        const isApi = route.startsWith('__api/');
        if (!isPage && !isApi) return next();

        // Only the machine running the dev server may use the dashboard.
        if (!isLocalHost(req.headers.host)) return send(res, 403, { error: 'Local access only' });

        if (isPage) {
          if (route === '__admin') {
            res.statusCode = 302;
            res.setHeader('Location', `${base}__admin/`);
            return res.end();
          }
          try {
            return send(res, 200, fs.readFileSync(pageFile, 'utf8'), 'text/html; charset=utf-8');
          } catch {
            return send(res, 500, { error: 'dashboard/index.html is missing' });
          }
        }

        if (req.method !== 'GET') {
          // Blocks cross-site form posts: browsers can't add this header without a CORS preflight.
          if (req.headers['x-dashboard'] !== '1') return send(res, 403, { error: 'Missing dashboard header' });
          const origin = req.headers.origin;
          if (origin && new URL(origin).host !== req.headers.host) return send(res, 403, { error: 'Bad origin' });
        }

        try {
          if (route === '__api/projects' && req.method === 'GET') {
            return send(res, 200, readProjects());
          }

          if (route === '__api/projects' && req.method === 'PUT') {
            const body = await readBody(req, MAX_JSON_BYTES);
            const next = sanitizeProjects(JSON.parse(body.toString('utf8')));

            const before = referencedUploads(readProjects());
            const after = referencedUploads(next);

            fs.mkdirSync(path.dirname(dataFile), { recursive: true });
            const tmp = `${dataFile}.tmp`;
            fs.writeFileSync(tmp, JSON.stringify(next, null, 2) + '\n');
            fs.renameSync(tmp, dataFile);

            // Delete uploads that no saved project uses any more.
            for (const src of before) {
              if (!after.has(src)) fs.rmSync(path.join(root, 'public', src), { force: true });
            }
            return send(res, 200, next);
          }

          if (route === '__api/upload' && req.method === 'POST') {
            const original = url.searchParams.get('name') || 'file';
            const ext = path.extname(original).toLowerCase();
            if (!ALLOWED_EXT.has(ext)) {
              return send(res, 400, { error: `نوع الملف غير مدعوم (${ext || 'بدون امتداد'})` });
            }
            const declared = Number(req.headers['content-length'] || 0);
            if (declared > MAX_UPLOAD_BYTES) {
              return send(res, 413, { error: 'الملف أكبر من 95MB. استخدم رابط يوتيوب/فيميو أو رابط مباشر بدل الرفع.' });
            }

            const slug =
              path
                .basename(original, ext)
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')
                .slice(0, 40) || 'file';
            const fileName = `${slug}-${crypto.randomBytes(4).toString('hex')}${ext}`;
            fs.mkdirSync(uploadsDir, { recursive: true });
            const target = path.join(uploadsDir, fileName);

            let written = 0;
            const out = fs.createWriteStream(target);
            const failed = await new Promise<string | null>((resolve) => {
              req.on('data', (chunk: Buffer) => {
                written += chunk.length;
                if (written > MAX_UPLOAD_BYTES) {
                  out.destroy();
                  req.destroy();
                  resolve('too-large');
                }
              });
              req.pipe(out);
              out.on('finish', () => resolve(null));
              out.on('error', () => resolve('write-error'));
              req.on('error', () => resolve('aborted'));
              req.on('aborted', () => resolve('aborted'));
            });

            if (failed) {
              fs.rmSync(target, { force: true });
              if (!res.writableEnded) {
                return send(res, failed === 'too-large' ? 413 : 500, { error: 'فشل رفع الملف' });
              }
              return;
            }
            return send(res, 200, { src: `uploads/${fileName}`, size: written });
          }

          if (route === '__api/upload' && req.method === 'DELETE') {
            const src = url.searchParams.get('src') || '';
            if (!UPLOAD_SRC_RE.test(src)) return send(res, 400, { error: 'Bad path' });
            if (referencedUploads(readProjects()).has(src)) {
              return send(res, 409, { error: 'File is used by a saved project' });
            }
            fs.rmSync(path.join(root, 'public', src), { force: true });
            return send(res, 200, { ok: true });
          }

          return send(res, 404, { error: 'Not found' });
        } catch (err: any) {
          return send(res, 400, { error: err?.message || 'Bad request' });
        }
      });

      server.httpServer?.once('listening', () => {
        const addr = server.httpServer?.address();
        if (addr && typeof addr === 'object') {
          setTimeout(() => {
            console.log(`\n  Dashboard:  http://localhost:${addr.port}${base}__admin/\n`);
          }, 50);
        }
      });
    },
  };
}
