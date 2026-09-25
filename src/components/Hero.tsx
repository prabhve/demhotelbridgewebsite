import React from 'react';
import { useHotel } from '../context/HotelContext';
import { Phone, MessageSquare, ArrowDown, MapPin, Star, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  const { hotel, openWhatsApp, getPhoneCallUrl } = useHotel();

  const handleExploreRooms = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const roomsElem = document.querySelector('#rooms');
    if (roomsElem) {
      const topOffset = 80;
      const elementPosition = roomsElem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section id="home" className="relative min-h-[94vh] flex items-center justify-center pt-28 pb-20 overflow-hidden">
      {/* Background Image with subtle atmospheric gradient */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0"
      >
        <img
          src={hotel.heroImage}
          alt="Hotel Bridge Unnao"
          className="w-full h-full object-cover object-center"
        />
        {/* Balanced multi-stop contrast overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/50" />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white my-auto"
      >
        {/* Trust Badges Bar */}
        <motion.div variants={itemVariants} className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3.5 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-xs font-medium tracking-wide mb-6 shadow-lg">
          <div className="flex items-center gap-1.5 text-[#E5B869] font-semibold">
            <Star className="w-3.5 h-3.5 fill-[#E5B869]" />
            <span>4.6 / 5.0 Google Rating</span>
          </div>
          <span className="text-white/30">•</span>
          <div className="flex items-center gap-1.5 text-stone-200">
            <MapPin className="w-3.5 h-3.5 text-[#E5B869]" />
            <span>Lucknow Bypass, Unnao</span>
          </div>
          <span className="hidden sm:inline text-white/30">•</span>
          <span className="hidden sm:inline-flex items-center gap-1 text-emerald-300 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            100% Pure Veg Dining
          </span>
        </motion.div>

        {/* Official Brand Crest Emblem */}
        <motion.div variants={itemVariants} className="flex justify-center mb-4">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-b from-[#E5B869]/40 to-transparent border border-[#E5B869]/60 shadow-[0_0_25px_rgba(229,184,105,0.25)] backdrop-blur-xs">
            <img
              src="/logo.svg"
              alt="Hotel Bridge Official Crest"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>
        </motion.div>

        {/* Eyebrow / Hotel Location Moniker */}
        <motion.div variants={itemVariants} className="mb-3">
          <span className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#E5B869] font-bold block">
            HOTEL BRIDGE • UNNAO
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          variants={itemVariants}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-5 max-w-4xl mx-auto leading-[1.12]"
        >
          {hotel.heroHeadline}
        </motion.h1>

        {/* Supporting Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-stone-200 max-w-2xl mx-auto font-light mb-9 leading-relaxed"
        >
          {hotel.heroSubtitle}
        </motion.p>

        {/* Dual Primary Contact & Action Buttons - Clean, Balanced & Non-Wrapping */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-xl mx-auto mb-8"
        >
          {/* Primary WhatsApp Booking Button */}
          <button
            onClick={() => openWhatsApp('general')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-[#128C7E] hover:bg-[#0e7468] active:scale-98 text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 whitespace-nowrap"
            id="hero-whatsapp-btn"
          >
            <MessageSquare className="w-4 h-4 fill-white flex-shrink-0" />
            <span>Book / Enquire on WhatsApp</span>
          </button>

          {/* Secondary Phone Call Button */}
          <a
            href={getPhoneCallUrl()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/25 hover:border-white/50 font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 hover:-translate-y-0.5 shadow-lg whitespace-nowrap"
            id="hero-call-btn"
          >
            <Phone className="w-4 h-4 text-[#E5B869] flex-shrink-0" />
            <span>Call +91 63079 51300</span>
          </a>
        </motion.div>

        {/* Value Highlights Under CTA */}
        <motion.div
          variants={itemVariants}
          className="hidden sm:flex items-center justify-center gap-6 text-xs text-stone-300 font-medium mb-8"
        >
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Instant Confirmation
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Best Direct Rates
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            24/7 Front Desk Service
          </span>
        </motion.div>

        {/* Secondary Navigation Link */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <a
            href="#rooms"
            onClick={handleExploreRooms}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/15 text-xs uppercase tracking-[0.2em] text-stone-200 hover:text-white transition-all duration-200"
          >
            <span>Explore Rooms & Stays</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#E5B869] group-hover:translate-y-0.5 transition-transform duration-200" />
          </a>
        </motion.div>

      </motion.div>
    </section>
  );
};
