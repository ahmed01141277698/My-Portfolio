import { useState } from 'react';
import { ImageWithFallback  } from './figma/ImageWithFallback';
import { useTheme } from './ThemeProvider';
import { motion } from 'framer-motion';
import qiuz from "../Img/صورة-الاختبارات-الالكترونية.jpeg"
import design from "../Img/design.png"
  import energy from "../Img/enargy.png"
import { title } from 'process';
export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(6)
  const { theme } = useTheme();



  const projects = [
    {
      id: 1,
      title: 'منصة إدارة الطاقة الذكية',
      description: 'منصة إدارة الطاقة الذكية: حل مبتكر لمراقبة استهلاك الطاقة وتحسين الكفاءة وتقليل التكاليف بشكل ذكي',
      image:energy,
      category: 'web',
      technologies: ['React 18', 'Node.js', 'MongoDB', 'Tailwind + Radix UI' , 'Redux Toolkit'],
      demoUrl: 'https://energy-intelligence-platform-sm7j.vercel.app/',
      codeUrl: 'https://github.com/ahmed01141277698/energy-intelligence-platform.git',
      featured: true
    },
    {
      id: 2,
      title: 'React 19 و Vite منصة إدارة البيانات التفاعلية باستخدام ',
      description:'مدمجة مع مكتبات قوية للجداول، الرسوم البيانية، الخرائط والتقويم لتوفير منصة مرنة وسهلة لعرض البيانات والإحصائيات' ,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'web',
      technologies: ['React 19', 'Material UI / Joy UI', 'React Router DOM', 'React Hook Form'],
          demoUrl: 'http://dashboard-ab.vercel.app',
      codeUrl: 'https://github.com/ahmed01141277698/Dashboard-AB.git',
      featured: true
    },
    {
      id: 3,
      title: 'FDT Market',
      description: 'منصة تجارة إلكترونية متكاملة بتوفر تجربة تسوّق حديثة وسريعة مع واجهة تفاعلية وإدارة بيانات قوية',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpg7-CWYk9weKh449FNF22hEHRf6YQ9axa-W6-sZythBMBjVr_hGeUI9WhYBggiE3HG4c&usqp=CAU',
      category: 'mobile',
      technologies: ['React 19', 'Redux Toolkit', 'TailwindCSS' ,'React Router DOM' ,'React-Redux' , 'React-Redux'],
    demoUrl: 'https://fdt-market.vercel.app/',
      codeUrl: 'https://github.com/ahmed01141277698/FDT-market',
      featured: false
    },
    {
      id: 4,
      title: 'QuestionHub',
      description: 'مخزن الأسئلة المرن للمدرّسين — ارفع JSON وشارك رابط الاختبار فورًا.',
      image: qiuz,
      category: 'web',
      technologies: ['Html', 'CSS', 'javascript'],
           demoUrl: 'https://quiz-git-main-ahmed01141277698s-projects.vercel.app/',
      codeUrl: 'https://github.com/ahmed01141277698/quiz',
      featured: false
    },
    {
      id: 5,
      title: 'BADA... واجهتك الذكية',
      description:' صميم واجهة تفاعلية عصرية، خفيفة وسلسة، مزودة بحركات جذابة لتجربة استخدام مميزة وبسيطة',
      image: design,
      category: 'web',
      technologies: ['HTML', 'ES6 JS', 'CSS'],
          demoUrl: 'https://design-pro-liart.vercel.app/',
      codeUrl: 'https://github.com/ahmed01141277698/Design.git',
      featured: true
    },
    {
      id: 6,
      title: 'تطبيق الصحة واللياقة',
      description: 'تطبيق جوال لتتبع اللياقة البدنية مع برامج تدريب مخصصة',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTkxNTA2MDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'mobile',
      technologies: ['Flutter', 'Dart', 'Firebase', 'HealthKit'],
           demoUrl: 'http://dashboard-ab.vercel.app',
      codeUrl: 'https://github.com/ahmed01141277698/Dashboard-AB.git',
      featured: false
     },
        {
      id: 6,
      title: 'تطبيق الصحة واللياقة',
      description: 'تطبيق جوال لتتبع اللياقة البدنية مع برامج تدريب مخصصة',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTkxNTA2MDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'mobile',
      technologies: ['Flutter', 'Dart', 'Firebase', 'HealthKit'],
           demoUrl: 'http://dashboard-ab.vercel.app',
      codeUrl: 'https://github.com/ahmed01141277698/Dashboard-AB.git',
      featured: false
     },
            {
      id: 6,
      title: 'تطبيق الصحة واللياقة',
      description: 'تطبيق جوال لتتبع اللياقة البدنية مع برامج تدريب مخصصة',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTkxNTA2MDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'mobile',
      technologies: ['Flutter', 'Dart', 'Firebase', 'HealthKit'],
           demoUrl: 'http://dashboard-ab.vercel.app',
      codeUrl: 'https://github.com/ahmed01141277698/Dashboard-AB.git',
      featured: false
     },
                {
      id: 6,
      title: 'تطبيق الصحة واللياقة',
      description: 'تطبيق جوال لتتبع اللياقة البدنية مع برامج تدريب مخصصة',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTkxNTA2MDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'mobile',
      technologies: ['Flutter', 'Dart', 'Firebase', 'HealthKit'],
           demoUrl: 'http://dashboard-ab.vercel.app',
      codeUrl: 'https://github.com/ahmed01141277698/Dashboard-AB.git',
      featured: false
     },                {
      id: 6,
      title: 'تطبيق الصحة واللياقة',
      description: 'تطبيق جوال لتتبع اللياقة البدنية مع برامج تدريب مخصصة',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTkxNTA2MDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'mobile',
      technologies: ['Flutter', 'Dart', 'Firebase', 'HealthKit'],
           demoUrl: 'http://dashboard-ab.vercel.app',
      codeUrl: 'https://github.com/ahmed01141277698/Dashboard-AB.git',
      featured: false
    },                {
      id: 6,
      title: 'تطبيق الصحة واللياقة',
      description: 'تطبيق جوال لتتبع اللياقة البدنية مع برامج تدريب مخصصة',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTkxNTA2MDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'mobile',
      technologies: ['Flutter', 'Dart', 'Firebase', 'HealthKit'],
           demoUrl: 'http://dashboard-ab.vercel.app',
      codeUrl: 'https://github.com/ahmed01141277698/Dashboard-AB.git',
      featured: false
    },                {
      id: 6,
      title: 'تطبيق الصحة واللياقة',
      description: 'تطبيق جوال لتتبع اللياقة البدنية مع برامج تدريب مخصصة',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTkxNTA2MDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'mobile',
      technologies: ['Flutter', 'Dart', 'Firebase', 'HealthKit'],
           demoUrl: 'http://dashboard-ab.vercel.app',
      codeUrl: 'https://github.com/ahmed01141277698/Dashboard-AB.git',
      featured: false
    },        {
      id: 6,
      title: 'تطبيق الصحة واللياقة',
      description: 'تطبيق جوال لتتبع اللياقة البدنية مع برامج تدريب مخصصة',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTkxNTA2MDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'mobile',
      technologies: ['Flutter', 'Dart', 'Firebase', 'HealthKit'],
           demoUrl: 'http://dashboard-ab.vercel.app',
      codeUrl: 'https://github.com/ahmed01141277698/Dashboard-AB.git',
      featured: false
    },        {
      id: 6,
      title: 'تطبيق الصحة واللياقة',
      description: 'تطبيق جوال لتتبع اللياقة البدنية مع برامج تدريب مخصصة',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTkxNTA2MDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'mobile',
      technologies: ['Flutter', 'Dart', 'Firebase', 'HealthKit'],
           demoUrl: 'http://dashboard-ab.vercel.app',
      codeUrl: 'https://github.com/ahmed01141277698/Dashboard-AB.git',
      featured: false
    },        {
      id: 6,
      title: 'تطبيق الصحة واللياقة',
      description: 'تطبيق جوال لتتبع اللياقة البدنية مع برامج تدريب مخصصة',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTkxNTA2MDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'mobile',
      technologies: ['Flutter', 'Dart', 'Firebase', 'HealthKit'],
           demoUrl: 'http://dashboard-ab.vercel.app',
      codeUrl: 'https://github.com/ahmed01141277698/Dashboard-AB.git',
      featured: false
    }
   ];
  
  
  
  
  
  const filters = [
    { id: 'all', label: 'جميع المشاريع', count: projects.length },
    { id: 'web', label: 'مواقع الويب', count: projects.filter(p => p.category === 'web').length },
    { id: 'mobile', label: 'تطبيقات الجوال', count: projects.filter(p => p.category === 'mobile').length },
    { id: 'featured', label: 'مشاريع مميزة', count: projects.filter(p => p.featured).length }
  ];

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'featured') return project.featured;
    return project.category === activeFilter;
  });

  const visibleProjects = filteredProjects.slice(0, visibleCount);



 const handleShowMore = () => {
    setVisibleCount(prev => prev + 6);
  };





  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl font-semibold mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header (ما غيرناش) */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <motion.h2 className="text-4xl md:text-5xl font-bold text-white mb-6" initial={{ y: 50 }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
            أعمالي ومشاريعي
          </motion.h2>
          <motion.div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto mb-8" initial={{ width: 0 }} whileInView={{ width: 96 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }} />
          <motion.p className="text-xl text-gray-300 max-w-3xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
            مجموعة من المشاريع التي طورتها لحل مشكلات حقيقية وتحقيق أهداف تجارية
          </motion.p>
        </motion.div>

        {/* Filters (ما تغيرش) */}
        <motion.div className="flex flex-wrap justify-center gap-4 mb-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          {filters.map(filter => (
            <motion.button key={filter.id} onClick={() => setActiveFilter(filter.id)} className={`relative px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeFilter === filter.id ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600' : 'text-gray-400 bg-slate-800/50 hover:text-white hover:bg-slate-700/50'}`} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              {filter.label}
              <span className="ml-2 px-2 py-1 text-xs bg-white/20 rounded-full">{filter.count}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">



          {visibleProjects.map((project, index) => (
            <motion.div key={project.id} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.5, delay: index * 0.06 }} className="relative" onMouseEnter={() => setHoveredProject(project.id)} onMouseLeave={() => setHoveredProject(null)}>
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-slate-700/30">
                {/* صورة المشروع */}
                <div className="relative h-48 overflow-hidden">
    <ImageWithFallback  src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500" />
                  {/* Gradient overlay أسفل الأزرار - لا تمنع النقر */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none" />

                  {/* === هنا بنستخدم state بدل group-hover === */}
                  <div
                    className="absolute inset-0 z-30 flex items-center justify-center gap-4"
                    style={{
                      opacity: hoveredProject === project.id ? 1 : 0,
                      pointerEvents: hoveredProject === project.id ? 'auto' : 'none',
                      transition: 'opacity 180ms ease'
                    }}
                  >
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                      عرض المشروع
                    </a>

                    <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                      الكود المصدري
                    </a>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 text-right">{project.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed text-right">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span key={tech} className="px-3 py-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 text-xs rounded-full border border-blue-500/30">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover border (اختياري) */}
                <div
                  className="absolute inset-0 rounded-2xl border-2 from-blue-400 to-purple-400 opacity-0 transition-opacity"
                  style={{
                    opacity: hoveredProject === project.id ? 1 : 0,
                    background: hoveredProject === project.id ? 'linear-gradient(45deg, rgba(59, 130, 246, 0.06), rgba(147, 51, 234, 0.06))' : 'transparent',
                    zIndex: 25,
                    pointerEvents: 'none'
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA + Scroll button (ما تغيروش) */}
      {visibleCount < filteredProjects.length && (
          <div style={{margin:20}} className="text-center pt-15">
            <motion.button 
              onClick={handleShowMore}
              className="px-8 pt-15 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700"
            >
              عرض المزيد من الأعمال
            </motion.button>
          </div>
        )}
      </div>

      <motion.button onClick={scrollToTop} className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300" whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </section>
  );
}
