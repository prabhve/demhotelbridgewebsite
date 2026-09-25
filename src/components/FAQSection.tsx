import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { ChevronDown, MessageSquare } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from './MotionContainer';
import { motion, AnimatePresence } from 'motion/react';

export const FAQSection: React.FC = () => {
  const { hotel, openWhatsApp } = useHotel();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-white border-y border-[#E6DFD5] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <FadeIn direction="up" distance={20} className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#916B36] block mb-2">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E232A] tracking-tight mb-4">
            Guest Information & Help
          </h2>
          <p className="text-base text-[#616874] font-normal leading-relaxed">
            Quick answers regarding our hotel location, room bookings, Royal Kitchen pure veg dining, and event venues.
          </p>
        </FadeIn>

        {/* Accordion List with Stagger */}
        <StaggerContainer staggerDelay={0.08} initialDelay={0.1} className="space-y-3">
          {hotel.faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <StaggerItem
                key={faq.id}
                className="rounded-2xl border border-[#E6DFD5] bg-[#FAF8F5] overflow-hidden transition-colors duration-200 shadow-xs"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-[#1E232A]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#916B36] flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-[#4E5662] leading-relaxed border-t border-[#EAE2D5]">
                        <div className="pt-3">
                          {faq.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Ask on WhatsApp footer */}
        <FadeIn delay={0.2} direction="up" distance={15} className="mt-10 text-center">
          <p className="text-xs text-[#5C6470]">
            Have any other question?{' '}
            <button
              onClick={() => openWhatsApp('general')}
              className="text-[#916B36] font-semibold hover:underline inline-flex items-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ask our manager on WhatsApp</span>
            </button>
          </p>
        </FadeIn>

      </div>
    </section>
  );
};
