import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { Bold } from 'lucide-react';

export function HeroSection() {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const fullText = 'أحمد بدوي';
  const { theme } = useTheme();
  
  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
        if (text.length === fullText.length) {
          setIsTyping(false);
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [text, isTyping]);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isDark = theme === 'dark';

  return (
    <section id="home" className="min-h-screen font-semibold flex items-center justify-center relative overflow-hidden ">
      <div className="max-w-7xl   mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 ">
        {/* Floating 3D Elements */}
        <motion.div
          className={`absolute top-20 left-20 w-20 h-20 rounded-lg opacity-20 ${
            isDark 
              ? 'bg-gradient-to-br from-blue-400 to-purple-600' 
              : 'bg-gradient-to-br from-blue-300 to-purple-500'
          }`}
          animate={{
            y: [0, -20, 0],
            rotateX: [0, 360],
            rotateY: [0, 180],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className={`absolute top-40 right-32 w-16 h-16 rounded-full opacity-20 ${
            isDark 
              ? 'bg-gradient-to-br from-pink-400 to-red-600' 
              : 'bg-gradient-to-br from-pink-300 to-red-500'
          }`}
          animate={{
            x: [0, 30, 0],
            y: [0, -15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        <motion.div
          className={`absolute bottom-32 left-1/4 w-12 h-12 rounded-md opacity-20 ${
            isDark 
              ? 'bg-gradient-to-br from-green-400 to-blue-600' 
              : 'bg-gradient-to-br from-green-300 to-blue-500'
          }`}
          animate={{
            rotate: [0, 360],
            y: [0, -25, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8 max-w-5xl mx-auto"
        >
          {/* Welcome Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className={`text-lg md:text-x1  tracking-wider ${
              isDark ? 'text-blue-400' : 'text-blue-600 '
              }`}
            style={{margin:60, fontSize:28 }}
          >
            <h1>   مرحباً ، أنا</h1>
         
          </motion.p>

          {/* Name with 3D Effect */}
          <div className="relative">
            <motion.h1
              className={`text-5xl md:text-7xl lg:text-8xl font-bold relative z-10 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              style={{
                textShadow: isDark 
                  ? '0 0 20px rgba(59, 130, 246, 0.5)' 
                  : '0 0 20px rgba(59, 130, 246, 0.3)',
              }}
            >
              {text}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className={isDark ? 'text-blue-400' : 'text-blue-600'}
              >
                {isTyping ? '|' : ''}
              </motion.span>
            </motion.h1>
            
            {/* 3D Shadow Effect */}
            <motion.h1
              className={`absolute top-2 left-2 text-5xl md:text-7xl lg:text-8xl font-bold -z-10 ${
                isDark ? 'text-blue-900/30' : 'text-blue-200/50'
              }`}
              animate={{
                x: [2, 6, 2],
                y: [2, 6, 2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {text}
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className={`text-2xl md:text-3xl max-w-4xl mx-auto leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            مطور ويب شغوف بتطوير حلول رقمية إبداعية
            <br />
            <span className={isDark ? 'text-purple-400' : 'text-purple-600'}>
              تحول الأفكار إلى واقع رقمي
            </span>
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className={`text-lg max-w-3xl mx-auto leading-relaxed ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            <h1> متخصص في تطوير مواقع ويب وتطبيقات متقدمة باستخدام أحدث التقنيات
            أركز على بناء حلول تقنية تساعد الشركات على النمو وحل مشكلاتها الحقيقية</h1>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12"
          >
            <motion.button
              onClick={scrollToProjects}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">استعرض أعمالي</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
              />
            </motion.button>

            <motion.a
              href="#contact"
              className={`group px-8 py-4 border-2 rounded-full font-semibold transition-all duration-300 ${
                isDark 
                  ? 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white' 
                  : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              تواصل معي
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`w-6 h-10 border-2 rounded-full flex justify-center ${
              isDark ? 'border-gray-400' : 'border-gray-600'
            }`}
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`w-1 h-3 rounded-full mt-2 ${
                isDark ? 'bg-blue-400' : 'bg-blue-600'
              }`}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}