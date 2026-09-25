import React from 'react';
import { useHotel } from '../context/HotelContext';
import { X, ShieldCheck, FileText, RefreshCw } from 'lucide-react';

export const PoliciesModal: React.FC = () => {
  const { activePolicyModal, setActivePolicyModal } = useHotel();

  if (!activePolicyModal) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E6DFD5] overflow-hidden my-auto max-h-[85vh] flex flex-col">
        
        {/* Header */}
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
              <span className="text-[10px] uppercase tracking-widest text-[#916B36] font-bold block">
                HOTEL BRIDGE • OFFICIAL POLICIES
              </span>
              <h3 className="font-serif text-xl font-bold text-[#1E232A] capitalize leading-tight">
                {activePolicyModal === 'privacy' && 'Privacy Policy'}
                {activePolicyModal === 'terms' && 'Terms & Conditions'}
                {activePolicyModal === 'cancellation' && 'Cancellation & Refund Guidelines'}
              </h3>
            </div>
          </div>
          <button
            onClick={() => setActivePolicyModal(null)}
            className="p-2 rounded-full text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors"
            aria-label="Close Policy"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Policy Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#4E5662] leading-relaxed">
          {activePolicyModal === 'privacy' && (
            <>
              <p>
                <strong>Hotel Bridge, Unnao</strong> is committed to respecting and protecting the privacy of our guests and website visitors.
              </p>
              <h4 className="font-bold text-[#1E232A]">Information We Collect</h4>
              <p>
                When you contact us via WhatsApp, phone, or our website inquiry form, we only receive the communication details you voluntarily provide (such as your name, mobile number, and booking dates) to process your room reservation or dining request.
              </p>
              <h4 className="font-bold text-[#1E232A]">No Third-Party Sharing</h4>
              <p>
                We do not sell, rent, or trade your personal contact details to external marketing agencies or third parties. All information is strictly utilized for direct guest assistance.
              </p>
            </>
          )}

          {activePolicyModal === 'terms' && (
            <>
              <p>
                Welcome to <strong>Hotel Bridge, Unnao</strong>. By utilizing our official website or staying at our property, you agree to comply with standard hospitality guidelines.
              </p>
              <h4 className="font-bold text-[#1E232A]">Check-In & Identification</h4>
              <p>
                As per local statutory regulations in Uttar Pradesh, all primary adult guests are required to present a valid government-issued photo ID (such as Aadhaar Card, Passport, Voter ID, or Driving License) at the front desk upon check-in.
              </p>
              <h4 className="font-bold text-[#1E232A]">Royal Kitchen Dining Policy</h4>
              <p>
                Royal Kitchen operates strictly as a 100% Pure Vegetarian dining facility. Outside non-vegetarian food is strictly prohibited on hotel restaurant premises to respect all guests.
              </p>
            </>
          )}

          {activePolicyModal === 'cancellation' && (
            <>
              <p>
                At <strong>Hotel Bridge</strong>, we understand plans may change. Please review our confirmed cancellation and amendment terms:
              </p>
              <h4 className="font-bold text-[#1E232A]">Standard Direct Reservations</h4>
              <p>
                Cancellations or date modifications communicated directly to our front desk via WhatsApp or phone at least 24 hours prior to standard check-in time are processed with full flexibility.
              </p>
              <h4 className="font-bold text-[#1E232A]">Banquets & Event Bookings</h4>
              <p>
                For wedding hall, conference, and bulk group room reservations, cancellation terms and advance retention schedules are specified in your written event confirmation note.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#E6DFD5] flex justify-end">
          <button
            onClick={() => setActivePolicyModal(null)}
            className="px-5 py-2 rounded-lg bg-[#1E232A] text-white text-xs font-semibold uppercase tracking-wider"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
