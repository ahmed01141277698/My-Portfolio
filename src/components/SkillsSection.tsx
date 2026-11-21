import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageProvider';
import { SectionHeading } from './AboutSection';

const skillCategories = {
  frontend: {
    skills: [
      { name: 'React', level: 95, color: 'from-blue-400 to-blue-600' },
      { name: 'Next.js', level: 90, color: 'from-gray-400 to-gray-600' },
      { name: 'TypeScript', level: 88, color: 'from-blue-500 to-blue-700' },
      { name: 'Tailwind CSS', level: 92, color: 'from-cyan-400 to-cyan-600' },
      { name: 'JavaScript', level: 94, color: 'from-yellow-400 to-yellow-600' },
      { name: 'HTML5 & CSS3', level: 98, color: 'from-orange-400 to-orange-600' },
    ],
  },
  backend: {
    skills: [
      { name: 'Node.js', level: 85, color: 'from-green-400 to-green-600' },
      { name: 'Express.js', level: 82, color: 'from-gray-500 to-gray-700' },
      { name: 'MongoDB', level: 80, color: 'from-green-500 to-green-700' },
      { name: 'PostgreSQL', level: 78, color: 'from-blue-600 to-blue-800' },
      { name: 'REST APIs', level: 90, color: 'from-purple-400 to-purple-600' },
      { name: 'GraphQL', level: 75, color: 'from-pink-400 to-pink-600' },
    ],
  },
  tools: {
    skills: [
      { name: 'Git & GitHub', level: 92, color: 'from-orange-500 to-red-500' },
      { name: 'Docker', level: 70, color: 'from-blue-500 to-blue-700' },
      { name: 'AWS', level: 68, color: 'from-yellow-500 to-orange-500' },
      { name: 'Figma', level: 85, color: 'from-purple-500 to-pink-500' },
      { name: 'VS Code', level: 95, color: 'from-blue-400 to-blue-600' },
      { name: 'Webpack', level: 75, color: 'from-teal-400 to-teal-600' },
    ],
  },
} as const;

type CategoryId = keyof typeof skillCategories;
const categoryIds = Object.keys(skillCategories) as CategoryId[];

export function SkillsSection() {
  const { t } = useLanguage();
  const [active, setActive] = useState<CategoryId>('frontend');

  return (
    <section id="skills" className="relative scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t.skills.title} subtitle={t.skills.subtitle} />

        <div
          role="tablist"
          aria-label={t.skills.title}
          className="surface mb-10 inline-flex flex-wrap gap-1 rounded-2xl p-1.5"
        >
          {categoryIds.map((id) => (
            <button
              key={id}
              role="tab"
              id={`tab-${id}`}
              aria-selected={active === id}
              aria-controls="skills-panel"
              onClick={() => setActive(id)}
              className={`rounded-xl px-5 py-2.5 font-semibold transition-colors ${
                active === id ? 'bg-brand text-brand-ink' : 'text-muted hover:text-fg'
              }`}
            >
              {t.skills.categories[id]}
            </button>
          ))}
        </div>

        <ul
          id="skills-panel"
          role="tabpanel"
          aria-labelledby={`tab-${active}`}
          className="grid gap-x-12 gap-y-7 md:grid-cols-2"
        >
          {skillCategories[active].skills.map((skill) => (
            <li key={`${active}-${skill.name}`}>
              <div className="mb-2 flex items-baseline justify-between gap-4">
                <h3 className="text-lg font-bold text-fg" dir="ltr">
                  {skill.name}
                </h3>
                <span className="font-mono text-sm text-muted" dir="ltr">
                  {skill.level}%
                </span>
              </div>
              <div
                role="progressbar"
                aria-label={`${skill.name} — ${t.skills.level}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={skill.level}
                className="h-2.5 w-full overflow-hidden rounded-full bg-line"
              >
                <div
                  className={`h-full origin-[left_center] rounded-full bg-gradient-to-r ${skill.color} rtl:origin-[right_center]`}
                  style={{ width: `${skill.level}%`, animation: 'load-bar 0.9s cubic-bezier(0.2,0.7,0.2,1) both' }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
