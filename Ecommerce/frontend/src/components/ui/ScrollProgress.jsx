import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[1001] h-[3px] pointer-events-none"
      aria-hidden="true"
    >
      <div className="h-full w-full bg-black/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#C8A253] via-[#E8D5A3] to-[#C8A253] transition-[width] duration-150 ease-out shadow-[0_0_12px_rgba(200,162,83,0.5)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
