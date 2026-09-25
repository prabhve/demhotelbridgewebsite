import React from 'react';
import { useHotel } from '../context/HotelContext';
import { Room } from '../types/hotel';
import { BedDouble, Users, Check, MessageSquare, ArrowRight, Eye } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from './MotionContainer';
import { motion } from 'motion/react';

export const RoomsSection: React.FC = () => {
  const { hotel, setSelectedRoom, openWhatsApp } = useHotel();

  const handleEnquireRoom = (room: Room) => {
    openWhatsApp('room', { roomName: room.name });
  };

  return (
    <section id="rooms" className="py-20 bg-white border-y border-[#E6DFD5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <FadeIn direction="up" distance={20} className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#916B36] block mb-2">
            ACCOMMODATIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E232A] tracking-tight mb-4">
            Stay Your Way
          </h2>
          <p className="text-base text-[#616874] font-normal leading-relaxed">
            Comfortable spaces designed for a relaxed stay. Thoughtfully equipped for business travelers, weekend tourists, and event guests.
          </p>
        </FadeIn>

        {/* Room Grid with Staggered Entrance */}
        <StaggerContainer staggerDelay={0.14} initialDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hotel.rooms.map((room) => {
            const primaryImg = room.images && room.images.length > 0
              ? room.images[0]
              : "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80";

            return (
              <StaggerItem
                key={room.id}
                className="group bg-[#FAF8F5] rounded-2xl overflow-hidden border border-[#E6DFD5] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1"
              >
                {/* Room Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-200">
                  <img
                    src={primaryImg}
                    alt={`${room.name} at Hotel Bridge Unnao`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md text-white text-[11px] font-medium tracking-wide uppercase">
                    {room.category === 'suite' ? 'Premium Suite' : 'Deluxe Stay'}
                  </div>

                  {/* View Details Quick Button on Image */}
                  <button
                    onClick={() => setSelectedRoom(room)}
                    className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-[2px]"
                    aria-label={`View photos of ${room.name}`}
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Gallery ({room.images?.length || 1} Photos)</span>
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Room Title */}
                    <h3 className="font-serif text-xl font-bold text-[#1E232A] mb-2 leading-snug">
                      {room.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-[#5C6470] leading-relaxed mb-4 line-clamp-2">
                      {room.shortDesc}
                    </p>

                    {/* Quick Specs */}
                    <div className="flex items-center gap-4 py-2.5 border-y border-[#EAE2D5] text-xs text-[#424A55] mb-4">
                      <div className="flex items-center gap-1.5">
                        <BedDouble className="w-3.5 h-3.5 text-[#916B36]" />
                        <span>{room.bedType}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#916B36]" />
                        <span>{room.capacity}</span>
                      </div>
                    </div>

                    {/* Amenities Preview */}
                    <div className="space-y-1.5 mb-6">
                      {room.amenities.slice(0, 3).map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-[#4F5763]">
                          <Check className="w-3.5 h-3.5 text-[#128C7E] flex-shrink-0" />
                          <span className="truncate">{amenity}</span>
                        </div>
                      ))}
                      {room.amenities.length > 3 && (
                        <span className="text-[11px] text-[#916B36] font-medium block pt-0.5">
                          +{room.amenities.length - 3} more amenities
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Pricing and Action CTAs */}
                  <div className="pt-2 border-t border-[#EAE2D5]">
                    <div className="mb-3">
                      <span className="text-[11px] text-stone-500 block uppercase tracking-wider">Tariff</span>
                      <span className="text-sm font-semibold text-[#1E232A]">
                        {room.showPrice && room.customPrice ? room.customPrice : 'Enquire for current tariff'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setSelectedRoom(room)}
                        className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-white border border-[#D5CABE] hover:bg-[#F3ECE0] text-[#1E232A] text-xs font-semibold tracking-wider uppercase transition-colors"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3 h-3 text-[#916B36]" />
                      </button>

                      <button
                        onClick={() => handleEnquireRoom(room)}
                        className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-[#128C7E] hover:bg-[#0c6b60] text-white text-xs font-semibold tracking-wider uppercase transition-colors shadow-sm"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  </div>

                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Bottom Booking Guarantee strip */}
        <FadeIn delay={0.2} direction="up" distance={15} className="mt-12 text-center bg-[#FAF8F5] p-5 rounded-2xl border border-[#E6DFD5] max-w-2xl mx-auto shadow-sm">
          <p className="text-xs text-[#5C6470]">
            Need multiple rooms for wedding groups or corporate travel? 
            <button
              onClick={() => openWhatsApp('general')}
              className="text-[#916B36] font-semibold hover:underline ml-1 inline-flex items-center gap-1"
            >
              Enquire for group tariff on WhatsApp →
            </button>
          </p>
        </FadeIn>

      </div>
    </section>
  );
};
