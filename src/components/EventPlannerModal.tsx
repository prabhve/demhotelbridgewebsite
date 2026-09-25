import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { X, Calendar, Users, PartyPopper, MessageSquare, Phone, CheckCircle2 } from 'lucide-react';

export const EventPlannerModal: React.FC = () => {
  const {
    hotel,
    isEventModalOpen,
    setIsEventModalOpen,
    selectedEventOccasion,
    openWhatsApp,
    getPhoneCallUrl
  } = useHotel();

  const [eventType, setEventType] = useState(selectedEventOccasion || 'Wedding / Ring Ceremony');
  const [eventDate, setEventDate] = useState('');
  const [guestCount, setGuestCount] = useState('100');
  const [cateringReq, setCateringReq] = useState('Pure Vegetarian Buffet');
  const [notes, setNotes] = useState('');

  if (!isEventModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedParams = {
      eventType: eventType || 'Special Celebration',
      date: eventDate || 'Upcoming Date (TBD)',
      guests: guestCount || '50+'
    };

    openWhatsApp('event', formattedParams);
    setIsEventModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E6DFD5] overflow-hidden my-auto flex flex-col">
        
        {/* Modal Header */}
        <div className="p-5 bg-white border-b border-[#E6DFD5] flex items-center justify-between">
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
                EVENT INQUIRY • HOTEL BRIDGE
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1E232A]">
                Plan Your Celebration
              </h3>
            </div>
          </div>
          <button
            onClick={() => setIsEventModalOpen(false)}
            className="p-2 rounded-full text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors"
            aria-label="Close Event Planner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#1E232A] uppercase tracking-wider mb-1.5">
              Occasion / Event Type
            </label>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white rounded-lg border border-[#D5CABE] text-xs sm:text-sm text-[#1E232A] focus:outline-none focus:ring-1 focus:ring-[#916B36]"
            >
              <option value="Wedding / Ring Ceremony">Weddings & Ring Ceremonies</option>
              <option value="Birthday Party / Anniversary">Birthday Party & Anniversaries</option>
              <option value="Corporate Meeting / Seminar">Corporate Meeting & Seminar</option>
              <option value="Family Gathering / Kitty Party">Family Gathering & Private Party</option>
              <option value="Other Function">Other Function / Custom Event</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#1E232A] uppercase tracking-wider mb-1.5">
                Approx. Event Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white rounded-lg border border-[#D5CABE] text-xs sm:text-sm text-[#1E232A] focus:outline-none focus:ring-1 focus:ring-[#916B36]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1E232A] uppercase tracking-wider mb-1.5">
                Estimated Guests
              </label>
              <input
                type="text"
                placeholder="e.g. 50-150 guests"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="w-full px-3.5 py-2 bg-white rounded-lg border border-[#D5CABE] text-xs sm:text-sm text-[#1E232A] focus:outline-none focus:ring-1 focus:ring-[#916B36]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1E232A] uppercase tracking-wider mb-1.5">
              Catering Preference (Royal Kitchen)
            </label>
            <select
              value={cateringReq}
              onChange={(e) => setCateringReq(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white rounded-lg border border-[#D5CABE] text-xs sm:text-sm text-[#1E232A] focus:outline-none focus:ring-1 focus:ring-[#916B36]"
            >
              <option value="Pure Vegetarian Buffet">Pure Vegetarian Buffet</option>
              <option value="Pure Vegetarian + Jain Options">Pure Vegetarian + Jain Options</option>
              <option value="High Tea & Snacks">High Tea & Snacks Platters</option>
              <option value="Custom Menu">Custom Curated Menu</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1E232A] uppercase tracking-wider mb-1.5">
              Special Requests or Room Stay Needs
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Need 10 deluxe guest rooms for outstation family members..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 bg-white rounded-lg border border-[#D5CABE] text-xs sm:text-sm text-[#1E232A] focus:outline-none focus:ring-1 focus:ring-[#916B36]"
            />
          </div>

          {/* Guarantee Note */}
          <div className="bg-[#FAF2E6] p-3 rounded-lg border border-[#E9DFD0] text-xs text-[#6B5A46] flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#916B36] flex-shrink-0 mt-0.5" />
            <span>
              Your details will be formatted directly into WhatsApp so our banquet team can review availability and reply instantly.
            </span>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a
              href={getPhoneCallUrl()}
              className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-[#D5CABE] bg-white text-[#1E232A] hover:bg-[#F3ECE0] text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#916B36]" />
              <span>Call Event Team</span>
            </a>

            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-[#128C7E] hover:bg-[#0c6b60] text-white text-xs font-semibold tracking-wider uppercase transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send Enquiry on WhatsApp</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
