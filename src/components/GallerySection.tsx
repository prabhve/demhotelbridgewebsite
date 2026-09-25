import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { Eye } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from './MotionContainer';
import { motion } from 'motion/react';

export const GallerySection: React.FC = () => {
  const { hotel, setLightboxImage } = useHotel();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'rooms', label: 'Rooms' },
    { id: 'restaurant', label: 'Restaurant' },
    { id: 'food', label: 'Pure Veg Food' },
    { id: 'events', label: 'Events' },
    { id: 'exterior', label: 'Exterior' },
    { id: 'interior', label: 'Lobby & Interior' },
  ];

  const filteredGallery = activeCategory === 'all'
    ? hotel.gallery
    : hotel.gallery.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="py-20 bg-white border-y border-[#E6DFD5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <FadeIn direction="up" distance={20} className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#916B36] block mb-2">
            VISUAL TOUR
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E232A] tracking-tight mb-4">
            Hotel Bridge in Pictures
          </h2>
          <p className="text-base text-[#616874] font-normal leading-relaxed">
            Take a visual tour of our guest accommodations, pure vegetarian dining halls at Royal Kitchen, and property spaces.
          </p>
        </FadeIn>

        {/* Category Filters */}
        <FadeIn delay={0.1} direction="up" distance={15} className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all border ${
                activeCategory === cat.id
                  ? 'bg-[#1E232A] text-white border-[#1E232A] shadow-sm'
                  : 'bg-[#FAF8F5] text-[#4A5360] border-[#E0D7C9] hover:bg-[#F3ECE0]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </FadeIn>

        {/* Responsive Editorial Gallery Grid with Staggered Motion */}
        <StaggerContainer
          key={activeCategory}
          staggerDelay={0.06}
          initialDelay={0.05}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredGallery.map((item) => (
            <StaggerItem
              key={item.id}
              onClick={() => setLightboxImage(item)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-200 cursor-pointer border border-[#E6DFD5] shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={item.url}
                alt={item.alt || item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] uppercase tracking-widest text-[#E5B869] font-bold">
                  {item.category}
                </span>
                <h4 className="font-serif text-base font-bold leading-snug">
                  {item.title}
                </h4>
                <div className="flex items-center gap-1 text-xs text-stone-300 mt-2">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Click to enlarge</span>
                </div>
              </div>

              {/* Category tag on top right */}
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md text-white text-[10px] uppercase tracking-wider font-medium">
                {item.category}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
};
