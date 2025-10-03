import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleDelay: number;
}

interface Cloud {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

export function StarryBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [clouds, setClouds] = useState<Cloud[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      const starCount = theme === 'dark' ? 200 : 50;
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: theme === 'dark' ? Math.random() * 0.8 + 0.2 : Math.random() * 0.3 + 0.1,
          twinkleDelay: Math.random() * 3,
        });
      }
      setStars(newStars);
    };

    const generateClouds = () => {
      const newClouds: Cloud[] = [];
      const cloudCount = theme === 'light' ? 8 : 3;
      for (let i = 0; i < cloudCount; i++) {
        newClouds.push({
          id: i,
          x: Math.random() * 120 - 10,
          y: Math.random() * 60 + 10,
          size: Math.random() * 80 + 40,
          opacity: theme === 'light' ? Math.random() * 0.4 + 0.3 : Math.random() * 0.2 + 0.1,
          speed: Math.random() * 0.5 + 0.2,
        });
      }
      setClouds(newClouds);
    };

    generateStars();
    generateClouds();

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [theme]);

  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Background Gradient */}
      <div 
        className={`absolute inset-0 transition-all duration-1000 ${
          isDark 
            ? 'bg-gradient-to-b from-indigo-950 via-purple-900 to-slate-900' 
            : 'bg-gradient-to-b from-sky-300 via-sky-400 to-blue-500'
        }`} 
      />
      
      {/* Clouds */}
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className={`absolute rounded-full ${
            isDark ? 'bg-gray-700/20' : 'bg-white/60'
          }`}
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            width: `${cloud.size}px`,
            height: `${cloud.size * 0.6}px`,
            opacity: cloud.opacity,
          }}
          animate={{
            x: [`${cloud.x}%`, `${cloud.x + 30}%`],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 40 + cloud.speed * 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Cloud details for realism */}
          <div 
            className={`absolute top-2 left-4 w-8 h-4 rounded-full ${
              isDark ? 'bg-gray-600/30' : 'bg-white/40'
            }`} 
          />
          <div 
            className={`absolute bottom-2 right-6 w-6 h-3 rounded-full ${
              isDark ? 'bg-gray-600/30' : 'bg-white/40'
            }`} 
          />
        </motion.div>
      ))}

      {/* Stars (more prominent in dark mode) */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className={`absolute rounded-full ${
            isDark ? 'bg-white' : 'bg-yellow-200'
          }`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.3, star.opacity],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: star.twinkleDelay,
          }}
        />
      ))}

      {/* Sun (Light Mode) / Moon (Dark Mode) */}
      <motion.div
        className={`absolute top-16 right-16 w-28 h-28 rounded-full transition-all duration-1000 ${
          isDark 
            ? 'bg-gradient-to-br from-yellow-200 to-yellow-100 shadow-lg' 
            : 'bg-gradient-to-br from-yellow-300 to-orange-400 shadow-xl'
        }`}
        animate={{
          y: [0, -15, 0],
          boxShadow: isDark ? [
            '0 0 20px rgba(255, 255, 200, 0.3)',
            '0 0 30px rgba(255, 255, 200, 0.5)',
            '0 0 20px rgba(255, 255, 200, 0.3)',
          ] : [
            '0 0 30px rgba(255, 193, 7, 0.4)',
            '0 0 50px rgba(255, 193, 7, 0.6)',
            '0 0 30px rgba(255, 193, 7, 0.4)',
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`,
        }}
      >
        {/* Moon craters (dark mode) or Sun rays (light mode) */}
        {isDark ? (
          <>
            <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-yellow-300 opacity-40" />
            <div className="absolute top-8 right-6 w-1 h-1 rounded-full bg-yellow-300 opacity-60" />
            <div className="absolute bottom-6 left-8 w-1.5 h-1.5 rounded-full bg-yellow-300 opacity-50" />
          </>
        ) : (
          <>
            {/* Sun rays */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-8 bg-yellow-300 rounded-full origin-bottom"
                style={{
                  top: '-16px',
                  left: '50%',
                  transformOrigin: '50% 30px',
                  transform: `translateX(-50%) rotate(${i * 45}deg)`,
                }}
                animate={{
                  opacity: [0.6, 1, 0.6],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </>
        )}
      </motion.div>

      {/* Shooting Stars (more visible in dark mode) */}
      {isDark && (
        <motion.div
          className="absolute w-1 h-1 bg-white rounded-full"
          animate={{
            x: [-100, window.innerWidth + 100],
            y: [100, 200],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 8,
            ease: "easeOut"
          }}
        >
          <div className="absolute -left-10 w-10 h-0.5 bg-gradient-to-r from-transparent to-white opacity-70" />
        </motion.div>
      )}

      {/* Additional atmospheric effects */}
      <motion.div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isDark ? 'opacity-20' : 'opacity-10'
        }`}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundImage: isDark 
            ? 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%)'
            : 'radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.2) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(173, 216, 230, 0.3) 0%, transparent 50%)',
          backgroundSize: '100% 100%',
        }}
      />
    </div>
  );
}