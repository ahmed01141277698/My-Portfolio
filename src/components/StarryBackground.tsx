import { useMemo } from 'react';
import { useTheme } from './ThemeProvider';

/** Small deterministic PRNG so the sky doesn't reshuffle on every render. */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function StarryBackground() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const stars = useMemo(() => {
    const r = rng(42);
    return Array.from({ length: 110 }, (_, i) => ({
      id: i,
      x: r() * 100,
      y: r() * 100,
      size: r() * 2.4 + 0.8,
      o: r() * 0.7 + 0.25,
      dur: 2.5 + r() * 3,
      delay: r() * 4,
    }));
  }, []);

  const clouds = useMemo(() => {
    const r = rng(7);
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      y: 8 + r() * 55,
      w: 140 + r() * 180,
      dur: 90 + r() * 80,
      delay: -r() * 120,
      o: 0.5 + r() * 0.35,
    }));
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{ background: 'linear-gradient(180deg, var(--sky-1) 0%, var(--sky-2) 55%, var(--sky-3) 100%)' }}
      />

      {isDark
        ? stars.map((s) => (
            <span
              key={s.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.size,
                height: s.size,
                ['--o' as string]: s.o,
                opacity: s.o,
                animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
              }}
            />
          ))
        : clouds.map((c) => (
            <span
              key={c.id}
              className="absolute -start-1/4 rounded-full bg-white blur-xl"
              style={{
                top: `${c.y}%`,
                width: c.w,
                height: c.w * 0.32,
                opacity: c.o,
                animation: `drift ${c.dur}s linear ${c.delay}s infinite`,
              }}
            />
          ))}

      {/* Sun by day, moon by night */}
      <div
        className="absolute end-[6vw] top-24 h-24 w-24 rounded-full transition-all duration-700 sm:h-32 sm:w-32"
        style={{
          animation: 'float 7s ease-in-out infinite',
          background: isDark
            ? 'radial-gradient(circle at 35% 35%, #fffbe6 0%, #f3ebc2 60%, #e2d79a 100%)'
            : 'radial-gradient(circle at 35% 35%, #fff3b0 0%, #ffd23f 60%, #ffb703 100%)',
          boxShadow: isDark
            ? '0 0 60px 10px rgb(255 248 200 / 0.25)'
            : '0 0 90px 24px rgb(255 210 63 / 0.55)',
        }}
      >
        {isDark && (
          <>
            <span className="absolute start-[22%] top-[24%] h-3 w-3 rounded-full bg-[#d9cd8c]/70" />
            <span className="absolute end-[24%] top-[44%] h-2 w-2 rounded-full bg-[#d9cd8c]/70" />
            <span className="absolute bottom-[20%] start-[40%] h-4 w-4 rounded-full bg-[#d9cd8c]/60" />
          </>
        )}
      </div>

      {isDark && (
        <span
          className="absolute end-[10%] top-[12%] h-px w-24 bg-gradient-to-l from-white to-transparent"
          style={{ animation: 'shoot 9s ease-out 4s infinite', opacity: 0 }}
        />
      )}
    </div>
  );
}
