import React from 'react';
import { useHotel } from '../context/HotelContext';
import { EventOccasion } from '../types/hotel';
import { PartyPopper, Check, Calendar, ArrowRight, MessageSquare, Phone } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from './MotionContainer';
import { motion } from 'motion/react';

export const EventsSection: React.FC = () => {
  const { hotel, setIsEventModalOpen, setSelectedEventOccasion, openWhatsApp, getPhoneCallUrl } = useHotel();

  const handlePlanEvent = (occasionName?: string) => {
    if (occasionName) {
      setSelectedEventOccasion(occasionName);
    }
    setIsEventModalOpen(true);
  };

  return (
    <section id="events" className="py-20 bg-[#FAF8F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <FadeIn direction="up" distance={20} className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#916B36] block mb-2">
            BANQUETS & CELEBRATIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E232A] tracking-tight mb-4">
            Moments Worth Celebrating
          </h2>
          <p className="text-base text-[#616874] font-normal leading-relaxed">
            From intimate birthday gatherings and engagement ceremonies to corporate seminars, Hotel Bridge offers versatile venues paired with fine hospitality and pure vegetarian catering.
          </p>
        </FadeIn>

        {/* Event Cards Grid with Stagger */}
        <StaggerContainer staggerDelay={0.14} initialDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {hotel.events.map((evt) => (
            <StaggerItem
              key={evt.id}
              className="group bg-white rounded-2xl overflow-hidden border border-[#E6DFD5] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1"
            >
              {/* Event Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-200">
                <img
                  src={evt.image}
                  alt={`${evt.name} banquet celebration at Hotel Bridge Unnao`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-3.5 left-4 right-4 text-white">
                  <span className="text-[11px] uppercase tracking-wider text-[#E5B869] font-semibold block">
                    {evt.suitableCapacity}
                  </span>
                  <h3 className="font-serif text-lg font-bold leading-snug">
                    {evt.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-[#5C6470] leading-relaxed mb-5">
                    {evt.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {evt.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#3E4550]">
                        <Check className="w-3.5 h-3.5 text-[#128C7E] flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#EAE2D5] flex items-center gap-2">
                  <button
                    onClick={() => handlePlanEvent(evt.name)}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#FAF8F5] border border-[#D5CABE] hover:bg-[#F3ECE0] text-[#1E232A] text-xs font-semibold tracking-wider uppercase transition-colors"
                  >
                    <span>Plan This Event</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#916B36]" />
                  </button>
                </div>

              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom Banner with Dual Call to Action */}
        <FadeIn delay={0.2} direction="up" distance={20}>
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E6DFD5] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1E232A] mb-1">
                Ready to organize your upcoming function?
              </h3>
              <p className="text-xs sm:text-sm text-[#5C6470]">
                Share your estimated guest count and preferred dates to receive venue recommendations and catering package options.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto justify-center">
              <a
                href={getPhoneCallUrl()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#D5CABE] bg-[#FAF8F5] hover:bg-[#F3ECE0] text-[#1E232A] text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#916B36]" />
                <span>Call Event Team</span>
              </a>

              <button
                onClick={() => handlePlanEvent()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#128C7E] hover:bg-[#0c6b60] text-white text-xs font-semibold tracking-wider uppercase transition-colors shadow-sm cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Plan Your Event on WhatsApp</span>
              </button>
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  );
};
