import React from 'react';
import { useHotel } from '../context/HotelContext';
import { MessageSquare, Phone, MapPin, Sparkles } from 'lucide-react';
import { FadeIn } from './MotionContainer';
import { motion } from 'motion/react';

export const FinalCta: React.FC = () => {
  const { hotel, openWhatsApp, getPhoneCallUrl } = useHotel();

  return (
    <section className="py-20 bg-[#1A1E24] text-white relative overflow-hidden border-t border-stone-800">
      {/* Subtle decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#E5B869_1px,transparent_1px)] [background-size:20px_20px]" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <FadeIn direction="up" distance={20}>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full p-0.5 bg-black/40 border border-[#E5B869]/50 shadow-[0_0_20px_rgba(229,184,105,0.2)]">
              <img
                src="/logo.svg"
                alt="Hotel Bridge Seal"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-[#E5B869] font-bold inline-flex items-center gap-1.5 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            DIRECT BOOKING ADVANTAGE
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Experience Thoughtful Hospitality in Unnao
          </h2>

          <p className="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto mb-9 font-light leading-relaxed">
            Book your room, reserve a dining table at Royal Kitchen, or organize your next event directly with our hotel team.
          </p>

          {/* Action Buttons - Unwrapped, single line labels */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
            <button
              onClick={() => openWhatsApp('general')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#128C7E] hover:bg-[#0c6b60] text-white font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 flex-shrink-0" />
              <span>Connect on WhatsApp</span>
            </button>

            <a
              href={getPhoneCallUrl()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-white/40 font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-[#E5B869] flex-shrink-0" />
              <span>Call +91 63079 51300</span>
            </a>
          </div>

          <div className="mt-9 text-xs text-stone-400 flex items-center justify-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#E5B869] flex-shrink-0" />
            <span className="font-normal tracking-wide">595, Pitamber Nagar-II, Lucknow Bypass, Unnao, UP</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

