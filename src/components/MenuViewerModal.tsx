import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { X, Search, Leaf, Sparkles, MessageSquare, Printer, ExternalLink, ChevronDown, FileText } from 'lucide-react';
import { openPrintableMenuWindow } from '../utils/menuPrinter';

export const MenuViewerModal: React.FC = () => {
  const { hotel, isMenuModalOpen, setIsMenuModalOpen, openWhatsApp } = useHotel();
  const [selectedCatId, setSelectedCatId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyJain, setOnlyJain] = useState(false);
  const [showPrintOptions, setShowPrintOptions] = useState(false);

  if (!isMenuModalOpen) return null;

  const categories = hotel.restaurant.menuCategories || [];

  // Filtered menu logic
  const allItems = categories.flatMap(cat => cat.items.map(item => ({ ...item, categoryName: cat.name })));

  const filteredItems = allItems.filter(item => {
    const matchesCategory = selectedCatId === 'all' || item.category === categories.find(c => c.id === selectedCatId)?.name;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesJain = !onlyJain || item.isJainAvailable;

    return matchesCategory && matchesSearch && matchesJain;
  });

  const handleDirectPrint = () => {
    setShowPrintOptions(false);
    window.print();
  };

  const handleOpenPrintableTab = (onlyCurrentFilter: boolean = false) => {
    setShowPrintOptions(false);
    let categoriesToExport = categories;
    let note = 'Complete Restaurant Menu';

    if (onlyCurrentFilter && (searchQuery.trim() || selectedCatId !== 'all' || onlyJain)) {
      categoriesToExport = [
        {
          id: 'filtered-export',
          name:
            selectedCatId !== 'all'
              ? categories.find(c => c.id === selectedCatId)?.name || 'Selected Items'
              : 'Filtered Menu Items',
          description: `${filteredItems.length} item(s) matching current search/filter`,
          items: filteredItems,
        },
      ];
      note = `Filtered View (${filteredItems.length} items)`;
    }

    const opened = openPrintableMenuWindow(hotel, categoriesToExport, note);
    if (!opened) {
      window.print();
    }
  };

  const handleReserveDining = () => {
    openWhatsApp('restaurant', { guests: '4', date: 'Upcoming Date' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn print:hidden">
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E6DFD5] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-white border-b border-[#E6DFD5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shrink-0 border border-[#E5B869]/60 shadow-sm">
              <img
                src="/logo.svg"
                alt="Hotel Bridge Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#1E232A]">
                  Royal Kitchen Menu
                </h3>
                <span className="inline-flex items-center gap-1 text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-bold">
                  <Leaf className="w-2.5 h-2.5" />
                  100% PURE VEG
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-stone-500">
                Hotel Bridge • North Indian • South Indian • Tandoori • Chinese • Jain
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Print & PDF Menu Button with Dropdown */}
            <div className="relative">
              <div className="inline-flex rounded-md shadow-xs">
                <button
                  onClick={() => handleOpenPrintableTab(false)}
                  className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 border border-stone-300 rounded-l-md bg-stone-50 hover:bg-stone-100 transition-colors cursor-pointer"
                  title="Open Clean Printable Menu / Save as PDF"
                >
                  <Printer className="w-3.5 h-3.5 text-[#916B36]" />
                  <span>Print / PDF</span>
                </button>
                <button
                  onClick={() => setShowPrintOptions(prev => !prev)}
                  className="px-1.5 py-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 border border-l-0 border-stone-300 rounded-r-md bg-stone-50 hover:bg-stone-100 transition-colors cursor-pointer"
                  title="Print Options"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {showPrintOptions && (
                <div className="absolute right-0 mt-1.5 w-64 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 z-50 text-left">
                  <div className="px-3 py-1 text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                    Menu Print & Download
                  </div>
                  <button
                    onClick={() => handleOpenPrintableTab(false)}
                    className="w-full px-3 py-2 text-xs text-stone-700 hover:bg-amber-50/60 flex items-center gap-2.5 text-left transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#916B36] shrink-0" />
                    <div>
                      <div className="font-semibold text-stone-800">Open Clean Menu (New Tab)</div>
                      <div className="text-[10px] text-stone-500">Perfect for Save to PDF or printing</div>
                    </div>
                  </button>

                  <button
                    onClick={handleDirectPrint}
                    className="w-full px-3 py-2 text-xs text-stone-700 hover:bg-amber-50/60 flex items-center gap-2.5 text-left transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-stone-600 shrink-0" />
                    <div>
                      <div className="font-semibold text-stone-800">Direct Print (Ctrl + P)</div>
                      <div className="text-[10px] text-stone-500">Prints instantly using browser printer</div>
                    </div>
                  </button>

                  {(searchQuery.trim() || selectedCatId !== 'all' || onlyJain) && (
                    <button
                      onClick={() => handleOpenPrintableTab(true)}
                      className="w-full px-3 py-2 text-xs text-stone-700 hover:bg-amber-50/60 flex items-center gap-2.5 text-left border-t border-stone-100 transition-colors cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <div>
                        <div className="font-semibold text-stone-800">Print Filtered Dishes</div>
                        <div className="text-[10px] text-stone-500">Only {filteredItems.length} filtered items</div>
                      </div>
                    </button>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMenuModalOpen(false)}
              className="p-1.5 sm:p-2 rounded-full text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter and Search Controls */}
        <div className="p-4 bg-[#F5EFE6] border-b border-[#E6DFD5] flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes, paneer, noodles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white rounded-lg border border-[#D5CABE] text-xs focus:outline-none focus:ring-1 focus:ring-[#916B36]"
            />
          </div>

          {/* Jain Toggle & Category count */}
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <label className="flex items-center gap-2 text-xs font-medium text-stone-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyJain}
                onChange={(e) => setOnlyJain(e.target.checked)}
                className="w-4 h-4 text-[#128C7E] rounded border-stone-300 focus:ring-[#128C7E]"
              />
              <span className="flex items-center gap-1">
                <Leaf className="w-3 h-3 text-green-600" />
                Jain-friendly only
              </span>
            </label>

            <span className="text-xs text-stone-500 font-medium">
              {filteredItems.length} items
            </span>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="px-4 py-2.5 bg-white border-b border-[#E6DFD5] overflow-x-auto flex items-center gap-2">
          <button
            onClick={() => setSelectedCatId('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCatId === 'all'
                ? 'bg-[#1E232A] text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCatId(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCatId === cat.id
                  ? 'bg-[#1E232A] text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Menu Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm text-stone-500">No menu items found matching your filter.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCatId('all');
                  setOnlyJain(false);
                }}
                className="mt-2 text-xs text-[#916B36] font-semibold underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-xl border border-[#EBE3D7] shadow-sm flex flex-col justify-between hover:border-[#D5CABE] transition-colors"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {/* Pure Veg square green mark */}
                        <div className="w-3.5 h-3.5 border border-green-600 flex items-center justify-center p-0.5 rounded-sm flex-shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
                        </div>
                        <h4 className="text-sm font-bold text-[#1E232A]">
                          {item.name}
                        </h4>
                      </div>

                      <span className="text-sm font-bold text-[#916B36] flex-shrink-0">
                        ₹{item.price}
                      </span>
                    </div>

                    {item.description && (
                      <p className="text-xs text-stone-500 mt-1 pl-5.5 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Badges footer */}
                  <div className="flex items-center gap-2 mt-3 pt-2 border-t border-stone-100 pl-5.5">
                    {item.isChefSpecial && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-semibold">
                        <Sparkles className="w-2.5 h-2.5" />
                        Chef's Special
                      </span>
                    )}
                    {item.isJainAvailable && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                        <Leaf className="w-2.5 h-2.5" />
                        Jain Available
                      </span>
                    )}
                    <span className="text-[10px] text-stone-400 ml-auto">
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#E6DFD5] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-stone-500 text-center sm:text-left">
            <span>Taxes & packing charges extra as applicable • Prices are subject to hotel management updates</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => handleOpenPrintableTab(false)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-stone-300 hover:border-stone-400 bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-semibold transition-colors w-full sm:w-auto cursor-pointer"
              title="Open Printable Version / Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-[#916B36]" />
              <span>Print / PDF Menu</span>
            </button>

            <button
              onClick={handleReserveDining}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#128C7E] hover:bg-[#0c6b60] text-white text-xs font-semibold tracking-wider uppercase transition-colors shadow-sm w-full sm:w-auto cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Enquire / Reserve Table</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
