import React from 'react';
import { useHotel } from '../context/HotelContext';
import { Phone, MessageSquare, MapPin, ExternalLink, Settings, Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { hotel, openWhatsApp, getPhoneCallUrl, setActivePolicyModal, setIsAdminOpen } = useHotel();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Rooms & Stays', href: '#rooms' },
    { label: 'Hotel Facilities', href: '#facilities' },
    { label: 'Royal Kitchen (Pure Veg)', href: '#restaurant' },
    { label: 'Events & Banquets', href: '#events' },
    { label: 'Photo Gallery', href: '#gallery' },
    { label: 'Local Attractions', href: '#attractions' },
    { label: 'Location & Map', href: '#location' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-[#14171C] text-stone-300 pt-16 pb-20 sm:pb-24 border-t border-stone-800/80 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Col 1: Hotel Brand & Summary */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border border-[#E5B869]/50 shadow-lg bg-black/40">
                <img
                  src="/logo.svg"
                  alt="Hotel Bridge Official Emblem"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-wider text-white block">
                  HOTEL BRIDGE
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#E5B869] font-semibold block mt-0.5">
                  UNNAO • LUCKNOW BYPASS
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm font-normal">
              Contemporary hospitality property offering comfortable air-conditioned rooms, Royal Kitchen pure vegetarian dining, and tailored celebration venues in Unnao, Uttar Pradesh.
            </p>

            <div className="pt-2">
              <button
                onClick={() => openWhatsApp('general')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#128C7E] hover:bg-[#0c6b60] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-sm cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Hotel</span>
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E5B869] mb-4">
              Quick Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-y-2.5 gap-x-2 text-xs">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-stone-300 hover:text-[#E5B869] transition-colors inline-block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Hotel Contact & Location */}
          <div className="lg:col-span-5 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E5B869] mb-4">
              Official Contact
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E5B869] flex-shrink-0 mt-0.5" />
                <p className="text-stone-300 leading-relaxed">
                  595, Pitamber Nagar-II, Lucknow Bypass, Near Koyla Gali, Shiv Nagar, Unnao, Uttar Pradesh 209801
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E5B869] flex-shrink-0" />
                <a href={getPhoneCallUrl()} className="text-stone-200 hover:text-[#E5B869] font-medium transition-colors">
                  +91 63079 51300
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-[#128C7E] flex-shrink-0" />
                <button onClick={() => openWhatsApp('contact')} className="text-stone-200 hover:text-[#128C7E] font-medium transition-colors">
                  +91 63079 51300 (WhatsApp)
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-800/80">
              <span className="text-[11px] text-stone-400 block mb-0.5 font-medium">Transit & Landmarks Proximity:</span>
              <p className="text-xs text-stone-400">
                Stadium (600m) • Hospital (800m) • Railway Station (1.5 km) • Kanpur Airport (21.5 km) • Lucknow Airport (50 km)
              </p>
            </div>
          </div>

        </div>

        {/* Legal, Copyright & Staff Access Bar */}
        <div className="py-6 border-t border-stone-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-2 text-center md:text-left">
            <span>© {new Date().getFullYear()} Hotel Bridge, Unnao. All rights reserved.</span>
          </div>

          {/* Legal / Policy Links & Admin */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center md:justify-end text-stone-400 text-xs">
            <button
              onClick={() => setActivePolicyModal('privacy')}
              className="hover:text-[#E5B869] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-stone-700">•</span>
            <button
              onClick={() => setActivePolicyModal('terms')}
              className="hover:text-[#E5B869] transition-colors cursor-pointer"
            >
              Terms of Stay
            </button>
            <span className="text-stone-700">•</span>
            <button
              onClick={() => setActivePolicyModal('cancellation')}
              className="hover:text-[#E5B869] transition-colors cursor-pointer"
            >
              Cancellation Policy
            </button>
            <span className="text-stone-700">•</span>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-1 text-stone-500 hover:text-stone-300 transition-colors text-[11px] cursor-pointer"
              title="Hotel Staff Content & Media Manager"
            >
              <Settings className="w-3 h-3" />
              <span>Hotel Admin</span>
            </button>
          </div>
        </div>

        {/* Ornate Divider leading to bottom center brand signature */}
        <div className="w-full flex items-center justify-center gap-3 my-2">
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent via-stone-800 to-[#E5B869]/20" />
          <div className="w-1.5 h-1.5 rotate-45 border border-[#E5B869]/60 bg-[#E5B869]/30" />
          <div className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent via-stone-800 to-[#E5B869]/20" />
        </div>

        {/* ===================================================================
            EXCLUSIVE BOTTOM-CENTER BRAND SIGNATURE: VYUVIK LABS
            Bespoke Luxury Glassmorphic Emblem with Ambient Gold Glow & Shimmer
           =================================================================== */}
        <div className="pt-2 pb-8 flex flex-col items-center justify-center text-center">
          <div className="group relative inline-flex items-center gap-2.5 sm:gap-3 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-b from-[#1C2026] via-[#14171C] to-[#0D0F13] border border-[#E5B869]/35 hover:border-[#E5B869]/80 shadow-[0_4px_24px_rgba(0,0,0,0.6),0_0_15px_rgba(229,184,105,0.08)] hover:shadow-[0_8px_32px_rgba(229,184,105,0.22)] transition-all duration-500 overflow-hidden cursor-default select-none">
            
            {/* Ambient gold glow on hover */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#E5B869]/0 via-[#E5B869]/15 to-[#E5B869]/0 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 pointer-events-none" />

            {/* Shimmer light sweep on hover */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out pointer-events-none" />

            {/* Monogram Crest for VYUVIK */}
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-tr from-[#916B36] via-[#E5B869] to-[#FCEAB3] p-px flex items-center justify-center shadow-xs shrink-0">
              <div className="w-full h-full rounded-full bg-[#14171C] flex items-center justify-center text-[10px] sm:text-[11px] font-black text-[#E5B869] group-hover:scale-110 transition-transform duration-300">
                V
              </div>
            </div>

            {/* "Designed With Heart By" phrase */}
            <span className="text-[11px] sm:text-xs font-medium text-stone-300 tracking-wide flex items-center gap-1.5 whitespace-nowrap">
              <span>Designed With</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse shrink-0 inline-block drop-shadow-[0_0_6px_rgba(244,63,94,0.6)]" />
              <span>By</span>
            </span>

            {/* Brand Title: VYUVIK LABS */}
            <span className="font-mono text-xs sm:text-sm font-black tracking-[0.24em] sm:tracking-[0.28em] uppercase bg-gradient-to-r from-[#F6D285] via-[#FFF5DE] to-[#D19B44] bg-clip-text text-transparent group-hover:brightness-110 group-hover:tracking-[0.3em] transition-all duration-300 drop-shadow-sm whitespace-nowrap">
              VYUVIK LABS
            </span>

            {/* Pulsing Active Beacon */}
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5B869] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E5B869]" />
            </span>
          </div>

          {/* Unique Prestige Studio Tagline */}
          <div className="mt-2.5 flex items-center justify-center gap-2 text-[10px] tracking-[0.28em] uppercase text-stone-500 font-medium">
            <Sparkles className="w-2.5 h-2.5 text-[#E5B869]/70" />
            <span>Digital Architecture & Creative Design</span>
            <Sparkles className="w-2.5 h-2.5 text-[#E5B869]/70" />
          </div>
        </div>

      </div>
    </footer>
  );
};

