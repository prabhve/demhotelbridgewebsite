import React from 'react';
import { BedDouble, UtensilsCrossed, PartyPopper, MapPin } from 'lucide-react';
import { FadeIn } from './MotionContainer';
import { motion } from 'motion/react';

export const QuickInfoStrip: React.FC = () => {
  const features = [
    {
      icon: BedDouble,
      title: "Comfortable Rooms",
      subtitle: "Air conditioned & Suite stays",
      href: "#rooms"
    },
    {
      icon: UtensilsCrossed,
      title: "Royal Kitchen",
      subtitle: "100% Pure Vegetarian dining",
      href: "#restaurant"
    },
    {
      icon: PartyPopper,
      title: "Events & Banquets",
      subtitle: "Weddings, meets & functions",
      href: "#events"
    },
    {
      icon: MapPin,
      title: "Convenient Location",
      subtitle: "Right on Lucknow Bypass, Unnao",
      href: "#location"
    }
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const elem = document.querySelector(href);
    if (elem) {
      const topOffset = 80;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <FadeIn direction="up" distance={20} delay={0.25} className="relative z-20 -mt-8 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="bg-[#FAF8F5] rounded-2xl shadow-xl border border-[#E6DFD5] p-4 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#EFE8DC]">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <a
              key={idx}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className={`flex items-start gap-3.5 group transition-transform duration-200 hover:-translate-y-0.5 ${
                idx > 0 ? 'pt-3 sm:pt-0 sm:pl-4' : ''
              }`}
            >
              <div className="p-2.5 rounded-xl bg-[#F3ECE0] text-[#916B36] group-hover:bg-[#916B36] group-hover:text-white transition-colors duration-200 flex-shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-semibold text-[#1E232A] group-hover:text-[#916B36] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#6F6B64] mt-0.5 leading-normal">
                  {item.subtitle}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </FadeIn>
  );
};
