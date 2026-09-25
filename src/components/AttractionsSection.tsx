import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { MapPin, Navigation, ExternalLink, Compass, Clock, Search, Filter, Sparkles, Building2, Train, HeartPulse, TreePine } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from './MotionContainer';

export const AttractionsSection: React.FC = () => {
  const { hotel } = useHotel();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = [
    { id: 'all', label: 'All Destinations', count: hotel.attractions.length, icon: Compass },
    { id: 'industrial', label: 'Industrial Hubs', count: hotel.attractions.filter(a => a.category === 'industrial').length, icon: Building2 },
    { id: 'transit', label: 'Transit & Airports', count: hotel.attractions.filter(a => a.category === 'transit').length, icon: Train },
    { id: 'health', label: 'Healthcare & Sports', count: hotel.attractions.filter(a => a.category === 'health' || a.category === 'sports').length, icon: HeartPulse },
    { id: 'nature', label: 'Parks & Sanctuary', count: hotel.attractions.filter(a => a.category === 'nature').length, icon: TreePine },
  ];

  const filteredPlaces = hotel.attractions.filter(place => {
    const matchesCategory = 
      activeCategory === 'all' || 
      place.category === activeCategory ||
      (activeCategory === 'health' && (place.category === 'health' || place.category === 'sports'));
    
    const matchesSearch = 
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.distance.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="attractions" className="py-20 bg-[#FAF8F5] overflow-hidden border-t border-[#E6DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <FadeIn direction="up" distance={20} className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3ECE0] border border-[#E0D7C9] text-xs uppercase tracking-[0.25em] font-bold text-[#916B36] mb-3">
            <Compass className="w-3.5 h-3.5 text-[#916B36]" />
            <span>REAL-TIME LOCATION & CONNECTIVITY GUIDE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E232A] tracking-tight mb-4">
            Key Landmarks & Nearby Hubs
          </h2>
          <p className="text-sm sm:text-base text-[#616874] font-normal leading-relaxed">
            Real distances and live navigation from <strong>Hotel Bridge, Lucknow Bypass Unnao</strong> to major industrial zones, transit junctions, healthcare centers, and regional attractions.
          </p>
        </FadeIn>

        {/* Filter Controls & Search Bar */}
        <FadeIn direction="up" distance={16} delay={0.1} className="mb-10 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar">
              {filterTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCategory(tab.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-[#1E232A] text-[#E5B869] shadow-md'
                        : 'bg-white text-stone-700 hover:bg-[#F3ECE0] border border-[#E6DFD5]'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#E5B869]' : 'text-stone-500'}`} />
                    <span>{tab.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-black text-[#E5B869]' : 'bg-stone-100 text-stone-600'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Search Box */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search nearby places..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-[#E6DFD5] text-xs text-[#1E232A] focus:outline-none focus:border-[#916B36] focus:ring-1 focus:ring-[#916B36] shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

          </div>
        </FadeIn>

        {/* Attractions & Hubs Grid */}
        {filteredPlaces.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E6DFD5] p-8">
            <Compass className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <p className="text-stone-600 font-medium text-sm">No landmarks found matching "{searchQuery}".</p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="mt-3 px-4 py-2 rounded-xl bg-[#1E232A] text-white text-xs font-semibold cursor-pointer hover:bg-black transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <StaggerContainer
            key={`${activeCategory}-${searchQuery}`}
            staggerDelay={0.06}
            initialDelay={0.02}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPlaces.map((place) => {
              const mapsUrl = place.googleMapsUrl || `https://www.google.com/maps/dir/?api=1&origin=Hotel+Bridge+595+Pitamber+Nagar-II+Lucknow+Bypass+Unnao&destination=${encodeURIComponent(place.mapQuery || place.name + ' Unnao')}`;

              return (
                <StaggerItem
                  key={place.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#E6DFD5] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 group"
                >
                  <div>
                    {/* Photo with Live Distance Pill */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                      <img
                        src={place.image}
                        alt={`${place.name} near Hotel Bridge Unnao`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                      
                      {/* Live Distance Badge */}
                      <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-xs font-bold flex items-center gap-1.5 border border-white/20 shadow-md">
                        <Navigation className="w-3.5 h-3.5 text-[#E5B869] fill-[#E5B869]" />
                        <span className="text-[#E5B869]">{place.distance}</span>
                        <span className="text-white/40">•</span>
                        <span className="text-stone-200 text-[11px] font-medium">{place.duration || 'Fast Drive'}</span>
                      </div>

                      {/* Emoji Icon Badge */}
                      {place.iconEmoji && (
                        <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md flex items-center justify-center text-sm shadow-md border border-white/10">
                          {place.iconEmoji}
                        </div>
                      )}

                      {/* Place Type Tag */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="inline-block px-2.5 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#E5B869] border border-[#E5B869]/30">
                          {place.type}
                        </span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-5">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1E232A] mb-2 leading-snug group-hover:text-[#916B36] transition-colors">
                        {place.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#5C6470] leading-relaxed line-clamp-3">
                        {place.description}
                      </p>
                    </div>
                  </div>

                  {/* Google Maps Live Route Trigger */}
                  <div className="p-5 pt-0">
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3.5 rounded-xl bg-[#FAF8F5] border border-[#E0D7C9] hover:bg-[#1E232A] hover:text-white hover:border-[#1E232A] text-[#1E232A] text-xs font-bold uppercase tracking-wider transition-all duration-200 group/btn"
                    >
                      <Navigation className="w-3.5 h-3.5 text-[#916B36] group-hover/btn:text-[#E5B869] transition-colors" />
                      <span>Get Live Directions</span>
                      <ExternalLink className="w-3 h-3 text-stone-400 group-hover/btn:text-stone-300 ml-auto" />
                    </a>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        )}

      </div>
    </section>
  );
};
