import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { MapPin, Navigation, Phone, MessageSquare, Train, Plane, Building2, HeartPulse, Trophy, TreePine, ExternalLink, ChevronRight, Compass } from 'lucide-react';
import { FadeIn } from './MotionContainer';

export const LocationSection: React.FC = () => {
  const { hotel, openWhatsApp, getPhoneCallUrl } = useHotel();
  const [selectedTransitIndex, setSelectedTransitIndex] = useState<number>(0);

  const keyTransitItems = hotel.transit || [];

  const getTransitIcon = (type: string) => {
    switch (type) {
      case 'sports':
        return <Trophy className="w-4 h-4 text-[#916B36]" />;
      case 'health':
        return <HeartPulse className="w-4 h-4 text-rose-500" />;
      case 'railway':
        return <Train className="w-4 h-4 text-blue-600" />;
      case 'airport':
        return <Plane className="w-4 h-4 text-indigo-600" />;
      case 'industrial':
        return <Building2 className="w-4 h-4 text-amber-600" />;
      default:
        return <MapPin className="w-4 h-4 text-[#916B36]" />;
    }
  };

  return (
    <section id="location" className="py-20 bg-white border-y border-[#E6DFD5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <FadeIn direction="up" distance={20} className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3ECE0] border border-[#E0D7C9] text-xs uppercase tracking-[0.25em] font-bold text-[#916B36] mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>PRIME CORRIDOR LOCATION</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E232A] tracking-tight mb-4">
            Prime Connectivity in Unnao
          </h2>
          <p className="text-sm sm:text-base text-[#616874] font-normal leading-relaxed">
            Situated directly along the Lucknow Bypass corridor in Shiv Nagar, Hotel Bridge offers lightning-fast connectivity to the railway station, industrial estates, sports stadiums, and nearby airports.
          </p>
        </FadeIn>

        {/* Location Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Left Column: Address Card & Interactive Proximity Hubs */}
          <FadeIn direction="right" distance={24} duration={0.65} className="lg:col-span-5 bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl border border-[#E6DFD5] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2 text-[#916B36]">
                <MapPin className="w-4 h-4" />
                <span className="text-xs uppercase font-bold tracking-widest">
                  HOTEL ADDRESS & GPS LOCATION
                </span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#1E232A] mb-2">
                Hotel Bridge, Unnao
              </h3>

              <div className="space-y-1 text-xs sm:text-sm text-[#4E5662] mb-5 leading-relaxed">
                <p className="font-semibold text-[#1E232A]">595, Pitamber Nagar-II, Lucknow Bypass</p>
                <p>Near Koyla Gali, Shiv Nagar, Unnao, UP 209801</p>
              </div>

              {/* Transit & Landmark Distances Quick List */}
              <div className="pt-4 border-t border-[#E8DFD3] space-y-2 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#1E232A] uppercase tracking-wider">
                    Nearby Distances & Driving Times
                  </span>
                  <span className="text-[11px] text-stone-500 font-medium">Real-time GPS</span>
                </div>

                <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1 custom-scrollbar">
                  {keyTransitItems.map((item, idx) => {
                    const isSelected = selectedTransitIndex === idx;
                    const routeUrl = `https://www.google.com/maps/dir/?api=1&origin=Hotel+Bridge+595+Pitamber+Nagar-II+Lucknow+Bypass+Unnao&destination=${encodeURIComponent(item.mapQuery || item.title + ' Unnao')}`;

                    return (
                      <a
                        key={item.id}
                        href={routeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setSelectedTransitIndex(idx)}
                        className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all duration-200 group ${
                          isSelected
                            ? 'bg-white border-[#916B36] shadow-xs'
                            : 'bg-white/60 border-stone-200/80 hover:bg-white hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <div className="p-1.5 rounded-lg bg-[#FAF8F5] shrink-0">
                            {getTransitIcon(item.type)}
                          </div>
                          <div className="truncate">
                            <span className="font-semibold text-[#1E232A] block truncate group-hover:text-[#916B36] transition-colors">
                              {item.title}
                            </span>
                            <span className="text-[10px] text-stone-500">
                              {item.duration || 'Fast transit'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="font-bold text-[#916B36] bg-[#F5EFE6] px-2 py-0.5 rounded-md text-[11px]">
                            {item.distance}
                          </span>
                          <ExternalLink className="w-3 h-3 text-stone-400 group-hover:text-stone-700" />
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Direct Buttons */}
            <div className="space-y-2.5 pt-4 border-t border-[#E8DFD3]">
              <a
                href={hotel.googleMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1E232A] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
              >
                <Navigation className="w-4 h-4 text-[#E5B869]" />
                <span>Navigate to Hotel Bridge on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={getPhoneCallUrl()}
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-[#D5CABE] hover:bg-[#F0E8DC] text-[#1E232A] text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#916B36]" />
                  <span>Call Front Desk</span>
                </a>

                <button
                  onClick={() => openWhatsApp('contact')}
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#128C7E] hover:bg-[#0c6b60] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Location</span>
                </button>
              </div>
            </div>

          </FadeIn>

          {/* Right Column: Embedded Interactive Map */}
          <FadeIn direction="left" distance={24} duration={0.65} delay={0.1} className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#E6DFD5] shadow-sm min-h-[420px] bg-stone-100 relative flex flex-col">
            <iframe
              title="Hotel Bridge Unnao Location Map"
              src="https://maps.google.com/maps?q=Hotel+Bridge+595+Pitamber+Nagar-II+Lucknow+Bypass+Unnao+Uttar+Pradesh+209801&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            
            {/* Overlay quick address card */}
            <div className="absolute top-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-stone-200/80 shadow-lg pointer-events-auto">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#1E232A] flex items-center justify-center text-[#E5B869] font-serif font-bold text-xs">
                  HB
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1E232A]">Hotel Bridge Unnao</h4>
                  <p className="text-[10px] text-stone-500">Lucknow Bypass Corridor</p>
                </div>
              </div>
            </div>
          </FadeIn>

        </div>

      </div>
    </section>
  );
};
