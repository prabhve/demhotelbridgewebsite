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

        {/* Dedicated Signature Row: Designed With love By VYUVIK LABS */}
        <div className="py-6 border-b border-stone-800/70 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <span>© {new Date().getFullYear()} Hotel Bridge, Unnao. All rights reserved.</span>
          </div>

          {/* Unique, Luxury Styled Designer Signature */}
          <div className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-stone-900/90 via-stone-800/80 to-stone-900/90 border border-[#E5B869]/25 hover:border-[#E5B869]/60 transition-all duration-300 shadow-md">
            <span className="text-[11px] font-medium text-stone-300 tracking-wide flex items-center gap-1.5">
              Designed With <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" /> By
            </span>
            <span className="font-mono text-xs font-extrabold tracking-[0.2em] uppercase bg-gradient-to-r from-[#E5B869] via-[#F8E3B6] to-[#E5B869] bg-clip-text text-transparent group-hover:brightness-110 transition-all">
              VYUVIK LABS
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5B869] animate-ping" />
          </div>
        </div>

        {/* Secondary Policy & Staff Access Bar (Positioned with right-margin on desktop to never collide with floating WhatsApp) */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500 sm:pr-44">
          {/* Legal / Policy Links */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center sm:justify-start">
            <button
              onClick={() => setActivePolicyModal('privacy')}
              className="hover:text-stone-300 transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-stone-700">•</span>
            <button
              onClick={() => setActivePolicyModal('terms')}
              className="hover:text-stone-300 transition-colors"
            >
              Terms of Stay
            </button>
            <span className="text-stone-700">•</span>
            <button
              onClick={() => setActivePolicyModal('cancellation')}
              className="hover:text-stone-300 transition-colors"
            >
              Cancellation Policy
            </button>
          </div>

          <div>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-1 text-stone-500 hover:text-stone-300 transition-colors text-[11px]"
              title="Hotel Staff Content & Media Manager"
            >
              <Settings className="w-3 h-3" />
              <span>Hotel Admin</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

