import React from 'react';
import { useHotel } from '../context/HotelContext';
import { CheckCircle2, Phone, MessageSquare } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from './MotionContainer';
import { motion } from 'motion/react';

export const AboutSection: React.FC = () => {
  const { hotel, openWhatsApp, getPhoneCallUrl } = useHotel();

  return (
    <section id="about" className="py-20 bg-[#FAF8F5] text-[#1E232A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Imagery Grid */}
          <div className="lg:col-span-5 relative">
            <FadeIn direction="right" distance={30} duration={0.8}>
              <div className="relative rounded-2xl overflow-hidden shadow-md border border-[#E6DFD5] aspect-[4/3]">
                <img
                  src={hotel.heroSecondaryImage || "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"}
                  alt="Hotel Bridge Unnao hospitality"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </FadeIn>
            
            {/* Overlay hospitality badge with Official Hotel Seal */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-5 right-2 sm:right-6 bg-white rounded-xl p-3 sm:p-4 shadow-xl border border-[#E6DFD5] max-w-[280px] sm:max-w-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-[#E5B869]/60 shadow-md">
                  <img
                    src="/logo.svg"
                    alt="Hotel Bridge Emblem"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#1E232A] uppercase tracking-wider">Hotel Bridge</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 bg-[#F5EFE6] text-[#916B36] rounded">4.6★</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#6F6B64] leading-tight mt-0.5">Top Rated in Unnao • 140+ Reviews</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Editorial Hospitality Content */}
          <div className="lg:col-span-7 lg:pl-6">
            <FadeIn direction="up" distance={24} duration={0.6}>
              <div className="inline-block mb-2">
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#916B36]">
                  WELCOME TO HOTEL BRIDGE
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1E232A] tracking-tight mb-4 sm:mb-5 leading-tight">
                Comfort Meets Convenience in Unnao
              </h2>

              <p className="text-sm sm:text-base text-[#4F5660] leading-relaxed mb-4 sm:mb-6 font-normal">
                {hotel.aboutIntro}
              </p>

              <p className="text-xs sm:text-sm text-[#5B636E] leading-relaxed mb-6 sm:mb-8">
                Whether you are looking for an air-conditioned room for a comfortable stopover, enjoying delicious pure vegetarian meals at our in-house 
                <strong> Royal Kitchen</strong>, or hosting a family gathering in our celebration venues, our warm and attentive team is always here to make your visit seamless.
              </p>
            </FadeIn>

            {/* Highlights List */}
            <StaggerContainer staggerDelay={0.08} initialDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 mb-6 sm:mb-8">
              {hotel.aboutHighlights.map((highlight, idx) => (
                <StaggerItem key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#916B36] flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-[#2E3640] leading-snug">
                    {highlight}
                  </span>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Direct Contact Actions */}
            <FadeIn delay={0.2} direction="up" distance={16} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => openWhatsApp('general')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#128C7E] hover:bg-[#0c6b60] text-white text-xs font-semibold tracking-wider uppercase transition-colors shadow-sm cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Enquire via WhatsApp</span>
              </button>
              
              <a
                href={getPhoneCallUrl()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border border-[#D5CABE] text-[#1E232A] hover:bg-[#F5EFE6] text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#916B36]" />
                <span>Call +91 63079 51300</span>
              </a>
            </FadeIn>

          </div>

        </div>
      </div>
    </section>
  );
};
