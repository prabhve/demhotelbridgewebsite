import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { MapPin, Phone, MessageSquare, Clock } from 'lucide-react';
import { FadeIn } from './MotionContainer';
import { motion } from 'motion/react';

export const ContactSection: React.FC = () => {
  const { hotel, openWhatsApp, openWhatsAppCustom, getPhoneCallUrl } = useHotel();
  
  const [senderName, setSenderName] = useState('');
  const [inquiryType, setInquiryType] = useState('Room Booking');
  const [userPhone, setUserPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const customText = `Hello Hotel Bridge, I am reaching out via your official website.

Name: ${senderName || 'Guest'}
Inquiry: ${inquiryType}
Contact: ${userPhone || 'N/A'}
Message: ${message || 'Please share room / event details.'}`;

    openWhatsAppCustom(customText, 'Website Inquiry');
  };

  return (
    <section id="contact" className="py-20 bg-[#FAF8F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <FadeIn direction="up" distance={20} className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#916B36] block mb-2">
            GET IN TOUCH
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E232A] tracking-tight mb-4">
            Contact Hotel Bridge
          </h2>
          <p className="text-base text-[#616874] font-normal leading-relaxed">
            Our front desk is available round-the-clock. Reach out directly via WhatsApp for quick response or call us.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Contact Info */}
          <FadeIn direction="right" distance={24} duration={0.65} className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-6 rounded-2xl border border-[#E6DFD5] shadow-xs space-y-6">
              
              {/* Hotel Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F5EFE6] text-[#916B36] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                    Phone Inquiries & Bookings
                  </span>
                  <a
                    href={getPhoneCallUrl()}
                    className="text-base font-bold text-[#1E232A] hover:text-[#916B36] transition-colors"
                  >
                    +91 63079 51300
                  </a>
                  <p className="text-xs text-stone-500 mt-0.5">Available 24/7 for room & event queries</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4 pt-4 border-t border-stone-100">
                <div className="w-10 h-10 rounded-xl bg-[#E8F6F4] text-[#128C7E] flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                    WhatsApp Chat
                  </span>
                  <button
                    onClick={() => openWhatsApp('contact')}
                    className="text-base font-bold text-[#128C7E] hover:underline cursor-pointer"
                  >
                    +91 63079 51300
                  </button>
                  <p className="text-xs text-stone-500 mt-0.5">Instant availability, tariff & photos</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4 pt-4 border-t border-stone-100">
                <div className="w-10 h-10 rounded-xl bg-[#F5EFE6] text-[#916B36] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                    Property Location
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-[#1E232A]">
                    595, Pitamber Nagar-II, Lucknow Bypass
                  </p>
                  <p className="text-xs text-stone-500">
                    Near Koyla Gali, Shiv Nagar, Unnao, Uttar Pradesh 209801
                  </p>
                </div>
              </div>

              {/* Reception Hours */}
              <div className="flex items-start gap-4 pt-4 border-t border-stone-100">
                <div className="w-10 h-10 rounded-xl bg-[#F5EFE6] text-[#916B36] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                    Front Desk Timings
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-[#1E232A]">
                    Open 24 Hours • 7 Days a Week
                  </p>
                  <p className="text-xs text-stone-500">Check-in / Check-out assistance available anytime</p>
                </div>
              </div>

            </div>

            {/* Direct Instant Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={getPhoneCallUrl()}
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white border border-[#D5CABE] hover:bg-[#F0E8DC] text-[#1E232A] text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4 text-[#916B36]" />
                <span>Call Hotel</span>
              </a>

              <button
                onClick={() => openWhatsApp('contact')}
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#128C7E] hover:bg-[#0c6b60] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>

          </FadeIn>

          {/* Right Column: Quick Lead Generation Enquiry Form */}
          <FadeIn direction="left" distance={24} duration={0.65} delay={0.1} className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E6DFD5] shadow-xs">
              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-widest text-[#916B36] font-bold">
                  DIRECT ENQUIRY
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1E232A]">
                  Send an Enquiry
                </h3>
                <p className="text-xs text-[#5C6470] mt-1">
                  Fill in your requirements below to instantly generate a WhatsApp message to our front desk team.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1E232A] uppercase tracking-wider mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Sharma"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] rounded-xl border border-[#D5CABE] text-xs sm:text-sm text-[#1E232A] focus:outline-none focus:ring-1 focus:ring-[#916B36]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E232A] uppercase tracking-wider mb-1.5">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] rounded-xl border border-[#D5CABE] text-xs sm:text-sm text-[#1E232A] focus:outline-none focus:ring-1 focus:ring-[#916B36]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E232A] uppercase tracking-wider mb-1.5">
                    What are you looking for?
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] rounded-xl border border-[#D5CABE] text-xs sm:text-sm text-[#1E232A] focus:outline-none focus:ring-1 focus:ring-[#916B36]"
                  >
                    <option value="Room Booking & Tariff">Room Booking & Tariff</option>
                    <option value="Royal Kitchen Dining / Table Reservation">Royal Kitchen Dining / Table Reservation</option>
                    <option value="Event / Wedding Banquet Inquiry">Event / Wedding Banquet Inquiry</option>
                    <option value="Corporate Meeting Venue">Corporate Meeting Venue</option>
                    <option value="General Question / Directions">General Question / Directions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E232A] uppercase tracking-wider mb-1.5">
                    Details / Dates / Number of Guests
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your dates, check-in time, or specific room preferences..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] rounded-xl border border-[#D5CABE] text-xs sm:text-sm text-[#1E232A] focus:outline-none focus:ring-1 focus:ring-[#916B36]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#128C7E] hover:bg-[#0c6b60] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Proceed to WhatsApp with Prepared Enquiry</span>
                  </button>
                </div>
              </form>
            </div>
          </FadeIn>

        </div>

      </div>
    </section>
  );
};
