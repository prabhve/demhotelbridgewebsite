import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import {
  Wind,
  Wifi,
  UtensilsCrossed,
  BellRing,
  Zap,
  Sparkles,
  Luggage,
  ShieldCheck,
  Train,
  Plane,
  Tv,
  Coffee,
  MessageSquare
} from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from './MotionContainer';
import { motion, AnimatePresence } from 'motion/react';

export const FacilitiesSection: React.FC = () => {
  const { hotel, openWhatsApp } = useHotel();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Map icon names to Lucide icons dynamically
  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'wind': return Wind;
      case 'wifi': return Wifi;
      case 'utensilscrossed': return UtensilsCrossed;
      case 'bellring': return BellRing;
      case 'zap': return Zap;
      case 'sparkles': return Sparkles;
      case 'luggage': return Luggage;
      case 'shieldcheck': return ShieldCheck;
      case 'train': return Train;
      case 'plane': return Plane;
      case 'tv': return Tv;
      default: return Coffee;
    }
  };

  const categories = [
    { id: 'all', label: 'All Amenities' },
    { id: 'room', label: 'Room Comfort' },
    { id: 'dining', label: 'Dining' },
    { id: 'service', label: 'Guest Services' },
    { id: 'safety', label: 'Safety & Power' },
    { id: 'transit', label: 'Transit & Travel' },
  ];

  const filteredFacilities = selectedCategory === 'all'
    ? hotel.facilities
    : hotel.facilities.filter(f => f.category === selectedCategory);

  return (
    <section id="facilities" className="py-20 bg-[#FAF8F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <FadeIn direction="up" distance={20} className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#916B36] block mb-2">
            HOTEL AMENITIES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E232A] tracking-tight mb-4">
            Facilities for a Relaxed Stay
          </h2>
          <p className="text-base text-[#616874] font-normal leading-relaxed">
            Essential comforts and verified services thoughtfully arranged for a seamless experience at Hotel Bridge.
          </p>
        </FadeIn>

        {/* Category Filter Chips */}
        <FadeIn delay={0.1} direction="up" distance={15} className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 border ${
                selectedCategory === cat.id
                  ? 'bg-[#1E232A] text-white border-[#1E232A] shadow-sm'
                  : 'bg-white text-[#4A5360] border-[#E0D7C9] hover:bg-[#F3ECE0]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </FadeIn>

        {/* Facilities Grid with Staggered Motion */}
        <StaggerContainer
          key={selectedCategory}
          staggerDelay={0.06}
          initialDelay={0.05}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filteredFacilities.map((fac) => {
            const IconComponent = getIcon(fac.iconName);
            return (
              <StaggerItem
                key={fac.id}
                className="bg-white rounded-2xl p-5 border border-[#E6DFD5] shadow-xs hover:shadow-md hover:border-[#D5CABE] transition-all flex items-start gap-4 hover:-translate-y-0.5"
              >
                <div className="p-3 rounded-xl bg-[#F5EFE6] text-[#916B36] flex-shrink-0">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#1E232A]">
                      {fac.name}
                    </h3>
                    {fac.isVerified && (
                      <span className="inline-flex items-center text-[10px] text-[#128C7E] bg-[#E8F6F4] px-1.5 py-0.5 rounded font-medium">
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#5C6470] mt-1 leading-relaxed">
                    {fac.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Bottom CTA for specific requirements */}
        <FadeIn delay={0.2} direction="up" distance={15} className="mt-12 text-center">
          <button
            onClick={() => openWhatsApp('general')}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#916B36] font-bold hover:underline"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Have a special request? Ask our reception on WhatsApp</span>
          </button>
        </FadeIn>

      </div>
    </section>
  );
};
