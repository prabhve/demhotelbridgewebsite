import React from 'react';
import { useHotel } from '../context/HotelContext';
import { UtensilsCrossed, Leaf, Clock, Sparkles, MessageSquare, BookOpen, Check } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from './MotionContainer';
import { motion } from 'motion/react';

export const RoyalKitchenSection: React.FC = () => {
  const { hotel, setIsMenuModalOpen, openWhatsApp } = useHotel();
  const rest = hotel.restaurant;

  const handleReserveDining = () => {
    openWhatsApp('restaurant', { guests: '4', date: 'Upcoming Date' });
  };

  return (
    <section id="restaurant" className="py-20 bg-white border-y border-[#E6DFD5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hospitality Content */}
          <div className="lg:col-span-6">
            <FadeIn direction="up" distance={24}>
              {/* Badges Bar */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                  <Leaf className="w-3.5 h-3.5" />
                  100% PURE VEGETARIAN
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Jain Food Options Available
                </span>
              </div>

              {/* Heading & Subtitle */}
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E232A] tracking-tight mb-3">
                {rest.heading}
              </h2>
              <p className="text-sm sm:text-base font-semibold text-[#916B36] uppercase tracking-wider mb-6">
                {rest.subheading}
              </p>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#4F5660] leading-relaxed mb-6">
                {rest.description}
              </p>

              {/* Timings Strip */}
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E6DFD5] mb-6">
                <Clock className="w-5 h-5 text-[#916B36] flex-shrink-0" />
                <div className="text-xs text-[#4F5660]">
                  <span className="font-bold text-[#1E232A] block mb-0.5">Dining Hours</span>
                  <span>{rest.timing}</span>
                </div>
              </div>
            </FadeIn>

            {/* Highlights bullet points with Stagger */}
            <StaggerContainer staggerDelay={0.08} initialDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
              {rest.highlights.map((item, idx) => (
                <StaggerItem key={idx} className="flex items-center gap-2 text-xs font-medium text-[#2E3640]">
                  <Check className="w-3.5 h-3.5 text-[#128C7E] flex-shrink-0" />
                  <span>{item}</span>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Action Buttons */}
            <FadeIn delay={0.2} direction="up" distance={15} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => setIsMenuModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1E232A] hover:bg-black text-white text-xs font-semibold tracking-wider uppercase transition-colors shadow-sm cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#E5B869]" />
                <span>Explore Full Menu</span>
              </button>

              <button
                onClick={handleReserveDining}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#128C7E] hover:bg-[#0c6b60] text-white text-xs font-semibold tracking-wider uppercase transition-colors shadow-sm cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Reserve on WhatsApp</span>
              </button>
            </FadeIn>

          </div>

          {/* Right Column: High-Res Dining Visuals Grid with Staggered Entrance */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <FadeIn direction="right" distance={25} duration={0.7} className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-sm aspect-[4/5] bg-stone-200">
                <img
                  src={rest.images[0] || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"}
                  alt="Royal Kitchen dining room at Hotel Bridge"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E6DFD5] text-center">
                <span className="text-[11px] font-bold text-[#916B36] uppercase tracking-wider block">Cuisines Served</span>
                <p className="text-xs text-[#4F5660] mt-1 font-medium">North Indian • South Indian • Tandoor • Chinese</p>
              </div>
            </FadeIn>

            <FadeIn direction="left" distance={25} duration={0.7} delay={0.15} className="space-y-4 pt-6">
              <div className="rounded-2xl overflow-hidden shadow-sm aspect-[4/5] bg-stone-200">
                <img
                  src={rest.images[1] || "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80"}
                  alt="Pure vegetarian dishes at Royal Kitchen"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-sm aspect-[4/3] bg-stone-200">
                <img
                  src={rest.images[2] || "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"}
                  alt="Tandoori snacks at Royal Kitchen"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </FadeIn>
          </div>

        </div>

      </div>
    </section>
  );
};
