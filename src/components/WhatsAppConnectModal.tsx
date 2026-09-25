import React, { useState, useEffect } from 'react';
import { useHotel } from '../context/HotelContext';
import { MessageSquare, Phone, Copy, Check, ExternalLink, X, Smartphone, Monitor } from 'lucide-react';

export const WhatsAppConnectModal: React.FC = () => {
  const { isWhatsAppModalOpen, setIsWhatsAppModalOpen, whatsAppModalData, hotel } = useHotel();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isWhatsAppModalOpen) {
        setIsWhatsAppModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isWhatsAppModalOpen, setIsWhatsAppModalOpen]);

  if (!isWhatsAppModalOpen || !whatsAppModalData) {
    return null;
  }

  const handleCopyMessage = () => {
    if (!whatsAppModalData?.messageText) return;
    navigator.clipboard.writeText(whatsAppModalData.messageText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      // Fallback copy
      try {
        const textarea = document.createElement('textarea');
        textarea.value = whatsAppModalData.messageText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (err) {
        console.error('Failed to copy', err);
      }
    });
  };

  const rawPhone = (hotel.primaryPhone || '+916307951300').replace(/[^0-9+]/g, '');

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden transform transition-all animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#128C7E] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center text-white backdrop-blur-xs shadow-inner">
              <MessageSquare className="w-6 h-6 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg leading-tight text-white">Chat on WhatsApp</h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/25 text-white uppercase tracking-wider">
                  Hotel Verified
                </span>
              </div>
              <p className="text-xs text-white/80 mt-0.5">
                Hotel Bridge, Unnao • {whatsAppModalData.displayNumber || '+91 63079 51300'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsWhatsAppModalOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Status Bar */}
          <div className="flex items-start gap-3 p-3.5 bg-emerald-50 border border-emerald-200/80 rounded-xl text-emerald-900 text-xs">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping mt-1 shrink-0" />
            <div>
              <p className="font-semibold text-emerald-950">
                Opening WhatsApp in a new window...
              </p>
              <p className="text-[11px] text-emerald-800 mt-0.5">
                If your browser blocked the tab or you are on desktop, click one of the direct options below to connect instantly.
              </p>
            </div>
          </div>

          {/* Quick Choice Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* WhatsApp Web Option */}
            <a
              href={whatsAppModalData.webUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col p-4 rounded-xl border-2 border-emerald-600 bg-emerald-50/50 hover:bg-emerald-100/60 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-lg bg-emerald-600 text-white shadow-xs">
                  <Monitor className="w-5 h-5" />
                </span>
                <ExternalLink className="w-4 h-4 text-emerald-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <span className="font-bold text-sm text-stone-900">
                WhatsApp Web
              </span>
              <span className="text-[11px] text-stone-600 mt-0.5">
                Best for PC &amp; Laptop browsers without desktop app
              </span>
            </a>

            {/* WhatsApp Mobile / App Option */}
            <a
              href={whatsAppModalData.apiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col p-4 rounded-xl border border-stone-200 bg-white hover:border-[#128C7E] hover:bg-stone-50 transition-all group shadow-xs"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-lg bg-stone-900 text-white">
                  <Smartphone className="w-5 h-5" />
                </span>
                <ExternalLink className="w-4 h-4 text-stone-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <span className="font-bold text-sm text-stone-900">
                WhatsApp App / Phone
              </span>
              <span className="text-[11px] text-stone-600 mt-0.5">
                Opens native mobile app or installed WhatsApp client
              </span>
            </a>
          </div>

          {/* Pre-filled Message Box */}
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider">
                Pre-filled Booking Message
              </span>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg border border-stone-300 bg-white text-stone-700 hover:bg-stone-100 transition-colors shadow-2xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone-500" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-stone-700 font-mono bg-white p-3 rounded-lg border border-stone-200 whitespace-pre-wrap leading-relaxed max-h-32 overflow-y-auto">
              {whatsAppModalData.messageText}
            </p>
          </div>

          {/* Direct Phone Call Alternative */}
          <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-stone-500 text-center sm:text-left">
              Prefer calling our reservation desk directly?
            </div>
            <a
              href={`tel:${rawPhone}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-[#916B36] bg-[#FAF5EE] hover:bg-[#F3EADB] border border-[#E5D7C5] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#916B36]" />
              <span>Call: +91 63079 51300</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-stone-50 px-6 py-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
          <span>⚡ Fast responses • Official Hotel Bridge Channel</span>
          <button
            onClick={() => setIsWhatsAppModalOpen(false)}
            className="text-stone-600 hover:text-stone-900 font-medium underline"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
