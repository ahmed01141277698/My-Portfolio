import { motion } from 'motion/react';
import { useState } from 'react';
import { useTheme } from './ThemeProvider';

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const skillCategories = {
    frontend: {
      title: 'Frontend Development',
      skills: [
        { name: 'React', level: 95, color: 'from-blue-400 to-blue-600' },
        { name: 'Next.js', level: 90, color: 'from-gray-400 to-gray-600' },
        { name: 'TypeScript', level: 88, color: 'from-blue-500 to-blue-700' },
        { name: 'Tailwind CSS', level: 92, color: 'from-cyan-400 to-cyan-600' },
        { name: 'JavaScript', level: 94, color: 'from-yellow-400 to-yellow-600' },
        { name: 'HTML5 & CSS3', level: 98, color: 'from-orange-400 to-orange-600' },
      ]
    },
    backend: {
      title: 'Backend Development',
      skills: [
        { name: 'Node.js', level: 85, color: 'from-green-400 to-green-600' },
        { name: 'Express.js', level: 82, color: 'from-gray-500 to-gray-700' },
        { name: 'MongoDB', level: 80, color: 'from-green-500 to-green-700' },
        { name: 'PostgreSQL', level: 78, color: 'from-blue-600 to-blue-800' },
        { name: 'REST APIs', level: 90, color: 'from-purple-400 to-purple-600' },
        { name: 'GraphQL', level: 75, color: 'from-pink-400 to-pink-600' },
      ]
    },
    tools: {
      title: 'Tools & Technologies',
      skills: [
        { name: 'Git & GitHub', level: 92, color: 'from-orange-500 to-red-500' },
        { name: 'Docker', level: 70, color: 'from-blue-500 to-blue-700' },
        { name: 'AWS', level: 68, color: 'from-yellow-500 to-orange-500' },
        { name: 'Figma', level: 85, color: 'from-purple-500 to-pink-500' },
        { name: 'VS Code', level: 95, color: 'from-blue-400 to-blue-600' },
        { name: 'Webpack', level: 75, color: 'from-teal-400 to-teal-600' },
      ]
    }
  };

  const categories = Object.keys(skillCategories) as Array<keyof typeof skillCategories>;

    const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ y: 50 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            مهاراتي التقنية
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            خبرات تقنية متنوعة في تطوير المواقع والتطبيقات الحديثة
          </motion.p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex bg-slate-800/50 rounded-2xl p-2 backdrop-blur-sm border border-slate-700/50">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {skillCategories[category].title}
                {activeCategory === category && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl -z-10"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories[activeCategory].skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <motion.div
                className="p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-2xl backdrop-blur-sm border border-slate-700/30"
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)"
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                  <span className="text-lg font-semibold text-blue-400">{skill.level}%</span>
                </div>
                
                {/* Progress Bar Background */}
                <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  >
                    {/* Animated Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-full"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        repeatDelay: 3,
                        ease: "easeInOut" 
                      }}
                    />
                  </motion.div>
                </div>
                
                {/* Skill Level Indicator */}
                <motion.div
                  className="mt-4 flex items-center space-x-1 rtl:space-x-reverse"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.div
                      key={star}
                      className={`w-3 h-3 rounded-full ${
                        star <= Math.floor(skill.level / 20) 
                          ? 'bg-yellow-400' 
                          : 'bg-gray-600'
                      }`}
                      animate={star <= Math.floor(skill.level / 20) ? {
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7]
                      } : {}}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: star * 0.1
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* 3D Floating Elements */}
        <motion.div
          className="absolute top-20 right-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-2xl"
          animate={{
            y: [0, -30, 0],
            rotateX: [0, 180, 360],
            rotateZ: [0, 180, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-20 left-10 w-16 h-16 bg-gradient-to-br from-pink-400/20 to-red-600/20 rounded-full"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
            <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>

    </section>
  );
}