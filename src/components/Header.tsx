import React, { useState, useEffect } from 'react';
import { useHotel } from '../context/HotelContext';
import { Menu, X, Phone, MessageSquare, ChevronRight, Star, MapPin, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const { hotel, getPhoneCallUrl, openWhatsApp } = useHotel();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section for indicator
      const sections = ['home', 'rooms', 'facilities', 'restaurant', 'events', 'gallery', 'location', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Rooms', href: '#rooms', id: 'rooms' },
    { label: 'Facilities', href: '#facilities', id: 'facilities' },
    { label: 'Royal Kitchen', href: '#restaurant', id: 'restaurant' },
    { label: 'Events & Banquets', href: '#events', id: 'events' },
    { label: 'Gallery', href: '#gallery', id: 'gallery' },
    { label: 'Location', href: '#location', id: 'location' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const topOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      id="header"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      {/* Top Micro-Bar (Shown when not scrolled or on larger screens) */}
      <div
        className={`hidden md:block transition-all duration-300 ${
          isScrolled
            ? 'h-0 opacity-0 overflow-hidden py-0'
            : 'bg-black/60 backdrop-blur-md border-b border-white/10 text-[11px] text-stone-300 py-1.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-[#E5B869] font-medium">
              <Star className="w-3 h-3 fill-[#E5B869]" />
              <span>4.6 / 5.0 Rated on Google (140+ Reviews)</span>
            </div>
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-1.5 text-stone-300">
              <MapPin className="w-3 h-3 text-[#E5B869]" />
              <span>595 Pitamber Nagar-II, Lucknow Bypass, Unnao</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-stone-300 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
              24/7 Front Desk Active
            </span>
            <span className="text-white/20">|</span>
            <a
              href={getPhoneCallUrl()}
              className="text-[#E5B869] hover:text-white transition-colors font-medium flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              <span>+91 63079 51300</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/98 backdrop-blur-md shadow-md border-b border-[#E2D9CC] py-2.5'
            : 'bg-stone-950/75 backdrop-blur-md border-b border-white/15 py-3.5 shadow-lg'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Logo Brand with Official Circular Badge Emblem */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-3 text-left group flex-shrink-0"
              id="brand-logo"
            >
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden shadow-md shrink-0 transition-transform duration-300 group-hover:scale-105 border border-[#E5B869]/50">
                <img
                  src="/logo.svg"
                  alt="Hotel Bridge Unnao Official Logo"
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>

              <div className="flex flex-col">
                <span
                  className={`font-serif text-xl sm:text-2xl font-bold tracking-[0.12em] leading-tight transition-colors duration-200 ${
                    isScrolled ? 'text-[#1E232A]' : 'text-white'
                  }`}
                >
                  HOTEL BRIDGE
                </span>
                <span
                  className={`text-[9px] sm:text-[10px] uppercase tracking-[0.28em] font-semibold transition-colors duration-200 ${
                    isScrolled ? 'text-[#8A7864]' : 'text-[#D4AF37]'
                  }`}
                >
                  UNNAO • LUCKNOW BYPASS
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links (Properly Spaced & Non-Wrapping) */}
            <nav className="hidden xl:flex items-center space-x-1" id="desktop-nav">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-200 ${
                      isActive
                        ? isScrolled
                          ? 'bg-[#ECE4D8] text-[#1E232A] font-bold shadow-xs'
                          : 'bg-white/15 text-white font-bold border border-white/20'
                        : isScrolled
                        ? 'text-[#4A5260] hover:text-[#1E232A] hover:bg-[#F2ECE3]'
                        : 'text-stone-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Compact Desktop Navigation for Standard Laptops (1024px - 1279px) */}
            <nav className="hidden lg:flex xl:hidden items-center space-x-1" id="laptop-nav">
              {navLinks.slice(0, 6).map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-200 ${
                      isActive
                        ? isScrolled
                          ? 'bg-[#ECE4D8] text-[#1E232A] font-bold'
                          : 'bg-white/15 text-white font-bold'
                        : isScrolled
                        ? 'text-[#4A5260] hover:text-[#1E232A] hover:bg-[#F2ECE3]'
                        : 'text-stone-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Header Action Buttons (Well-Proportioned) */}
            <div className="hidden sm:flex items-center space-x-2.5 flex-shrink-0" id="header-cta-group">
              {/* Call Button */}
              <a
                href={getPhoneCallUrl()}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold tracking-wider transition-all duration-200 border ${
                  isScrolled
                    ? 'border-[#D9CFBE] bg-white text-[#1E232A] hover:bg-[#FAF8F5] hover:border-[#916B36] shadow-2xs'
                    : 'border-white/25 bg-white/10 text-white hover:bg-white/20 hover:border-white/50 backdrop-blur-sm'
                }`}
                title="Call Hotel Bridge Front Desk"
                id="header-call-btn"
              >
                <Phone className="w-3.5 h-3.5 text-[#E5B869]" />
                <span className="whitespace-nowrap">+91 63079 51300</span>
              </a>

              {/* Direct Booking WhatsApp Button */}
              <button
                onClick={() => openWhatsApp('general')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase bg-[#128C7E] hover:bg-[#0d6e63] active:scale-95 text-white shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap"
                id="header-book-btn"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-white" />
                <span>Book / Enquire</span>
              </button>
            </div>

            {/* Mobile Actions & Hamburger Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => openWhatsApp('general')}
                className="p-2 rounded-xl bg-[#128C7E] text-white shadow-sm flex items-center justify-center"
                aria-label="WhatsApp Hotel"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
              </button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-xl transition-colors border ${
                  isScrolled
                    ? 'text-[#1E232A] bg-white border-[#E6DFD5] hover:bg-stone-100'
                    : 'text-white bg-white/10 border-white/20 hover:bg-white/20'
                }`}
                aria-label="Toggle Navigation Menu"
                id="mobile-menu-toggle"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <div
            className="lg:hidden fixed inset-0 top-16 bg-black/75 backdrop-blur-xs z-40 transition-opacity duration-200"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Actual Dropdown / Slide Menu */}
          <div
            className="lg:hidden absolute top-full left-0 right-0 w-full bg-[#161B22] border-b border-stone-800 shadow-2xl px-5 py-6 z-50 max-h-[calc(100vh-80px)] overflow-y-auto animate-fadeIn"
            id="mobile-menu-drawer"
          >
            {/* Quick info badge */}
            <div className="p-3 bg-stone-900/90 rounded-xl border border-stone-800 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-stone-200">
                <Star className="w-3.5 h-3.5 fill-[#E5B869] text-[#E5B869]" />
                <span className="font-bold text-white">4.6/5.0 on Google</span>
                <span className="text-stone-600">•</span>
                <span className="text-[#E5B869]">Pure Veg & AC Rooms</span>
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`flex items-center justify-between text-sm font-semibold py-3 px-3.5 rounded-xl transition-all ${
                      isActive
                        ? 'bg-[#E5B869] text-stone-950 font-bold shadow-md'
                        : 'text-stone-300 hover:bg-stone-800/80 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-stone-950' : 'text-stone-500'}`} />
                  </a>
                );
              })}

              {/* Direct Mobile Quick Actions */}
              <div className="pt-4 mt-2 border-t border-stone-800 grid grid-cols-2 gap-3">
                <a
                  href={getPhoneCallUrl()}
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-stone-800/90 border border-stone-700 text-white text-xs font-bold tracking-wider uppercase active:bg-stone-700 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E5B869]" />
                  <span>Call Front Desk</span>
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openWhatsApp('general');
                  }}
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#128C7E] active:bg-[#0c6b60] text-white text-xs font-bold tracking-wider uppercase shadow-md transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

