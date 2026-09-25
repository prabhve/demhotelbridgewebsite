import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { X, Check, BedDouble, Users, Maximize2, Eye, Phone, MessageSquare, ShieldCheck } from 'lucide-react';

export const RoomDetailModal: React.FC = () => {
  const { selectedRoom, setSelectedRoom, openWhatsApp, getPhoneCallUrl } = useHotel();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!selectedRoom) return null;

  const handleWhatsAppEnquire = () => {
    openWhatsApp('room', { roomName: selectedRoom.name });
  };

  const images = selectedRoom.images && selectedRoom.images.length > 0
    ? selectedRoom.images
    : ["https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80"];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E6DFD5] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Header Bar with Close Button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6DFD5] bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#E5B869]/50 shadow-sm">
              <img
                src="/logo.svg"
                alt="Hotel Bridge Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#916B36] font-bold">
                ACCOMMODATION DETAILS • HOTEL BRIDGE
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1E232A]">
                {selectedRoom.name}
              </h3>
            </div>
          </div>
          <button
            onClick={() => setSelectedRoom(null)}
            className="p-2 rounded-full text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors"
            aria-label="Close Room Details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          
          {/* Main Photo Gallery */}
          <div className="space-y-3">
            <div className="relative rounded-xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-stone-900">
              <img
                src={images[activeImageIndex] || images[0]}
                alt={selectedRoom.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md text-white text-xs font-medium">
                Photo {activeImageIndex + 1} of {images.length}
              </div>
            </div>

            {/* Thumbnail Selectors */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                      activeImageIndex === i ? 'border-[#916B36] ring-1 ring-[#916B36]' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Key Room Specifications Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-[#E6DFD5]">
            <div className="flex items-center gap-2.5">
              <BedDouble className="w-4 h-4 text-[#916B36]" />
              <div>
                <span className="block text-[10px] text-stone-500 uppercase tracking-wider">Bed Type</span>
                <span className="text-xs font-semibold text-[#1E232A]">{selectedRoom.bedType}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-[#916B36]" />
              <div>
                <span className="block text-[10px] text-stone-500 uppercase tracking-wider">Capacity</span>
                <span className="text-xs font-semibold text-[#1E232A]">{selectedRoom.capacity}</span>
              </div>
            </div>

            {selectedRoom.size && (
              <div className="flex items-center gap-2.5">
                <Maximize2 className="w-4 h-4 text-[#916B36]" />
                <div>
                  <span className="block text-[10px] text-stone-500 uppercase tracking-wider">Room Area</span>
                  <span className="text-xs font-semibold text-[#1E232A]">{selectedRoom.size}</span>
                </div>
              </div>
            )}

            {selectedRoom.view && (
              <div className="flex items-center gap-2.5">
                <Eye className="w-4 h-4 text-[#916B36]" />
                <div>
                  <span className="block text-[10px] text-stone-500 uppercase tracking-wider">View</span>
                  <span className="text-xs font-semibold text-[#1E232A]">{selectedRoom.view}</span>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#916B36] mb-2">
              ABOUT THIS ROOM
            </h4>
            <p className="text-sm text-[#4A525D] leading-relaxed">
              {selectedRoom.longDesc || selectedRoom.shortDesc}
            </p>
          </div>

          {/* Included Amenities */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#916B36] mb-3">
              ROOM AMENITIES & FEATURES
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {selectedRoom.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-[#EBE3D7] text-xs text-[#2E3640]">
                  <Check className="w-3.5 h-3.5 text-[#128C7E] flex-shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tariff Note & Verified Booking Notice */}
          <div className="bg-[#F5EFE6] rounded-xl p-4 border border-[#E6DFD5] flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#916B36] flex-shrink-0 mt-0.5" />
            <div className="text-xs text-[#5B554D]">
              <span className="font-semibold text-[#1E232A] block mb-0.5">Direct Hotel Booking</span>
              <p>
                {selectedRoom.showPrice && selectedRoom.customPrice
                  ? `Tariff: ${selectedRoom.customPrice}`
                  : 'Tariff is shared directly on enquiry based on your check-in dates and occupancy.'}
                {' '}Connect directly on WhatsApp or call our reception for the best rates.
              </p>
            </div>
          </div>

        </div>

        {/* Modal Sticky Bottom Actions */}
        <div className="p-4 sm:p-6 bg-white border-t border-[#E6DFD5] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            <span className="text-xs text-stone-500 block">Pricing & Availability:</span>
            <span className="text-sm font-bold text-[#1E232A]">
              {selectedRoom.showPrice && selectedRoom.customPrice ? selectedRoom.customPrice : 'Enquire for current tariff'}
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={getPhoneCallUrl()}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#D5CABE] text-[#1E232A] hover:bg-[#FAF8F5] text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#916B36]" />
              <span>Call Front Desk</span>
            </a>

            <button
              onClick={handleWhatsAppEnquire}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#128C7E] hover:bg-[#0c6b60] text-white text-xs font-semibold tracking-wider uppercase transition-colors shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Enquire on WhatsApp</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
