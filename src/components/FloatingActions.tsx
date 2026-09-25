import React, { useState, useEffect } from 'react';
import { useHotel } from '../context/HotelContext';
import { Phone, MessageSquare, Calendar, ChevronUp } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const { hotel, openWhatsApp, getPhoneCallUrl } = useHotel();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop Floating WhatsApp Button & Back-To-Top (Positioned cleanly without overlapping content) */}
      <div className="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-2.5 pointer-events-auto">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-[#1E232A]/90 hover:bg-[#1E232A] text-[#E5B869] shadow-lg backdrop-blur-md transition-all duration-200 border border-white/15 flex items-center justify-center hover:-translate-y-0.5 cursor-pointer"
            aria-label="Scroll back to top"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        )}

        {/* WhatsApp Floating Pill Button */}
        <button
          onClick={() => openWhatsApp('general')}
          className="group flex items-center gap-3 pl-3.5 pr-4 py-2.5 rounded-full bg-[#128C7E] hover:bg-[#0e7468] text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] border border-emerald-400/30 cursor-pointer"
          id="floating-desktop-whatsapp"
        >
          <div className="relative flex items-center justify-center">
            <MessageSquare className="w-5 h-5 fill-white" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-300 rounded-full animate-ping" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-300 rounded-full" />
          </div>
          <div className="text-left">
            <span className="block text-xs font-bold leading-none tracking-wide">
              Chat on WhatsApp
            </span>
            <span className="block text-[10px] text-emerald-100 font-medium mt-0.5">
              +91 63079 51300
            </span>
          </div>
        </button>
      </div>

      {/* Sleek Mobile Sticky Bottom Bar (Dark luxury glass design that blends seamlessly) */}
      <div
        className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#14171C]/95 backdrop-blur-xl border-t border-stone-800 shadow-[0_-8px_30px_rgba(0,0,0,0.5)] px-3 py-2.5 flex items-center gap-2"
        id="mobile-sticky-bottom-bar"
      >
        {/* Call Button */}
        <a
          href={getPhoneCallUrl()}
          className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-stone-900/90 border border-stone-700/80 text-white text-xs font-bold uppercase tracking-wider active:bg-stone-800 transition-colors shadow-sm"
          id="mobile-sticky-call"
        >
          <Phone className="w-4 h-4 text-[#E5B869]" />
          <span>Call</span>
        </a>

        {/* Primary WhatsApp Action */}
        <button
          onClick={() => openWhatsApp('general')}
          className="flex-[1.4] min-h-[44px] inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#128C7E] active:bg-[#0c6b60] text-white text-xs font-bold uppercase tracking-wider shadow-lg border border-emerald-400/30 transition-all cursor-pointer"
          id="mobile-sticky-whatsapp"
        >
          <MessageSquare className="w-4 h-4 fill-white" />
          <span>WhatsApp</span>
        </button>

        {/* View Rooms Shortcut */}
        <button
          onClick={() => {
            const rooms = document.querySelector('#rooms');
            if (rooms) {
              const topOffset = 80;
              const elementPosition = rooms.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - topOffset;
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            }
          }}
          className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-gradient-to-r from-stone-900 to-stone-800 border border-[#E5B869]/30 text-[#E5B869] text-xs font-bold uppercase tracking-wider active:brightness-110 transition-all cursor-pointer"
          id="mobile-sticky-rooms"
        >
          <Calendar className="w-4 h-4 text-[#E5B869]" />
          <span>Rooms</span>
        </button>
      </div>
    </>
  );
};

