import React from 'react';
import { useHotel } from '../context/HotelContext';
import { Leaf, Sparkles } from 'lucide-react';

export const PrintableMenu: React.FC = () => {
  const { hotel } = useHotel();
  const categories = hotel.restaurant?.menuCategories || [];

  return (
    <div id="printable-restaurant-menu" className="hidden print:block text-black bg-white w-full">
      {/* Printable Header */}
      <div className="text-center border-b-2 border-[#C5963B] pb-4 mb-4">
        <div className="text-xs uppercase tracking-widest font-bold text-[#785317]">
          {hotel.name || 'Hotel Bridge'}
        </div>
        <h1 className="font-serif text-3xl font-bold text-black tracking-wide my-1">
          {hotel.restaurant?.name || 'Royal Kitchen'}
        </h1>
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-emerald-600 bg-emerald-50 text-emerald-800 text-[11px] font-bold tracking-wider uppercase mb-2">
          <span className="w-2.5 h-2.5 border border-emerald-700 flex items-center justify-center p-0.5 rounded-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
          </span>
          100% Pure Vegetarian Restaurant
        </div>
        <p className="text-xs text-stone-600 max-w-xl mx-auto leading-relaxed">
          {hotel.fullAddress || `${hotel.addressLine1 || ''}, ${hotel.city || 'Unnao'}, ${hotel.state || 'UP'} - ${hotel.pincode || ''}`}
        </p>
        <div className="text-xs text-stone-700 font-medium mt-1 flex items-center justify-center gap-3">
          <span>📞 {hotel.primaryPhone || '+91 63079 51300'}</span>
          <span>•</span>
          <span>💬 WhatsApp: {hotel.whatsappNumber || '+91 63079 51300'}</span>
          <span>•</span>
          <span>⏰ {hotel.restaurant?.timing || '7:30 AM – 11:00 PM'}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between border border-dashed border-stone-300 rounded px-3 py-1.5 mb-5 text-[11px] text-stone-600 bg-stone-50 print-avoid-break">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 font-semibold text-emerald-800">
            <span className="w-2.5 h-2.5 border border-emerald-700 flex items-center justify-center p-0.5 rounded-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
            </span>
            Pure Vegetarian
          </span>
          <span className="flex items-center gap-1 text-emerald-700">
            <Leaf className="w-3 h-3 text-emerald-600" />
            Jain Friendly (No Onion / No Garlic on Request)
          </span>
          <span className="flex items-center gap-1 text-amber-800">
            <Sparkles className="w-3 h-3 text-amber-600" />
            Chef's Special
          </span>
        </div>
        <span className="font-bold text-[#785317]">Tariff Card</span>
      </div>

      {/* Categories in 2 Columns */}
      <div className="space-y-6">
        {categories.map((cat) => (
          <div key={cat.id} className="print-avoid-break mb-5">
            <div className="flex items-baseline justify-between border-b border-[#C5963B]/60 pb-1 mb-3">
              <h2 className="font-serif text-lg font-bold text-[#785317] uppercase tracking-wider">
                {cat.name}
              </h2>
              {cat.description && (
                <span className="text-[11px] text-stone-500 italic">
                  {cat.description}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {cat.items.map((item) => (
                <div key={item.id} className="print-avoid-break text-xs py-0.5">
                  <div className="flex items-baseline justify-between w-full">
                    <div className="flex items-center gap-1.5 flex-1 pr-2 truncate">
                      <span className="w-2.5 h-2.5 border border-emerald-700 flex items-center justify-center p-0.5 rounded-xs shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
                      </span>
                      <span className="font-bold text-stone-900 truncate">
                        {item.name}
                      </span>
                      {item.isChefSpecial && (
                        <span className="text-[9px] bg-amber-100 text-amber-800 px-1 rounded font-semibold shrink-0">
                          ★ Chef
                        </span>
                      )}
                      {item.isJainAvailable && (
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 rounded font-semibold shrink-0">
                          🌱 Jain
                        </span>
                      )}
                    </div>
                    <span className="border-b border-dotted border-stone-300 flex-1 mx-1 h-0"></span>
                    <span className="font-bold text-[#785317] shrink-0 text-right">
                      ₹{item.price}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-[10px] text-stone-500 pl-4 mt-0.5 leading-tight">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Printable Footer */}
      <div className="border-t border-[#C5963B] pt-3 mt-6 flex items-center justify-between text-[11px] text-stone-500 print-avoid-break">
        <div>
          <span>• Government taxes & packaging charges extra as applicable</span>
          <span className="ml-3">• Room delivery available (Dial 9 from intercom)</span>
        </div>
        <div className="font-serif font-bold text-stone-800">
          Hotel Bridge • Royal Kitchen Ayodhya
        </div>
      </div>
    </div>
  );
};
