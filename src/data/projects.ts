
const localImages = import.meta.glob('../Img/*.{png,jpg,jpeg,webp,avif,gif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

function findImage(...keywords: string[]): string | undefined {
  const entry = Object.entries(localImages).find(([file]) =>
    keywords.some((k) => file.toLowerCase().includes(k)),
  );
  return entry?.[1];
}

const energy = findImage('energy', 'enargy', 'enrgy');
const design = findImage('design');
const qiuz = findImage('qiuz', 'quiz', 'اختبار');
import newProjectsRaw from './newProjects.json';
import type { Lang } from '../i18n/translations';
import type { MediaItem } from '../lib/media';

export type Category = 'web' | 'mobile' | 'other';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: Category;
  featured: boolean;
  technologies: string[];
  demoUrl?: string;
  codeUrl?: string;
  media: MediaItem[];
  isNew: boolean;
}

interface StaticProject {
  id: string;
  image?: string;
  category: Category;
  featured: boolean;
  technologies: string[];
  demoUrl: string;
  codeUrl: string;
  text: Record<Lang, { title: string; description: string }>;
}

/** The original portfolio projects. New ones are added from the local dashboard (src/data/newProjects.json). */
const staticProjects: StaticProject[] = [
  {
    id: 'energy',
    image: energy,
    category: 'web',
    featured: true,
    technologies: ['React 18', 'Node.js', 'MongoDB', 'Tailwind + Radix UI', 'Redux Toolkit'],
    demoUrl: 'https://energy-intelligence-platform-sm7j.vercel.app/',
    codeUrl: 'https://github.com/ahmed01141277698/energy-intelligence-platform.git',
    text: {
      ar: {
        title: 'منصة إدارة الطاقة الذكية',
        description:
          'منصة إدارة الطاقة الذكية: حل مبتكر لمراقبة استهلاك الطاقة وتحسين الكفاءة وتقليل التكاليف بشكل ذكي',
      },
      en: {
        title: 'Smart Energy Management Platform',
        description:
          'An innovative solution to monitor energy consumption, improve efficiency, and cut costs intelligently.',
      },
    },
  },
  {
    id: 'dashboard-ab',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0',
    category: 'web',
    featured: true,
    technologies: ['React 19', 'Material UI / Joy UI', 'React Router DOM', 'React Hook Form'],
    demoUrl: 'http://dashboard-ab.vercel.app',
    codeUrl: 'https://github.com/ahmed01141277698/Dashboard-AB.git',
    text: {
      ar: {
        title: 'منصة إدارة البيانات التفاعلية باستخدام React 19 و Vite',
        description:
          'مدمجة مع مكتبات قوية للجداول، الرسوم البيانية، الخرائط والتقويم لتوفير منصة مرنة وسهلة لعرض البيانات والإحصائيات',
      },
      en: {
        title: 'Interactive data management platform built with React 19 and Vite',
        description:
          'Integrated with powerful libraries for tables, charts, maps, and calendars to provide a flexible, easy-to-use platform for displaying data and statistics.',
      },
    },
  },
  {
    id: 'fdt-market',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpg7-CWYk9weKh449FNF22hEHRf6YQ9axa-W6-sZythBMBjVr_hGeUI9WhYBggiE3HG4c&usqp=CAU',
    category: 'mobile',
    featured: false,
    technologies: ['React 19', 'Redux Toolkit', 'TailwindCSS', 'React Router DOM', 'React-Redux'],
    demoUrl: 'https://fdt-market.vercel.app/',
    codeUrl: 'https://github.com/ahmed01141277698/FDT-market',
    text: {
      ar: {
        title: 'FDT Market',
        description:
          'منصة تجارة إلكترونية متكاملة بتوفر تجربة تسوّق حديثة وسريعة مع واجهة تفاعلية وإدارة بيانات قوية',
      },
      en: {
        title: 'FDT Market',
        description:
          'A complete e-commerce platform offering a modern, fast shopping experience with an interactive interface and robust data management.',
      },
    },
  },
  {
    id: 'questionhub',
    image: qiuz,
    category: 'web',
    featured: false,
    technologies: ['Html', 'CSS', 'javascript'],
    demoUrl: 'https://quiz-git-main-ahmed01141277698s-projects.vercel.app/',
    codeUrl: 'https://github.com/ahmed01141277698/quiz',
    text: {
      ar: {
        title: 'QuestionHub',
        description: 'مخزن الأسئلة المرن للمدرّسين — ارفع JSON وشارك رابط الاختبار فورًا.',
      },
      en: {
        title: 'QuestionHub',
        description: 'A flexible question bank for teachers — upload JSON and share the quiz link instantly.',
      },
    },
  },
  {
    id: 'bada',
    image: design,
    category: 'web',
    featured: true,
    technologies: ['HTML', 'ES6 JS', 'CSS'],
    demoUrl: 'https://design-pro-liart.vercel.app/',
    codeUrl: 'https://github.com/ahmed01141277698/Design.git',
    text: {
      ar: {
        title: 'BADA... واجهتك الذكية',
        description: 'تصميم واجهة تفاعلية عصرية، خفيفة وسلسة، مزودة بحركات جذابة لتجربة استخدام مميزة وبسيطة',
      },
      en: {
        title: 'BADA... your smart interface',
        description:
          'A modern, lightweight, smooth interactive interface with engaging animations for a distinctive yet simple experience.',
      },
    },
  },
  {
    id: 'fitness',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    category: 'mobile',
    featured: false,
    technologies: ['Flutter', 'Dart', 'Firebase', 'HealthKit'],
    demoUrl: 'http://dashboard-ab.vercel.app',
    codeUrl: 'https://github.com/ahmed01141277698/Dashboard-AB.git',
    text: {
      ar: {
        title: 'تطبيق الصحة واللياقة',
        description: 'تطبيق جوال لتتبع اللياقة البدنية مع برامج تدريب مخصصة',
      },
      en: {
        title: 'Health & Fitness App',
        description: 'A mobile app for tracking fitness with personalized training programs.',
      },
    },
  },
];

interface StoredProject {
  id: string;
  createdAt?: string;
  title?: Partial<Record<Lang, string>>;
  description?: Partial<Record<Lang, string>>;
  category?: Category;
  featured?: boolean;
  technologies?: string[];
  demoUrl?: string;
  codeUrl?: string;
  media?: MediaItem[];
}

function pick(v: Partial<Record<Lang, string>> | undefined, lang: Lang) {
  const other: Lang = lang === 'ar' ? 'en' : 'ar';
  return v?.[lang]?.trim() || v?.[other]?.trim() || '';
}

/** New projects first (newest on top), then the original ones. */
export function getProjects(lang: Lang): Project[] {
  const added = (newProjectsRaw as StoredProject[])
    .slice()
    .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
    .map<Project>((p) => ({
      id: p.id,
      title: pick(p.title, lang),
      description: pick(p.description, lang),
      category: p.category || 'web',
      featured: !!p.featured,
      technologies: p.technologies || [],
      demoUrl: p.demoUrl,
      codeUrl: p.codeUrl,
      media: p.media || [],
      isNew: true,
    }));

  const original = staticProjects.map<Project>((p) => ({
    id: p.id,
    title: p.text[lang].title,
    description: p.text[lang].description,
    category: p.category,
    featured: p.featured,
    technologies: p.technologies,
    demoUrl: p.demoUrl,
    codeUrl: p.codeUrl,
    media: p.image ? [{ type: 'image', src: p.image }] : [],
    isNew: false,
  }));

  return [...added, ...original];
}