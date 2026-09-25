import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Compass, Sparkles } from 'lucide-react';

interface SectionMilestone {
  id: string;
  label: string;
}

const SECTIONS: SectionMilestone[] = [
  { id: 'home', label: 'Welcome' },
  { id: 'rooms', label: 'Rooms & Suites' },
  { id: 'facilities', label: 'Amenities' },
  { id: 'restaurant', label: 'Royal Kitchen' },
  { id: 'events', label: 'Banquets & Events' },
  { id: 'gallery', label: 'Photo Gallery' },
  { id: 'attractions', label: 'Nearby Hubs' },
  { id: 'location', label: 'Location & Map' },
  { id: 'reviews', label: 'Guest Reviews' },
  { id: 'faq', label: 'FAQs' },
  { id: 'contact', label: 'Contact & Booking' },
];

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  const [currentSection, setCurrentSection] = useState<string>('Welcome');
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);

  useEffect(() => {
    let scrollTimer: NodeJS.Timeout;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, Math.max(0, Math.round((scrollY / docHeight) * 100))) : 0;

      setScrollPercent(progress);
      setHasScrolled(scrollY > 40);
      setIsScrolling(true);

      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        setIsScrolling(false);
      }, 1400);

      // Determine active section
      const scrollMiddle = scrollY + window.innerHeight * 0.35;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollMiddle >= top - 80) {
            setCurrentSection(SECTIONS[i].label);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none select-none print:hidden">
      {/* Background Micro-Track */}
      <div className="h-[3.5px] w-full bg-black/30 backdrop-blur-xs relative overflow-hidden">
        {/* Animated Gold Gradient Progress Fill */}
        <motion.div
          style={{ scaleX }}
          className="h-full w-full origin-left bg-gradient-to-r from-[#916B36] via-[#C5963B] via-[#E5B869] via-[#FFF3C7] to-[#E5B869] relative shadow-[0_0_12px_rgba(229,184,105,0.7)]"
        >
          {/* Shimmer light pass effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />

          {/* Glowing Lead Beacon at the exact tip */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_#FFF3C7,0_0_14px_#E5B869] border border-[#E5B869]/80" />
        </motion.div>
      </div>

      {/* Floating Section Milestone Tag (Subtly appears while scrolling long sections) */}
      <div
        className={`absolute top-2 right-4 transition-all duration-300 transform pointer-events-auto ${
          isScrolling && hasScrolled
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14171C]/90 backdrop-blur-md border border-[#E5B869]/30 text-white shadow-xl text-[11px] font-medium tracking-wide">
          <Sparkles className="w-3 h-3 text-[#E5B869] animate-spin-slow" />
          <span className="text-stone-300 font-serif">{currentSection}</span>
          <span className="w-1 h-1 rounded-full bg-stone-500" />
          <span className="font-mono text-[10px] text-[#E5B869] font-bold">{scrollPercent}%</span>
        </div>
      </div>
    </div>
  );
};
