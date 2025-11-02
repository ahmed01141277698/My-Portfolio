import { motion } from 'motion/react';
import { useTheme } from './ThemeProvider';

interface LoadingScreenProps {
  isLoading: boolean;
}

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-900' 
          : 'bg-gradient-to-br from-sky-100 via-blue-50 to-purple-50'
      }`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              isDark ? 'bg-blue-400/20' : 'bg-blue-300/30'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-30"
          style={{
            background: isDark 
              ? 'linear-gradient(45deg, #3B82F6, #8B5CF6)' 
              : 'linear-gradient(45deg, #60A5FA, #A78BFA)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full blur-3xl opacity-20"
          style={{
            background: isDark 
              ? 'linear-gradient(45deg, #F472B6, #EC4899)' 
              : 'linear-gradient(45deg, #F9A8D4, #F472B6)',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center">
        {/* Logo Container */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          {/* Logo Background Circle */}
          <motion.div
            className={`relative w-32 h-32 mx-auto rounded-full flex items-center justify-center ${
              isDark 
                ? 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50' 
                : 'bg-gradient-to-br from-white/80 to-gray-50/50 border border-gray-200/50'
            } backdrop-blur-sm shadow-2xl`}
            animate={{
              boxShadow: [
                '0 0 20px rgba(59, 130, 246, 0.3)',
                '0 0 40px rgba(139, 92, 246, 0.4)',
                '0 0 20px rgba(59, 130, 246, 0.3)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Logo Text */}
            <motion.h1
              className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              style={{
                background: 'linear-gradient(45deg, #60A5FA, #A78BFA, #F472B6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              RETURN
            </motion.h1>

            {/* Rotating Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-transparent"
              style={{
                background: 'linear-gradient(45deg, #60A5FA, #A78BFA, #F472B6)',
                WebkitMask: 'linear-gradient(white, white) content-box, linear-gradient(white, white)',
                WebkitMaskComposite: 'exclude',
                mask: 'linear-gradient(white, white) content-box, linear-gradient(white, white)',
                maskComposite: 'exclude',
              }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className={`text-xl font-semibold text-2xl ${
            isDark ? 'text-gray-200' : 'text-gray-800'
          }`}>
             ...جاري التحضير
          </h2>

          <p className={`text-sm text-2xl ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            إعداد تجربة مميزة لك
          </p>
        </motion.div>

        {/* Loading Progress */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '100%', opacity: 1 }}
          transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
          className="mt-8 mx-auto max-w-xs"
        >
          <div className={`h-1 rounded-full overflow-hidden ${
            isDark ? 'bg-slate-700/50' : 'bg-gray-200/50'
          }`}>
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* Loading Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex justify-center items-center space-x-2 mt-6"
        >
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 rounded-full ${
                isDark ? 'bg-blue-400' : 'bg-blue-600'
              }`}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}