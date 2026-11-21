import { useMemo, useState } from 'react';
import { useLanguage } from '../i18n/LanguageProvider';
import { getProjects, type Project } from '../data/projects';
import { coverOf, safeHref } from '../lib/media';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MediaGallery } from './projects/MediaGallery';
import { SectionHeading } from './AboutSection';

const PAGE_SIZE = 6;

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const { t } = useLanguage();
  const cover = coverOf(project.media);
  const hasMedia = project.media.length > 0;
  const demo = safeHref(project.demoUrl);
  const code = safeHref(project.codeUrl);

  const coverInner =
    cover.kind === 'image' ? (
      <ImageWithFallback
        src={cover.src}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    ) : cover.kind === 'video' ? (
      <video src={`${cover.src}#t=0.1`} preload="metadata" muted playsInline className="h-full w-full object-cover" />
    ) : (
      <div className="flex h-full w-full items-center justify-center bg-card text-4xl" aria-hidden="true">
        🗂️
      </div>
    );

  return (
    <article className="surface group flex flex-col overflow-hidden rounded-2xl">
      <div className="relative h-52 overflow-hidden bg-card">
        {hasMedia ? (
          <button
            type="button"
            onClick={() => onOpen(project)}
            aria-label={`${t.projects.openGallery}: ${project.title}`}
            className="block h-full w-full text-start"
          >
            {coverInner}
            {project.media.length > 1 || cover.kind === 'video' || project.media[0]?.type !== 'image' ? (
              <span className="absolute bottom-3 end-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
                {project.media.length > 1 ? t.projects.mediaCount(project.media.length) : '▶'}
              </span>
            ) : null}
          </button>
        ) : (
          coverInner
        )}
        {project.isNew && (
          <span className="pointer-events-none absolute start-3 top-3 rounded-full bg-brand px-3 py-1 text-xs font-bold text-brand-ink">
            {t.projects.newBadge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold leading-snug text-fg">{project.title}</h3>
        {project.description && <p className="mt-2 text-sm leading-7 text-muted">{project.description}</p>}

        {project.technologies.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2" dir="ltr">
            {project.technologies.map((tech) => (
              <li key={tech} className="rounded-full border border-line px-3 py-1 text-xs font-medium text-fg">
                {tech}
              </li>
            ))}
          </ul>
        )}

        {(demo || code) && (
          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-ink transition hover:brightness-95"
              >
                {t.projects.viewProject}
              </a>
            )}
            {code && (
              <a
                href={code}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-fg transition hover:bg-card-strong"
              >
                {t.projects.viewCode}
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export function ProjectsSection() {
  const { t, lang } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'web' | 'mobile' | 'featured'>('all');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [gallery, setGallery] = useState<{ project: Project; index: number } | null>(null);

  const projects = useMemo(() => getProjects(lang), [lang]);

  const filters = (['all', 'web', 'mobile', 'featured'] as const).map((id) => ({
    id,
    label: t.projects.filters[id],
    count:
      id === 'all'
        ? projects.length
        : id === 'featured'
          ? projects.filter((p) => p.featured).length
          : projects.filter((p) => p.category === id).length,
  }));

  const filtered = projects.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'featured') return p.featured;
    return p.category === filter;
  });

  return (
    <section id="projects" className="relative scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t.projects.title} subtitle={t.projects.subtitle} />

        <div className="mb-10 flex flex-wrap gap-3" role="group" aria-label={t.projects.title}>
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => {
                setFilter(f.id);
                setVisible(PAGE_SIZE);
              }}
              className={`rounded-full px-5 py-2.5 font-semibold transition-colors ${
                filter === f.id
                  ? 'bg-brand text-brand-ink'
                  : 'surface text-fg hover:bg-card-strong'
              }`}
            >
              {f.label}
              <span className="ms-2 rounded-full bg-black/10 px-2 py-0.5 text-xs dark:bg-white/15">{f.count}</span>
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-lg text-muted">{t.projects.empty}</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.slice(0, visible).map((p) => (
              <ProjectCard key={p.id} project={p} onOpen={(project) => setGallery({ project, index: 0 })} />
            ))}
          </div>
        )}

        {visible < filtered.length && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="rounded-full border-2 border-fg/70 px-8 py-4 font-semibold text-fg transition hover:bg-fg hover:text-[var(--sky-1)]"
            >
              {t.projects.showMore}
            </button>
          </div>
        )}
      </div>

      <MediaGallery
        items={gallery?.project.media ?? []}
        title={gallery?.project.title ?? ''}
        startIndex={gallery ? gallery.index : null}
        onClose={() => setGallery(null)}
      />
    </section>
  );
}
