import { motion } from 'motion/react';
import { useState } from 'react';
import { useTheme } from './ThemeProvider';

export function AboutSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const experiences = [
    {
      icon: '💡',
      title: 'الإبداع في التطوير',
      description: 'أؤمن بأن كل مشروع فرصة لإبداع حلول مبتكرة تلامس احتياجات المستخدمين الحقيقية'
    },
    {
      icon: '🚀',
      title: 'التفكير التجاري',
      description: 'أركز على بناء منتجات رقمية لا تكون جميلة فحسب، بل تحقق أهدافاً تجارية ملموسة'
    },
    {
      icon: '⚡',
      title: 'الأداء والسرعة',
      description: 'أطور مواقع وتطبيقات سريعة ومحسنة تقدم تجربة مستخدم استثنائية'
    },
    {
      icon: '🎯',
      title: 'حل المشكلات',
      description: 'كل سطر كود أكتبه يهدف لحل مشكلة حقيقية وتسهيل حياة المستخدمين'
    }
  ];

  return (
    <section id="about" className="py-20 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
            initial={{ y: 50 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            من أنا؟
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Personal Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              className={`relative p-8 rounded-2xl backdrop-blur-sm border transition-colors duration-300 ${
                isDark 
                  ? 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50' 
                  : 'bg-gradient-to-br from-white/80 to-gray-50/80 border-gray-200/50'
              }`}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg text-right" />
              <h3 className={`text-2xl text-right font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                رحلتي في عالم التطوير
              </h3>
              <p className={`text-lg leading-relaxed text-right ${isDark ? 'text-gray-300' : 'text-gray-700 t'}`}>
                بدأت رحلتي في عالم البرمجة منذ أكثر من 4 سنوات، وطوال هذه المدة كنت شغوفاً 
                بتعلم أحدث التقنيات وتطبيقها في مشاريع تخدم الأعمال والمجتمع 
              </p>
            </motion.div>

            <motion.div
              className={`relative p-8 rounded-2xl backdrop-blur-sm border transition-colors duration-300 ${
                isDark 
                  ? 'bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/20' 
                  : 'bg-gradient-to-br from-purple-50/80 to-blue-50/80 border-purple-200/30'
              }`}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg" />
              <h3 className={`text-2xl font-bold mb-4 text-right ${isDark ? 'text-white' : 'text-gray-900'}`}>
                فلسفتي في العمل
              </h3>
              <p className={`text-lg leading-relaxed text-right ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                أؤمن بأن التكنولوجيا وسيلة لحل المشكلات الحقيقية. لذلك أركز على فهم 
                احتياجات العميل أولاً، ثم أبني حلولاً تقنية تحقق أهدافه التجارية
              </p>
            </motion.div>

            <motion.div
              className="flex items-center justify-center space-x-6 rtl:space-x-reverse pt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-center">
                <motion.div
                  className="text-3xl font-bold text-blue-400"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  +50
                </motion.div>
                <p className="text-gray-400">مشروع مكتمل</p>
              </div>
              <div className="text-center">
                <motion.div
                  className="text-3xl font-bold text-purple-400"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  +30
                </motion.div>
                <p className="text-gray-400">عميل راضي</p>
              </div>
              <div className="text-center">
                <motion.div
                  className="text-3xl font-bold text-pink-400"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  4+
                </motion.div>
                <p className="text-gray-400">سنوات خبرة</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Values Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <motion.div
                  className="p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-xl backdrop-blur-sm border border-slate-700/30 h-full"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="text-4xl mb-4"
                    animate={hoveredCard === index ? { rotate: [0, 10, -10, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {exp.icon}
                  </motion.div>
                  <h4 className="text-xl font-bold text-white mb-3 text-right">{exp.title}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed text-right">{exp.description}</p>
                  
                  {/* Hover Effect Border */}
                  <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-blue-400/50 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
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