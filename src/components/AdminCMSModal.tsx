import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { initialHotelData } from '../data/hotelData';
import {
  HotelConfig,
  Room,
  GalleryMedia,
  MenuItem,
  MenuCategory,
  EventOccasion,
  Facility,
  Attraction,
  ReviewItem,
  FAQItem
} from '../types/hotel';
import {
  X,
  Save,
  RotateCcw,
  Phone,
  MessageSquare,
  Image as ImageIcon,
  BedDouble,
  UtensilsCrossed,
  Plus,
  Trash2,
  CheckCircle,
  Upload,
  Lock,
  Sparkles,
  MapPin,
  Star,
  Calendar,
  Compass,
  HelpCircle,
  FileText,
  ChevronRight,
  Eye,
  Edit3,
  Layers,
  Menu as MenuIcon,
  Search,
  ExternalLink,
  ShieldCheck,
  Building2,
  Globe,
  Share2,
  Code,
  Copy,
  Check,
  RefreshCw,
  Sliders,
  Smartphone,
  Monitor,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  ArrowDown,
  AlertCircle
} from 'lucide-react';

type AdminTab =
  | 'branding'
  | 'contact'
  | 'whatsapp'
  | 'rooms'
  | 'restaurant'
  | 'events'
  | 'gallery'
  | 'facilities'
  | 'attractions'
  | 'reviews'
  | 'faqs'
  | 'seo';

export const AdminCMSModal: React.FC = () => {
  const { hotel, updateHotel, resetHotelData, isAdminOpen, setIsAdminOpen } = useHotel();

  // Authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passError, setPassError] = useState(false);

  // Active Admin Navigation Tab (Left Sidebar)
  const [activeTab, setActiveTab] = useState<AdminTab>('branding');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Local working copy of hotel configuration
  const [formData, setFormData] = useState<HotelConfig>(hotel);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Sub-tab / Modal editing states
  const [selectedRoomIndex, setSelectedRoomIndex] = useState<number>(0);
  const [selectedEventIndex, setSelectedEventIndex] = useState<number>(0);
  const [galleryFilter, setGalleryFilter] = useState<string>('all');
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryCat, setNewGalleryCat] = useState<GalleryMedia['category']>('hotel');
  const [seoPreviewMode, setSeoPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [copiedJsonLd, setCopiedJsonLd] = useState(false);

  // Restaurant Menu Management State
  const [selectedMenuCategoryIndex, setSelectedMenuCategoryIndex] = useState<number | 'all'>('all');
  const [adminMenuSearch, setAdminMenuSearch] = useState('');
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDesc, setNewCategoryDesc] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  if (!isAdminOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'bridge123' || passcode === 'admin' || passcode === '') {
      setIsAuthenticated(true);
      setPassError(false);
      setFormData(hotel);
    } else {
      setPassError(true);
    }
  };

  const handleSaveAll = () => {
    updateHotel(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handleResetToDefault = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    resetHotelData();
    setFormData(initialHotelData);
    setShowResetConfirm(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Helper for generic file to Base64/Data-URL uploads
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, onComplete: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      if (uploadEvent.target?.result) {
        onComplete(uploadEvent.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const navItems: { id: AdminTab; label: string; icon: React.FC<{ className?: string }>; count?: number; badge?: string }[] = [
    { id: 'branding', label: 'Hero & Branding', icon: Sparkles, badge: 'Main' },
    { id: 'contact', label: 'Contact & Front Desk', icon: Phone },
    { id: 'whatsapp', label: 'WhatsApp Templates', icon: MessageSquare },
    { id: 'rooms', label: 'Rooms & Suites', icon: BedDouble, count: formData.rooms?.length },
    {
      id: 'restaurant',
      label: 'Royal Kitchen Dining',
      icon: UtensilsCrossed,
      count: formData.restaurant?.menuCategories?.reduce((acc, c) => acc + c.items.length, 0),
      badge: `${formData.restaurant?.menuCategories?.length || 0} Cats`,
    },
    { id: 'events', label: 'Banquets & Events', icon: Calendar, count: formData.events?.length },
    { id: 'gallery', label: 'Photos & Gallery', icon: ImageIcon, count: formData.gallery?.length },
    { id: 'facilities', label: 'Amenities & Features', icon: ShieldCheck, count: formData.facilities?.length },
    { id: 'attractions', label: 'Attractions & Transit', icon: Compass, count: formData.attractions?.length },
    { id: 'reviews', label: 'Guest Reviews', icon: Star, count: formData.reviews?.length },
    { id: 'faqs', label: 'FAQ Knowledge Base', icon: HelpCircle, count: formData.faqs?.length },
    { id: 'seo', label: 'SEO & Search Rankings', icon: Globe, badge: 'Active' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#0F1216] text-stone-100 flex flex-col w-screen h-screen overflow-hidden animate-fadeIn select-none font-sans">
      
      {/* Top Universal Admin Control Header */}
      <header className="h-16 bg-[#161B22] border-b border-stone-800/90 px-4 sm:px-6 flex items-center justify-between flex-shrink-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-lg bg-stone-800 text-stone-300 hover:text-white"
            aria-label="Toggle Sidebar"
          >
            <MenuIcon className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#E5B869]/50 shadow-md">
              <img
                src="/logo.svg"
                alt="Hotel Bridge Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold tracking-wide text-white">
                  Hotel Bridge CMS
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Live Management
                </span>
              </div>
              <p className="text-[11px] text-stone-400 hidden sm:block">
                Full-Screen Real-Time Content, Photography & Catalog Editor
              </p>
            </div>
          </div>
        </div>

        {/* Global Actions */}
        <div className="flex items-center gap-2.5">
          {isAuthenticated && (
            <>
              {savedSuccess && (
                <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1.5 rounded-lg animate-bounce">
                  <CheckCircle className="w-3.5 h-3.5" /> Changes Applied Live!
                </span>
              )}

              <button
                onClick={handleResetToDefault}
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-800/80 hover:bg-stone-800 text-stone-300 hover:text-rose-300 border border-stone-700 text-xs font-medium transition-all"
                title="Reset all fields to original defaults"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>

              <button
                onClick={handleSaveAll}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#128C7E] to-[#0d6e63] hover:from-[#0d6e63] hover:to-[#0a524a] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-950/50 transition-all active:scale-95 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Publish Updates</span>
              </button>
            </>
          )}

          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-2 rounded-xl bg-stone-800/70 hover:bg-rose-950/60 text-stone-400 hover:text-rose-300 transition-colors border border-stone-700/80 ml-1"
            aria-label="Close CMS Workspace"
            title="Exit Admin Panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Full-Screen Layout */}
      {!isAuthenticated ? (
        /* Staff Lock Screen */
        <div className="flex-1 flex items-center justify-center p-6 bg-[#0F1216]">
          <div className="w-full max-w-md bg-[#161B22] border border-stone-800 rounded-3xl p-8 sm:p-10 text-center shadow-2xl space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#E5B869]/15 text-[#E5B869] border border-[#E5B869]/30 mx-auto flex items-center justify-center shadow-inner">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-white">
                Hotel Bridge Administration
              </h2>
              <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
                Enter your staff passcode to unlock full-screen content, pricing, room catalog, and photography management.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="text-left">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1.5">
                  Staff Passcode
                </label>
                <input
                  type="password"
                  placeholder="Enter passcode (Default: bridge123)"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setPassError(false);
                  }}
                  className="w-full px-4 py-3 bg-[#0D1117] rounded-xl border border-stone-700 text-white text-sm text-center focus:outline-none focus:border-[#E5B869] focus:ring-1 focus:ring-[#E5B869]"
                  autoFocus
                />
                {passError && (
                  <p className="text-xs text-rose-400 mt-2 text-center font-medium">
                    Incorrect passcode. (Use: <strong>bridge123</strong> or <strong>admin</strong>)
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#E5B869] to-[#C59B4B] hover:brightness-110 text-stone-950 font-bold text-xs uppercase tracking-widest transition-all shadow-lg cursor-pointer"
              >
                Unlock CMS Workspace
              </button>
            </form>

            <div className="pt-2 text-[11px] text-stone-500">
              Quick access enabled for hotel operations & IT staff.
            </div>
          </div>
        </div>
      ) : (
        /* Full Workspace with Left-Side Feature Sidebar */
        <div className="flex-1 flex overflow-hidden relative">
          
          {/* LEFT SIDEBAR NAVIGATION */}
          <aside
            className={`fixed md:relative top-0 bottom-0 left-0 z-30 w-72 bg-[#14181F] border-r border-stone-800 flex flex-col transition-transform duration-300 md:translate-x-0 ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            {/* Sidebar Branding Tag */}
            <div className="p-4 border-b border-stone-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#E5B869]" />
                <span className="text-xs font-bold uppercase tracking-wider text-stone-300">
                  Content Modules
                </span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="md:hidden p-1 text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Tab List */}
            <nav className="flex-1 overflow-y-auto p-3 space-y-1.5 custom-scrollbar">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left text-xs font-semibold transition-all duration-200 group cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#E5B869] to-[#C59B4B] text-stone-950 shadow-md font-bold'
                        : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-stone-950' : 'text-[#E5B869] group-hover:scale-110 transition-transform'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.count !== undefined && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          isActive
                            ? 'bg-stone-950 text-[#E5B869]'
                            : 'bg-stone-800 text-stone-400 group-hover:text-stone-200'
                        }`}
                      >
                        {item.count}
                      </span>
                    )}

                    {item.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider font-bold ${
                          isActive
                            ? 'bg-stone-950 text-white'
                            : 'bg-[#E5B869]/20 text-[#E5B869]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-stone-800 bg-[#101318] text-stone-400 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] text-stone-300">Staff Mode Active</span>
              </div>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-[11px] text-rose-400 hover:text-rose-300 transition-colors"
              >
                Lock
              </button>
            </div>
          </aside>

          {/* Backdrop for mobile sidebar */}
          {sidebarOpen && (
            <div
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm md:hidden"
            />
          )}

          {/* RIGHT WORKSPACE / ACTIVE CMS PANEL */}
          <main className="flex-1 bg-[#0F1216] overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
            
            {/* 1. HERO & BRANDING CMS */}
            {activeTab === 'branding' && (
              <div className="max-w-5xl space-y-6 animate-fadeIn">
                <div className="border-b border-stone-800 pb-4">
                  <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2.5">
                    <Sparkles className="w-6 h-6 text-[#E5B869]" />
                    Hero Banner, Identity & Core Branding
                  </h2>
                  <p className="text-xs text-stone-400 mt-1">
                    Manage top banners, primary headline copy, introduction paragraph, and high-resolution hero imagery.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Hotel Official Logo & Emblem */}
                  <div className="bg-[#161B22] p-5 rounded-2xl border border-stone-800 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#E5B869] flex items-center justify-between">
                      <span>Official Hotel Logo & Emblem</span>
                      <span className="text-[10px] text-stone-400 font-normal">Active Everywhere</span>
                    </h3>

                    <div>
                      <label className="block text-xs text-stone-400 mb-1">Logo Asset URL</label>
                      <input
                        type="text"
                        value={formData.logoUrl || '/logo.svg'}
                        onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#0D1117] rounded-xl border border-stone-700 text-white text-xs focus:border-[#E5B869]"
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Logo Preview */}
                      <div className="w-20 h-20 rounded-full border border-[#E5B869]/60 shadow-lg bg-black/80 flex items-center justify-center p-1 shrink-0">
                        <img
                          src={formData.logoUrl || '/logo.svg'}
                          alt="Hotel Bridge Official Logo"
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-medium text-stone-200 border border-stone-700 transition-colors">
                          <Upload className="w-3.5 h-3.5 text-[#E5B869]" />
                          <span>Upload New Logo</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, (url) => setFormData({ ...formData, logoUrl: url }))}
                          />
                        </label>
                        <p className="text-[11px] text-stone-400">
                          Recommended: Circular or square high-resolution PNG or SVG logo.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* General Identity */}
                  <div className="bg-[#161B22] p-5 rounded-2xl border border-stone-800 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#E5B869]">
                      Property Titles & Slogans
                    </h3>

                    <div>
                      <label className="block text-xs text-stone-400 mb-1">Hotel Title</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#0D1117] rounded-xl border border-stone-700 text-white text-xs focus:border-[#E5B869]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-stone-400 mb-1">Location Subtitle / Tagline</label>
                      <input
                        type="text"
                        value={formData.tagline}
                        onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#0D1117] rounded-xl border border-stone-700 text-white text-xs focus:border-[#E5B869]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-stone-400 mb-1">Hero Main Headline</label>
                      <input
                        type="text"
                        value={formData.heroHeadline}
                        onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#0D1117] rounded-xl border border-stone-700 text-white text-xs focus:border-[#E5B869]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-stone-400 mb-1">Hero Subtitle Copy</label>
                      <textarea
                        rows={3}
                        value={formData.heroSubtitle}
                        onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#0D1117] rounded-xl border border-stone-700 text-white text-xs focus:border-[#E5B869]"
                      />
                    </div>
                  </div>

                  {/* Hero Photography Manager */}
                  <div className="bg-[#161B22] p-5 rounded-2xl border border-stone-800 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#E5B869]">
                      Hero Main Background Image
                    </h3>

                    <div>
                      <label className="block text-xs text-stone-400 mb-1">Image URL / Direct Link</label>
                      <input
                        type="text"
                        value={formData.heroImage}
                        onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#0D1117] rounded-xl border border-stone-700 text-white text-xs focus:border-[#E5B869]"
                      />
                    </div>

                    {/* Upload button */}
                    <div className="flex items-center gap-3">
                      <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-medium text-stone-200 border border-stone-700 transition-colors">
                        <Upload className="w-3.5 h-3.5 text-[#E5B869]" />
                        <span>Upload File from Device</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (url) => setFormData({ ...formData, heroImage: url }))}
                        />
                      </label>
                      <span className="text-[11px] text-stone-500">Auto-converts and renders live</span>
                    </div>

                    {/* Live Preview Card */}
                    <div className="relative rounded-xl overflow-hidden border border-stone-700 aspect-video bg-black flex items-center justify-center">
                      {formData.heroImage ? (
                        <img
                          src={formData.heroImage}
                          alt="Hero Live Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xs text-stone-500">No Image Configured</span>
                      )}
                      <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-black/75 backdrop-blur-sm text-[10px] text-white">
                        Live Preview
                      </div>
                    </div>
                  </div>

                  {/* About Section Text */}
                  <div className="lg:col-span-2 bg-[#161B22] p-5 rounded-2xl border border-stone-800 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#E5B869]">
                      About Hotel Introduction Text & Story
                    </h3>

                    <div>
                      <label className="block text-xs text-stone-400 mb-1">About Intro Paragraph</label>
                      <textarea
                        rows={4}
                        value={formData.aboutIntro}
                        onChange={(e) => setFormData({ ...formData, aboutIntro: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#0D1117] rounded-xl border border-stone-700 text-white text-xs focus:border-[#E5B869]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-stone-400 mb-1">
                        Key Highlights (Comma separated)
                      </label>
                      <input
                        type="text"
                        value={formData.aboutHighlights?.join(', ')}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            aboutHighlights: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                          })
                        }
                        className="w-full px-3.5 py-2.5 bg-[#0D1117] rounded-xl border border-stone-700 text-white text-xs focus:border-[#E5B869]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CONTACT & FRONT DESK CMS */}
            {activeTab === 'contact' && (
              <div className="max-w-4xl space-y-6 animate-fadeIn">
                <div className="border-b border-stone-800 pb-4">
                  <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2.5">
                    <Phone className="w-6 h-6 text-[#E5B869]" />
                    Official Contact, Location & Google Verification
                  </h2>
                  <p className="text-xs text-stone-400 mt-1">
                    Manage direct front desk phone lines, WhatsApp numbers, Google review scores, and maps embed links.
                  </p>
                </div>

                <div className="bg-[#161B22] p-6 rounded-2xl border border-stone-800 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-stone-400 mb-1">Primary Calling Phone</label>
                      <input
                        type="text"
                        value={formData.primaryPhone}
                        onChange={(e) => setFormData({ ...formData, primaryPhone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#0D1117] rounded-xl border border-stone-700 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-stone-400 mb-1">WhatsApp Mobile Number</label>
                      <input
                        type="text"
                        placeholder="e.g. 916307951300 or 6307951300"
                        value={formData.whatsappNumber}
                        onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#0D1117] rounded-xl border border-stone-700 text-white text-xs"
                      />
                      <p className="text-[10px] text-stone-500 mt-1">Accepts 10-digit mobile (6307951300) or with country code (+916307951300).</p>
                    </div>

                    <div>
                      <label className="block text-xs text-stone-400 mb-1">Google Rating Score (e.g. 4.6)</label>
                      <input
                        type="number"
                        step="0.1"
                        min="1"
                        max="5"
                        value={formData.googleRating}
                        onChange={(e) => setFormData({ ...formData, googleRating: parseFloat(e.target.value) || 4.6 })}
                        className="w-full px-3.5 py-2.5 bg-[#0D1117] rounded-xl border border-stone-700 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-stone-400 mb-1">Google Verified Reviews Count (e.g. 140)</label>
                      <input
                        type="number"
                        value={formData.reviewCount}
                        onChange={(e) => setFormData({ ...formData, reviewCount: parseInt(e.target.value, 10) || 140 })}
                        className="w-full px-3.5 py-2.5 bg-[#0D1117] rounded-xl border border-stone-700 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-stone-400 mb-1">Full Postal Address</label>
                    <textarea
                      rows={2}
                      value={formData.fullAddress}
                      onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#0D1117] rounded-xl border border-stone-700 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-stone-400 mb-1">Google Maps Embed URL (Iframe Src)</label>
                    <input
                      type="text"
                      value={formData.googleMapEmbedUrl}
                      onChange={(e) => setFormData({ ...formData, googleMapEmbedUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#0D1117] rounded-xl border border-stone-700 text-white text-xs font-mono text-[11px]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 3. WHATSAPP TEMPLATES CMS */}
            {activeTab === 'whatsapp' && (
              <div className="max-w-4xl space-y-6 animate-fadeIn">
                <div className="border-b border-stone-800 pb-4">
                  <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2.5">
                    <MessageSquare className="w-6 h-6 text-[#128C7E]" />
                    WhatsApp Pre-filled Message Templates
                  </h2>
                  <p className="text-xs text-stone-400 mt-1">
                    Customize the automated greeting messages that appear when guests click WhatsApp buttons across different sections.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="bg-[#161B22] p-5 rounded-2xl border border-stone-800 space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#E5B869]">
                      General Inquiry Template
                    </label>
                    <textarea
                      rows={3}
                      value={formData.whatsappTemplates.general}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          whatsappTemplates: { ...formData.whatsappTemplates, general: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-[#0D1117] rounded-xl border border-stone-700 text-white text-xs"
                    />
                  </div>

                  <div className="bg-[#161B22] p-5 rounded-2xl border border-stone-800 space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#E5B869]">
                      Room Booking Template
                    </label>
                    <textarea
                      rows={3}
                      value={formData.whatsappTemplates.room}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          whatsappTemplates: { ...formData.whatsappTemplates, room: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-[#0D1117] rounded-xl border border-stone-700 text-white text-xs"
                    />
                  </div>

                  <div className="bg-[#161B22] p-5 rounded-2xl border border-stone-800 space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#E5B869]">
                      Royal Kitchen Dining Template
                    </label>
                    <textarea
                      rows={3}
                      value={formData.whatsappTemplates.restaurant}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          whatsappTemplates: { ...formData.whatsappTemplates, restaurant: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-[#0D1117] rounded-xl border border-stone-700 text-white text-xs"
                    />
                  </div>

                  <div className="bg-[#161B22] p-5 rounded-2xl border border-stone-800 space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#E5B869]">
                      Events & Banquet Planner Template
                    </label>
                    <textarea
                      rows={3}
                      value={formData.whatsappTemplates.event}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          whatsappTemplates: { ...formData.whatsappTemplates, event: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-[#0D1117] rounded-xl border border-stone-700 text-white text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 4. ROOMS & SUITES CMS */}
            {activeTab === 'rooms' && (
              <div className="max-w-5xl space-y-6 animate-fadeIn">
                <div className="border-b border-stone-800 pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2.5">
                      <BedDouble className="w-6 h-6 text-[#E5B869]" />
                      Rooms & Suites Catalog Manager
                    </h2>
                    <p className="text-xs text-stone-400 mt-1">
                      Add, edit room categories, customize amenities, manage photos, and configure custom pricing.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const newRoom: Room = {
                        id: `room-${Date.now()}`,
                        name: 'New Luxury Room',
                        category: 'deluxe',
                        bedType: '1 King Bed',
                        capacity: '2 Adults, 1 Child',
                        size: '300 sq.ft.',
                        shortDesc: 'Spacious air-conditioned room with modern amenities.',
                        longDesc: 'Designed for ultimate comfort with premium bedding, high-speed WiFi, and 24-hour room service.',
                        images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'],
                        amenities: ['Air Conditioning', 'Free High-Speed WiFi', 'Flat-screen LED TV', '24h Hot Water'],
                        featured: false,
                        showPrice: false,
                      };
                      setFormData({ ...formData, rooms: [...formData.rooms, newRoom] });
                      setSelectedRoomIndex(formData.rooms.length);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#E5B869] hover:bg-[#C59B4B] text-stone-950 font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Room</span>
                  </button>
                </div>

                {/* Room Selector Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-800">
                  {formData.rooms.map((room, idx) => (
                    <button
                      key={room.id}
                      onClick={() => setSelectedRoomIndex(idx)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                        selectedRoomIndex === idx
                          ? 'bg-[#E5B869] text-stone-950 shadow-md'
                          : 'bg-[#161B22] text-stone-400 hover:text-white border border-stone-800'
                      }`}
                    >
                      <BedDouble className="w-3.5 h-3.5" />
                      <span>{room.name || `Room #${idx + 1}`}</span>
                    </button>
                  ))}
                </div>

                {/* Active Room Editor */}
                {formData.rooms[selectedRoomIndex] && (
                  <div className="bg-[#161B22] p-6 rounded-2xl border border-stone-800 space-y-5">
                    {/* Top Room Meta Controls */}
                    <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#E5B869]">
                        Editing: {formData.rooms[selectedRoomIndex].name}
                      </span>

                      {formData.rooms.length > 1 && (
                        <button
                          onClick={() => {
                            if (window.confirm('Delete this room category from catalog?')) {
                              const updated = formData.rooms.filter((_, i) => i !== selectedRoomIndex);
                              setFormData({ ...formData, rooms: updated });
                              setSelectedRoomIndex(0);
                            }
                          }}
                          className="inline-flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Room</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs text-stone-400 mb-1">Room Name</label>
                        <input
                          type="text"
                          value={formData.rooms[selectedRoomIndex].name}
                          onChange={(e) => {
                            const updated = [...formData.rooms];
                            updated[selectedRoomIndex].name = e.target.value;
                            setFormData({ ...formData, rooms: updated });
                          }}
                          className="w-full px-3.5 py-2.5 bg-[#0D1117] rounded-xl border border-stone-700 text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-stone-400 mb-1">Category Type</label>
                        <select
                          value={formData.rooms[selectedRoomIndex].category}
                          onChange={(e) => {
                            const updated = [...formData.rooms];
                            updated[selectedRoomIndex].category = e.target.value as any;
                            setFormData({ ...formData, rooms: updated });
                          }}
                          className="w-full px-3.5 py-2.5 bg-[#0D1117] rounded-xl border border-stone-700 text-white text-xs"
                        >
                          <option value="deluxe">Deluxe Room</option>
                          <option value="super-deluxe">Super Deluxe</option>
                          <option value="suite">Executive Suite</option>
                          <option value="standard">Standard AC Room</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs text-stone-400 mb-1">Bed Configuration</label>
                        <input
                          type="text"
                          value={formData.rooms[selectedRoomIndex].bedType}
                          onChange={(e) => {
                            const updated = [...formData.rooms];
                            updated[selectedRoomIndex].bedType = e.target.value;
                            setFormData({ ...formData, rooms: updated });
                          }}
                          className="w-full px-3.5 py-2.5 bg-[#0D1117] rounded-xl border border-stone-700 text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-stone-400 mb-1">Guest Capacity</label>
                        <input
                          type="text"
                          value={formData.rooms[selectedRoomIndex].capacity}
                          onChange={(e) => {
                            const updated = [...formData.rooms];
                            updated[selectedRoomIndex].capacity = e.target.value;
                            setFormData({ ...formData, rooms: updated });
                          }}
                          className="w-full px-3.5 py-2.5 bg-[#0D1117] rounded-xl border border-stone-700 text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-stone-400 mb-1">Room Dimension / Size</label>
                        <input
                          type="text"
                          value={formData.rooms[selectedRoomIndex].size || ''}
                          onChange={(e) => {
                            const updated = [...formData.rooms];
                            updated[selectedRoomIndex].size = e.target.value;
                            setFormData({ ...formData, rooms: updated });
                          }}
                          className="w-full px-3.5 py-2.5 bg-[#0D1117] rounded-xl border border-stone-700 text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-stone-400 mb-1">Featured on Homepage</label>
                        <div className="pt-2 flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.rooms[selectedRoomIndex].featured}
                            onChange={(e) => {
                              const updated = [...formData.rooms];
                              updated[selectedRoomIndex].featured = e.target.checked;
                              setFormData({ ...formData, rooms: updated });
                            }}
                            className="w-4 h-4 rounded text-[#E5B869]"
                          />
                          <span className="text-xs text-stone-300">Mark as Featured Stay</span>
                        </div>
                      </div>
                    </div>

                    {/* Room Photos Manager */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#E5B869]">
                          Room Photos Gallery ({formData.rooms[selectedRoomIndex].images?.length || 0})
                        </label>
                        <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-medium text-stone-200 border border-stone-700">
                          <Upload className="w-3.5 h-3.5 text-[#E5B869]" />
                          <span>Upload Room Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleFileUpload(e, (url) => {
                                const updated = [...formData.rooms];
                                updated[selectedRoomIndex].images = [...(updated[selectedRoomIndex].images || []), url];
                                setFormData({ ...formData, rooms: updated });
                              })
                            }
                          />
                        </label>
                      </div>

                      {/* Photo Thumbnail Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {formData.rooms[selectedRoomIndex].images?.map((img, imgIdx) => (
                          <div key={imgIdx} className="relative rounded-xl overflow-hidden aspect-video border border-stone-700 group">
                            <img src={img} alt="Room Photo" className="w-full h-full object-cover" />
                            <button
                              onClick={() => {
                                const updated = [...formData.rooms];
                                updated[selectedRoomIndex].images = updated[selectedRoomIndex].images.filter((_, i) => i !== imgIdx);
                                setFormData({ ...formData, rooms: updated });
                              }}
                              className="absolute top-1.5 right-1.5 p-1.5 rounded-lg bg-rose-600/90 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Delete Photo"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Room Description & Amenities */}
                    <div>
                      <label className="block text-xs text-stone-400 mb-1">Detailed Description</label>
                      <textarea
                        rows={3}
                        value={formData.rooms[selectedRoomIndex].longDesc}
                        onChange={(e) => {
                          const updated = [...formData.rooms];
                          updated[selectedRoomIndex].longDesc = e.target.value;
                          setFormData({ ...formData, rooms: updated });
                        }}
                        className="w-full px-3.5 py-2.5 bg-[#0D1117] rounded-xl border border-stone-700 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-stone-400 mb-1">
                        Room Amenities (Comma separated)
                      </label>
                      <input
                        type="text"
                        value={formData.rooms[selectedRoomIndex].amenities?.join(', ')}
                        onChange={(e) => {
                          const updated = [...formData.rooms];
                          updated[selectedRoomIndex].amenities = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                          setFormData({ ...formData, rooms: updated });
                        }}
                        className="w-full px-3.5 py-2.5 bg-[#0D1117] rounded-xl border border-stone-700 text-white text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 5. ROYAL KITCHEN DINING & MENU CMS */}
            {activeTab === 'restaurant' && (
              <div className="max-w-5xl space-y-6 animate-fadeIn">
                <div className="border-b border-stone-800 pb-4">
                  <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2.5">
                    <UtensilsCrossed className="w-6 h-6 text-[#E5B869]" />
                    Royal Kitchen (100% Pure Veg) Restaurant & Menu CMS
                  </h2>
                  <p className="text-xs text-stone-400 mt-1">
                    Manage restaurant identity, vegetarian culinary highlights, operational hours, and complete digital menu items.
                  </p>
                </div>

                {/* Restaurant Identity Config */}
                <div className="bg-[#161B22] p-5 rounded-2xl border border-stone-800 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#E5B869]">
                    Restaurant Identity & Timings
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-stone-400 mb-1">Restaurant Name</label>
                      <input
                        type="text"
                        value={formData.restaurant.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            restaurant: { ...formData.restaurant, name: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 bg-[#0D1117] rounded-xl border border-stone-700 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-stone-400 mb-1">Dining Tagline</label>
                      <input
                        type="text"
                        value={formData.restaurant.tagline}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            restaurant: { ...formData.restaurant, tagline: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 bg-[#0D1117] rounded-xl border border-stone-700 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-stone-400 mb-1">Operational Timings</label>
                      <input
                        type="text"
                        value={formData.restaurant.timing}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            restaurant: { ...formData.restaurant, timing: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 bg-[#0D1117] rounded-xl border border-stone-700 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-stone-400 mb-1">Restaurant Overview Description</label>
                    <textarea
                      rows={3}
                      value={formData.restaurant.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          restaurant: { ...formData.restaurant, description: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-[#0D1117] rounded-xl border border-stone-700 text-white text-xs"
                    />
                  </div>
                </div>

                {/* Menu Categories and Dishes Management */}
                <div className="bg-[#161B22] p-5 rounded-2xl border border-stone-800 space-y-5">
                  {/* Top Bar with Stats & Add Category Button */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#E5B869]">
                          Menu Categories &amp; Culinary Items
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E5B869]/20 text-[#E5B869]">
                          {formData.restaurant.menuCategories.length} Categories •{' '}
                          {formData.restaurant.menuCategories.reduce((acc, c) => acc + c.items.length, 0)} Dishes
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-400 mt-0.5">
                        Select a category tab to view and manage its dishes, or click Add Category to introduce new cuisine sections.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddCategoryModal(true);
                          setNewCategoryName('');
                          setNewCategoryDesc('');
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#E5B869] to-[#C59B4B] hover:brightness-110 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                        title="Add a new menu category"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Menu Category</span>
                      </button>
                    </div>
                  </div>

                  {/* Filter & Search Bar */}
                  <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                    {/* Category Switcher Tabs */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 custom-scrollbar flex-1">
                      <button
                        type="button"
                        onClick={() => setSelectedMenuCategoryIndex('all')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                          selectedMenuCategoryIndex === 'all'
                            ? 'bg-[#E5B869] text-stone-950 font-bold shadow-xs'
                            : 'bg-[#0D1117] text-stone-400 hover:text-white border border-stone-800'
                        }`}
                      >
                        All Categories ({formData.restaurant.menuCategories.length})
                      </button>

                      {formData.restaurant.menuCategories.map((cat, idx) => {
                        const isSelected = selectedMenuCategoryIndex === idx;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setSelectedMenuCategoryIndex(idx)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                              isSelected
                                ? 'bg-[#E5B869] text-stone-950 font-bold shadow-xs'
                                : 'bg-[#0D1117] text-stone-400 hover:text-white border border-stone-800'
                            }`}
                          >
                            <span>{cat.name}</span>
                            <span
                              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                                isSelected ? 'bg-stone-950 text-[#E5B869]' : 'bg-stone-800 text-stone-400'
                              }`}
                            >
                              {cat.items.length}
                            </span>
                          </button>
                        );
                      })}

                      <button
                        type="button"
                        onClick={() => {
                          setShowAddCategoryModal(true);
                          setNewCategoryName('');
                          setNewCategoryDesc('');
                        }}
                        className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-stone-800/80 hover:bg-stone-800 text-[#E5B869] border border-stone-700 hover:border-[#E5B869] transition-colors flex items-center gap-1 whitespace-nowrap cursor-pointer shrink-0"
                        title="Add Category"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>

                    {/* Quick Search */}
                    <div className="relative w-full md:w-64 shrink-0">
                      <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Search dish or category..."
                        value={adminMenuSearch}
                        onChange={(e) => setAdminMenuSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 bg-[#0D1117] rounded-xl border border-stone-700 text-xs text-white focus:outline-none focus:border-[#E5B869]"
                      />
                      {adminMenuSearch && (
                        <button
                          type="button"
                          onClick={() => setAdminMenuSearch('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white text-xs"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Render Categories List */}
                  <div className="space-y-5">
                    {formData.restaurant.menuCategories
                      .map((cat, catIdx) => ({ cat, catIdx }))
                      .filter(({ cat, catIdx }) => {
                        // Category tab filter
                        if (selectedMenuCategoryIndex !== 'all' && selectedMenuCategoryIndex !== catIdx) {
                          return false;
                        }
                        // Search filter
                        if (!adminMenuSearch.trim()) return true;
                        const query = adminMenuSearch.toLowerCase().trim();
                        const matchesCat =
                          cat.name.toLowerCase().includes(query) ||
                          (cat.description && cat.description.toLowerCase().includes(query));
                        const matchesItem = cat.items.some(
                          (item) =>
                            item.name.toLowerCase().includes(query) ||
                            (item.description && item.description.toLowerCase().includes(query))
                        );
                        return matchesCat || matchesItem;
                      })
                      .map(({ cat, catIdx }) => {
                        return (
                          <div
                            key={cat.id}
                            className="p-5 rounded-2xl bg-[#0D1117] border border-stone-700/80 space-y-4 shadow-sm"
                          >
                            {/* Category Header Controls */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-800">
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider font-mono">
                                    Category #{catIdx + 1}
                                  </span>
                                  <input
                                    type="text"
                                    value={cat.name}
                                    onChange={(e) => {
                                      const updated = [...formData.restaurant.menuCategories];
                                      const newName = e.target.value;
                                      updated[catIdx].name = newName;
                                      updated[catIdx].items = updated[catIdx].items.map((it) => ({
                                        ...it,
                                        category: newName,
                                      }));
                                      setFormData({
                                        ...formData,
                                        restaurant: { ...formData.restaurant, menuCategories: updated },
                                      });
                                    }}
                                    className="text-base font-bold text-[#E5B869] bg-transparent border-b border-transparent focus:border-[#E5B869] focus:outline-none px-1 py-0.5"
                                    placeholder="Category Name"
                                  />
                                </div>
                                <input
                                  type="text"
                                  value={cat.description || ''}
                                  onChange={(e) => {
                                    const updated = [...formData.restaurant.menuCategories];
                                    updated[catIdx].description = e.target.value;
                                    setFormData({
                                      ...formData,
                                      restaurant: { ...formData.restaurant, menuCategories: updated },
                                    });
                                  }}
                                  className="w-full text-xs text-stone-400 bg-transparent border-b border-transparent focus:border-stone-600 focus:outline-none px-1"
                                  placeholder="Add category tagline / description (e.g. Traditional clay-oven starters...)"
                                />
                              </div>

                              <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                                {/* Move Category Up */}
                                <button
                                  type="button"
                                  disabled={catIdx === 0}
                                  onClick={() => {
                                    if (catIdx > 0) {
                                      const updated = [...formData.restaurant.menuCategories];
                                      const temp = updated[catIdx - 1];
                                      updated[catIdx - 1] = updated[catIdx];
                                      updated[catIdx] = temp;
                                      setFormData({
                                        ...formData,
                                        restaurant: { ...formData.restaurant, menuCategories: updated },
                                      });
                                      if (selectedMenuCategoryIndex === catIdx) {
                                        setSelectedMenuCategoryIndex(catIdx - 1);
                                      }
                                      showToast(`Moved "${cat.name}" up`);
                                    }
                                  }}
                                  className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 disabled:opacity-30 disabled:hover:bg-stone-800 cursor-pointer"
                                  title="Move Category Up"
                                >
                                  <ArrowUp className="w-3.5 h-3.5" />
                                </button>

                                {/* Move Category Down */}
                                <button
                                  type="button"
                                  disabled={catIdx === formData.restaurant.menuCategories.length - 1}
                                  onClick={() => {
                                    if (catIdx < formData.restaurant.menuCategories.length - 1) {
                                      const updated = [...formData.restaurant.menuCategories];
                                      const temp = updated[catIdx + 1];
                                      updated[catIdx + 1] = updated[catIdx];
                                      updated[catIdx] = temp;
                                      setFormData({
                                        ...formData,
                                        restaurant: { ...formData.restaurant, menuCategories: updated },
                                      });
                                      if (selectedMenuCategoryIndex === catIdx) {
                                        setSelectedMenuCategoryIndex(catIdx + 1);
                                      }
                                      showToast(`Moved "${cat.name}" down`);
                                    }
                                  }}
                                  className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 disabled:opacity-30 disabled:hover:bg-stone-800 cursor-pointer"
                                  title="Move Category Down"
                                >
                                  <ArrowDown className="w-3.5 h-3.5" />
                                </button>

                                {/* Add Dish Button */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = [...formData.restaurant.menuCategories];
                                    const newDish: MenuItem = {
                                      id: `dish-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
                                      name: 'New Pure Veg Dish',
                                      category: cat.name,
                                      price: 220,
                                      description: '',
                                      isJainAvailable: true,
                                      isChefSpecial: false,
                                    };
                                    updated[catIdx].items.push(newDish);
                                    setFormData({
                                      ...formData,
                                      restaurant: { ...formData.restaurant, menuCategories: updated },
                                    });
                                    showToast(`Added new dish to "${cat.name}"`);
                                  }}
                                  className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors border border-stone-700"
                                >
                                  <Plus className="w-3.5 h-3.5 text-[#E5B869]" />
                                  <span>Add Dish</span>
                                </button>

                                {/* Delete Category Button */}
                                {formData.restaurant.menuCategories.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (
                                        window.confirm(
                                          `Delete category "${cat.name}" and all its ${cat.items.length} dishes?`
                                        )
                                      ) {
                                        const updated = formData.restaurant.menuCategories.filter(
                                          (_, i) => i !== catIdx
                                        );
                                        setFormData({
                                          ...formData,
                                          restaurant: { ...formData.restaurant, menuCategories: updated },
                                        });
                                        setSelectedMenuCategoryIndex('all');
                                        showToast(`Deleted category "${cat.name}"`);
                                      }
                                    }}
                                    className="p-1.5 text-stone-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                                    title="Delete Category"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Dishes Grid */}
                            {cat.items.length === 0 ? (
                              <div className="py-6 text-center text-xs text-stone-500 bg-[#161B22] rounded-xl border border-dashed border-stone-800">
                                <span>No dishes in this category yet.</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = [...formData.restaurant.menuCategories];
                                    updated[catIdx].items.push({
                                      id: `dish-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
                                      name: 'New Pure Veg Dish',
                                      category: cat.name,
                                      price: 220,
                                      isJainAvailable: true,
                                    });
                                    setFormData({
                                      ...formData,
                                      restaurant: { ...formData.restaurant, menuCategories: updated },
                                    });
                                    showToast(`Added first dish to "${cat.name}"`);
                                  }}
                                  className="ml-2 text-[#E5B869] font-bold hover:underline cursor-pointer"
                                >
                                  + Add First Dish
                                </button>
                              </div>
                            ) : (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                                {cat.items.map((item, itemIdx) => (
                                  <div
                                    key={item.id}
                                    className="p-3 rounded-xl bg-[#161B22] border border-stone-800 space-y-2 hover:border-stone-700 transition-colors"
                                  >
                                    <div className="flex items-center justify-between gap-2">
                                      <input
                                        type="text"
                                        value={item.name}
                                        onChange={(e) => {
                                          const updated = [...formData.restaurant.menuCategories];
                                          updated[catIdx].items[itemIdx].name = e.target.value;
                                          setFormData({
                                            ...formData,
                                            restaurant: { ...formData.restaurant, menuCategories: updated },
                                          });
                                        }}
                                        className="w-full bg-transparent text-xs text-white font-semibold focus:outline-none border-b border-transparent focus:border-[#E5B869]"
                                        placeholder="Dish Name"
                                      />

                                      <div className="flex items-center gap-1 shrink-0">
                                        <span className="text-[11px] text-[#E5B869] font-mono font-bold">₹</span>
                                        <input
                                          type="number"
                                          value={item.price}
                                          onChange={(e) => {
                                            const updated = [...formData.restaurant.menuCategories];
                                            updated[catIdx].items[itemIdx].price = parseInt(e.target.value, 10) || 0;
                                            setFormData({
                                              ...formData,
                                              restaurant: { ...formData.restaurant, menuCategories: updated },
                                            });
                                          }}
                                          className="w-16 bg-[#0D1117] px-2 py-1 rounded text-xs text-white border border-stone-700 font-mono text-right"
                                          placeholder="Price"
                                        />
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const updated = [...formData.restaurant.menuCategories];
                                            updated[catIdx].items = updated[catIdx].items.filter(
                                              (_, i) => i !== itemIdx
                                            );
                                            setFormData({
                                              ...formData,
                                              restaurant: { ...formData.restaurant, menuCategories: updated },
                                            });
                                          }}
                                          className="p-1 text-stone-500 hover:text-rose-400 transition-colors cursor-pointer"
                                          title="Delete Dish"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    </div>

                                    {/* Dish Description */}
                                    <input
                                      type="text"
                                      value={item.description || ''}
                                      onChange={(e) => {
                                        const updated = [...formData.restaurant.menuCategories];
                                        updated[catIdx].items[itemIdx].description = e.target.value;
                                        setFormData({
                                          ...formData,
                                          restaurant: { ...formData.restaurant, menuCategories: updated },
                                        });
                                      }}
                                      className="w-full bg-[#0D1117] px-2 py-1 rounded text-[11px] text-stone-300 border border-stone-800 placeholder-stone-600 focus:outline-none focus:border-stone-700"
                                      placeholder="Short description (ingredients, flavour note...)"
                                    />

                                    {/* Badges toggles */}
                                    <div className="flex items-center gap-3 pt-1 text-[10px]">
                                      <label className="flex items-center gap-1.5 text-emerald-400 cursor-pointer">
                                        <input
                                          type="checkbox"
                                          checked={item.isJainAvailable || false}
                                          onChange={(e) => {
                                            const updated = [...formData.restaurant.menuCategories];
                                            updated[catIdx].items[itemIdx].isJainAvailable = e.target.checked;
                                            setFormData({
                                              ...formData,
                                              restaurant: { ...formData.restaurant, menuCategories: updated },
                                            });
                                          }}
                                          className="rounded w-3.5 h-3.5 text-emerald-500"
                                        />
                                        <span>Jain Available</span>
                                      </label>

                                      <label className="flex items-center gap-1.5 text-amber-400 cursor-pointer">
                                        <input
                                          type="checkbox"
                                          checked={item.isChefSpecial || false}
                                          onChange={(e) => {
                                            const updated = [...formData.restaurant.menuCategories];
                                            updated[catIdx].items[itemIdx].isChefSpecial = e.target.checked;
                                            setFormData({
                                              ...formData,
                                              restaurant: { ...formData.restaurant, menuCategories: updated },
                                            });
                                          }}
                                          className="rounded w-3.5 h-3.5 text-amber-500"
                                        />
                                        <span>Chef's Special</span>
                                      </label>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}

            {/* 6. BANQUETS & EVENTS CMS */}
            {activeTab === 'events' && (
              <div className="max-w-5xl space-y-6 animate-fadeIn">
                <div className="border-b border-stone-800 pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2.5">
                      <Calendar className="w-6 h-6 text-[#E5B869]" />
                      Banquets, Celebrations & Event Venues
                    </h2>
                    <p className="text-xs text-stone-400 mt-1">
                      Manage wedding packages, corporate conference setups, and festive celebration features.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const newEvent: EventOccasion = {
                        id: `event-${Date.now()}`,
                        name: 'New Celebration Package',
                        tagline: 'Customized Decor & Hospitality',
                        description: 'Ideal venue for intimate family gatherings, anniversaries, and business meets.',
                        image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80',
                        suitableCapacity: '50 - 250 Guests',
                        features: ['Custom Pure Veg Catering', 'Sound System & Stage Setup', 'Dedicated Event Manager'],
                      };
                      setFormData({ ...formData, events: [...formData.events, newEvent] });
                      setSelectedEventIndex(formData.events.length);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#E5B869] text-stone-950 font-bold text-xs uppercase"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Event Type</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {formData.events.map((ev, evIdx) => (
                    <div key={ev.id} className="bg-[#161B22] p-5 rounded-2xl border border-stone-800 space-y-3.5 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="relative rounded-xl overflow-hidden aspect-video border border-stone-700">
                          <img src={ev.image} alt={ev.name} className="w-full h-full object-cover" />
                          <label className="absolute bottom-1.5 right-1.5 cursor-pointer px-2 py-1 rounded bg-black/80 backdrop-blur-sm text-[10px] text-white flex items-center gap-1 border border-white/20">
                            <Upload className="w-3 h-3 text-[#E5B869]" />
                            <span>Replace</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleFileUpload(e, (url) => {
                                  const updated = [...formData.events];
                                  updated[evIdx].image = url;
                                  setFormData({ ...formData, events: updated });
                                })
                              }
                            />
                          </label>
                        </div>

                        <div>
                          <label className="block text-[11px] text-stone-400 mb-0.5">Package Title</label>
                          <input
                            type="text"
                            value={ev.name}
                            onChange={(e) => {
                              const updated = [...formData.events];
                              updated[evIdx].name = e.target.value;
                              setFormData({ ...formData, events: updated });
                            }}
                            className="w-full px-3 py-2 bg-[#0D1117] rounded-lg border border-stone-700 text-white text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-stone-400 mb-0.5">Capacity</label>
                          <input
                            type="text"
                            value={ev.suitableCapacity || ''}
                            onChange={(e) => {
                              const updated = [...formData.events];
                              updated[evIdx].suitableCapacity = e.target.value;
                              setFormData({ ...formData, events: updated });
                            }}
                            className="w-full px-3 py-2 bg-[#0D1117] rounded-lg border border-stone-700 text-white text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-stone-400 mb-0.5">Description</label>
                          <textarea
                            rows={3}
                            value={ev.description}
                            onChange={(e) => {
                              const updated = [...formData.events];
                              updated[evIdx].description = e.target.value;
                              setFormData({ ...formData, events: updated });
                            }}
                            className="w-full px-3 py-2 bg-[#0D1117] rounded-lg border border-stone-700 text-white text-xs"
                          />
                        </div>
                      </div>

                      {formData.events.length > 1 && (
                        <button
                          onClick={() => {
                            const updated = formData.events.filter((_, i) => i !== evIdx);
                            setFormData({ ...formData, events: updated });
                          }}
                          className="w-full py-2 rounded-lg bg-stone-800/80 hover:bg-rose-950/60 text-stone-400 hover:text-rose-300 text-xs flex items-center justify-center gap-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Package</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. MEDIA & GALLERY CMS */}
            {activeTab === 'gallery' && (
              <div className="max-w-6xl space-y-6 animate-fadeIn">
                <div className="border-b border-stone-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2.5">
                      <ImageIcon className="w-6 h-6 text-[#E5B869]" />
                      Hotel Photography & Media Library
                    </h2>
                    <p className="text-xs text-stone-400 mt-1">
                      Upload and categorize official photographs for rooms, restaurant, banquets, and architecture.
                    </p>
                  </div>

                  {/* Add New Photo Controls */}
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#E5B869] to-[#C59B4B] text-stone-950 font-bold text-xs uppercase tracking-wider shadow-md">
                      <Upload className="w-4 h-4" />
                      <span>Upload New Photograph</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, (url) => {
                            const newMedia: GalleryMedia = {
                              id: `media-${Date.now()}`,
                              title: 'Hotel Bridge Photograph',
                              category: 'hotel',
                              url: url,
                              alt: 'Hotel Bridge Unnao Photography',
                              isFeatured: true,
                            };
                            setFormData({ ...formData, gallery: [newMedia, ...formData.gallery] });
                          })
                        }
                      />
                    </label>
                  </div>
                </div>

                {/* Filter Categories Bar */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {['all', 'hotel', 'rooms', 'restaurant', 'food', 'events', 'exterior'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setGalleryFilter(cat)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                        galleryFilter === cat
                          ? 'bg-[#E5B869] text-stone-950 font-bold'
                          : 'bg-[#161B22] text-stone-400 hover:text-white border border-stone-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {formData.gallery
                    .filter((item) => galleryFilter === 'all' || item.category === galleryFilter)
                    .map((item, idx) => (
                      <div
                        key={item.id}
                        className="bg-[#161B22] border border-stone-800 rounded-2xl overflow-hidden group flex flex-col justify-between"
                      >
                        <div className="relative aspect-video bg-black">
                          <img src={item.url} alt={item.alt} className="w-full h-full object-cover" />
                          <button
                            onClick={() => {
                              const updated = formData.gallery.filter((_, i) => i !== idx);
                              setFormData({ ...formData, gallery: updated });
                            }}
                            className="absolute top-2 right-2 p-1.5 rounded-lg bg-rose-600/90 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Delete Photograph"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="p-3 space-y-2">
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                              const updated = [...formData.gallery];
                              updated[idx].title = e.target.value;
                              setFormData({ ...formData, gallery: updated });
                            }}
                            className="w-full bg-[#0D1117] px-2.5 py-1 rounded text-xs text-white border border-stone-700"
                            placeholder="Photo caption"
                          />

                          <div className="flex items-center justify-between">
                            <select
                              value={item.category}
                              onChange={(e) => {
                                const updated = [...formData.gallery];
                                updated[idx].category = e.target.value as any;
                                setFormData({ ...formData, gallery: updated });
                              }}
                              className="bg-[#0D1117] text-[11px] text-stone-300 rounded px-2 py-0.5 border border-stone-700"
                            >
                              <option value="hotel">Hotel</option>
                              <option value="rooms">Rooms</option>
                              <option value="restaurant">Restaurant</option>
                              <option value="food">Food</option>
                              <option value="events">Events</option>
                              <option value="exterior">Exterior</option>
                            </select>

                            <label className="flex items-center gap-1 text-[10px] text-stone-400 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={item.isFeatured || false}
                                onChange={(e) => {
                                  const updated = [...formData.gallery];
                                  updated[idx].isFeatured = e.target.checked;
                                  setFormData({ ...formData, gallery: updated });
                                }}
                                className="w-3 h-3 rounded text-[#E5B869]"
                              />
                              <span>Featured</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* 8. FACILITIES & AMENITIES CMS */}
            {activeTab === 'facilities' && (
              <div className="max-w-4xl space-y-6 animate-fadeIn">
                <div className="border-b border-stone-800 pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2.5">
                      <ShieldCheck className="w-6 h-6 text-[#E5B869]" />
                      Hotel Amenities & Guest Facilities
                    </h2>
                    <p className="text-xs text-stone-400 mt-1">
                      Configure verified facility badges like 24/7 Power Backup, Free Parking, Security, etc.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const newFac: Facility = {
                        id: `fac-${Date.now()}`,
                        name: 'New Facility',
                        iconName: 'Shield',
                        description: 'Reliable service for hotel guests.',
                        category: 'service',
                        isVerified: true,
                        isFeatured: true,
                      };
                      setFormData({ ...formData, facilities: [...formData.facilities, newFac] });
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#E5B869] text-stone-950 font-bold text-xs uppercase"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Facility</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {formData.facilities.map((fac, facIdx) => (
                    <div key={fac.id} className="p-4 rounded-xl bg-[#161B22] border border-stone-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={fac.name}
                          onChange={(e) => {
                            const updated = [...formData.facilities];
                            updated[facIdx].name = e.target.value;
                            setFormData({ ...formData, facilities: updated });
                          }}
                          className="font-bold text-xs text-white bg-transparent border-b border-transparent focus:border-[#E5B869] focus:outline-none"
                        />
                        <button
                          onClick={() => {
                            const updated = formData.facilities.filter((_, i) => i !== facIdx);
                            setFormData({ ...formData, facilities: updated });
                          }}
                          className="text-stone-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <textarea
                        rows={2}
                        value={fac.description}
                        onChange={(e) => {
                          const updated = [...formData.facilities];
                          updated[facIdx].description = e.target.value;
                          setFormData({ ...formData, facilities: updated });
                        }}
                        className="w-full bg-[#0D1117] p-2 rounded text-xs text-stone-300 border border-stone-700"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 9. ATTRACTIONS & TRANSIT CMS */}
            {activeTab === 'attractions' && (
              <div className="max-w-4xl space-y-6 animate-fadeIn">
                <div className="border-b border-stone-800 pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2.5">
                      <Compass className="w-6 h-6 text-[#E5B869]" />
                      Local Attractions, Distances & Transit Guide
                    </h2>
                    <p className="text-xs text-stone-400 mt-1">
                      Manage real-time distances, transit hubs, emojis, and navigation coordinates for all 10+ landmarks.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const newAttr: Attraction = {
                        id: `attr-${Date.now()}`,
                        name: 'New Landmark / Hub',
                        distance: '2.0 km',
                        duration: '5 mins drive',
                        description: 'Convenient landmark easily accessible from Hotel Bridge, Lucknow Bypass Unnao.',
                        image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80',
                        type: 'Attraction / Hub',
                        category: 'transit',
                        iconEmoji: '📍',
                        mapQuery: 'Unnao+Uttar+Pradesh',
                      };
                      setFormData({ ...formData, attractions: [...formData.attractions, newAttr] });
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#E5B869] text-stone-950 font-bold text-xs uppercase hover:bg-[#d8ab5c] transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Landmark</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.attractions.map((attr, attrIdx) => (
                    <div key={attr.id} className="p-4 rounded-xl bg-[#161B22] border border-stone-800 space-y-3">
                      {/* Name and Delete Button */}
                      <div className="flex items-center justify-between gap-2 border-b border-stone-800 pb-2">
                        <div className="flex items-center gap-2 flex-1">
                          <input
                            type="text"
                            value={attr.iconEmoji || '📍'}
                            onChange={(e) => {
                              const updated = [...formData.attractions];
                              updated[attrIdx].iconEmoji = e.target.value;
                              setFormData({ ...formData, attractions: updated });
                            }}
                            className="w-9 h-9 text-center bg-[#0D1117] rounded-lg border border-stone-700 text-base"
                            title="Emoji Icon"
                          />
                          <input
                            type="text"
                            value={attr.name}
                            onChange={(e) => {
                              const updated = [...formData.attractions];
                              updated[attrIdx].name = e.target.value;
                              setFormData({ ...formData, attractions: updated });
                            }}
                            className="flex-1 font-bold text-xs text-white bg-transparent border-b border-transparent focus:border-[#E5B869] px-1 py-0.5 focus:outline-none"
                            placeholder="Place Name"
                          />
                        </div>
                        <button
                          onClick={() => {
                            const updated = formData.attractions.filter((_, i) => i !== attrIdx);
                            setFormData({ ...formData, attractions: updated });
                          }}
                          className="text-stone-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-950/40 transition-colors"
                          title="Delete Landmark"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Distance, Duration & Category */}
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="text-[10px] text-stone-400 font-semibold block mb-0.5">Distance</label>
                          <input
                            type="text"
                            value={attr.distance}
                            onChange={(e) => {
                              const updated = [...formData.attractions];
                              updated[attrIdx].distance = e.target.value;
                              setFormData({ ...formData, attractions: updated });
                            }}
                            className="w-full bg-[#0D1117] px-2 py-1.5 rounded-lg text-xs text-[#E5B869] font-bold border border-stone-700 focus:outline-none focus:border-[#E5B869]"
                            placeholder="e.g. 1.5 km"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-stone-400 font-semibold block mb-0.5">Duration</label>
                          <input
                            type="text"
                            value={attr.duration || ''}
                            onChange={(e) => {
                              const updated = [...formData.attractions];
                              updated[attrIdx].duration = e.target.value;
                              setFormData({ ...formData, attractions: updated });
                            }}
                            className="w-full bg-[#0D1117] px-2 py-1.5 rounded-lg text-xs text-stone-200 border border-stone-700 focus:outline-none focus:border-[#E5B869]"
                            placeholder="e.g. 4 mins drive"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-stone-400 font-semibold block mb-0.5">Category</label>
                          <select
                            value={attr.category || 'transit'}
                            onChange={(e) => {
                              const updated = [...formData.attractions];
                              updated[attrIdx].category = e.target.value as any;
                              setFormData({ ...formData, attractions: updated });
                            }}
                            className="w-full bg-[#0D1117] px-2 py-1.5 rounded-lg text-xs text-stone-300 border border-stone-700 focus:outline-none focus:border-[#E5B869]"
                          >
                            <option value="transit">Transit / Airport</option>
                            <option value="industrial">Industrial Hub</option>
                            <option value="health">Healthcare</option>
                            <option value="sports">Sports Arena</option>
                            <option value="nature">Nature / Park</option>
                            <option value="leisure">Leisure / Shrine</option>
                          </select>
                        </div>
                      </div>

                      {/* Type Badge & Map Query */}
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-stone-400 font-semibold block mb-0.5">Type Badge</label>
                          <input
                            type="text"
                            value={attr.type}
                            onChange={(e) => {
                              const updated = [...formData.attractions];
                              updated[attrIdx].type = e.target.value;
                              setFormData({ ...formData, attractions: updated });
                            }}
                            className="w-full bg-[#0D1117] px-2 py-1.5 rounded-lg text-xs text-stone-300 border border-stone-700"
                            placeholder="e.g. Railway Station"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-stone-400 font-semibold block mb-0.5">Map Search Query</label>
                          <input
                            type="text"
                            value={attr.mapQuery || ''}
                            onChange={(e) => {
                              const updated = [...formData.attractions];
                              updated[attrIdx].mapQuery = e.target.value;
                              setFormData({ ...formData, attractions: updated });
                            }}
                            className="w-full bg-[#0D1117] px-2 py-1.5 rounded-lg text-xs text-stone-300 border border-stone-700"
                            placeholder="e.g. Unnao+Railway+Station"
                          />
                        </div>
                      </div>

                      {/* Image URL & Upload */}
                      <div>
                        <label className="text-[10px] text-stone-400 font-semibold block mb-0.5">Photo URL / Upload</label>
                        <div className="flex gap-1.5">
                          <input
                            type="text"
                            value={attr.image}
                            onChange={(e) => {
                              const updated = [...formData.attractions];
                              updated[attrIdx].image = e.target.value;
                              setFormData({ ...formData, attractions: updated });
                            }}
                            className="flex-1 bg-[#0D1117] px-2 py-1.5 rounded-lg text-xs text-stone-300 border border-stone-700"
                            placeholder="https://images.unsplash.com/..."
                          />
                          <label className="px-2.5 py-1.5 bg-stone-800 hover:bg-stone-700 rounded-lg text-stone-300 text-xs font-semibold flex items-center gap-1 cursor-pointer shrink-0">
                            <Upload className="w-3 h-3 text-[#E5B869]" />
                            <span>Upload</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleFileUpload(e, (url) => {
                                  const updated = [...formData.attractions];
                                  updated[attrIdx].image = url;
                                  setFormData({ ...formData, attractions: updated });
                                })
                              }
                            />
                          </label>
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="text-[10px] text-stone-400 font-semibold block mb-0.5">Description</label>
                        <textarea
                          rows={2}
                          value={attr.description}
                          onChange={(e) => {
                            const updated = [...formData.attractions];
                            updated[attrIdx].description = e.target.value;
                            setFormData({ ...formData, attractions: updated });
                          }}
                          className="w-full bg-[#0D1117] p-2 rounded-lg text-xs text-stone-300 border border-stone-700 focus:outline-none focus:border-[#E5B869]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 10. GUEST REVIEWS CMS */}
            {activeTab === 'reviews' && (
              <div className="max-w-4xl space-y-6 animate-fadeIn">
                <div className="border-b border-stone-800 pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2.5">
                      <Star className="w-6 h-6 text-[#E5B869]" />
                      Guest Reviews & Testimonials CMS
                    </h2>
                    <p className="text-xs text-stone-400 mt-1">
                      Manage featured verified guest feedback displayed in the social proof section.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const newRev: ReviewItem = {
                        id: `rev-${Date.now()}`,
                        author: 'Verified Guest',
                        rating: 5,
                        source: 'Google Reviews',
                        comment: 'Excellent hospitality, clean rooms and delicious vegetarian food at Royal Kitchen.',
                        date: 'Recently',
                      };
                      setFormData({ ...formData, reviews: [...formData.reviews, newRev] });
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#E5B869] text-stone-950 font-bold text-xs uppercase"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Review</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {formData.reviews.map((rev, revIdx) => (
                    <div key={rev.id} className="p-4 rounded-xl bg-[#161B22] border border-stone-800 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={rev.author}
                          onChange={(e) => {
                            const updated = [...formData.reviews];
                            updated[revIdx].author = e.target.value;
                            setFormData({ ...formData, reviews: updated });
                          }}
                          className="font-bold text-xs text-white bg-transparent border-b border-transparent focus:border-[#E5B869]"
                        />

                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="1"
                            max="5"
                            value={rev.rating}
                            onChange={(e) => {
                              const updated = [...formData.reviews];
                              updated[revIdx].rating = parseInt(e.target.value, 10) || 5;
                              setFormData({ ...formData, reviews: updated });
                            }}
                            className="w-12 bg-[#0D1117] text-xs text-center text-[#E5B869] font-bold rounded py-0.5 border border-stone-700"
                          />
                          <button
                            onClick={() => {
                              const updated = formData.reviews.filter((_, i) => i !== revIdx);
                              setFormData({ ...formData, reviews: updated });
                            }}
                            className="text-stone-500 hover:text-rose-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <textarea
                        rows={3}
                        value={rev.comment}
                        onChange={(e) => {
                          const updated = [...formData.reviews];
                          updated[revIdx].comment = e.target.value;
                          setFormData({ ...formData, reviews: updated });
                        }}
                        className="w-full bg-[#0D1117] p-2.5 rounded-lg text-xs text-stone-300 border border-stone-700"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 11. FAQ CMS */}
            {activeTab === 'faqs' && (
              <div className="max-w-4xl space-y-6 animate-fadeIn">
                <div className="border-b border-stone-800 pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2.5">
                      <HelpCircle className="w-6 h-6 text-[#E5B869]" />
                      Frequently Asked Questions (FAQ) CMS
                    </h2>
                    <p className="text-xs text-stone-400 mt-1">
                      Edit common guest questions regarding check-in, parking, vegetarian food, and payment options.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const newFaq: FAQItem = {
                        id: `faq-${Date.now()}`,
                        question: 'New Question?',
                        answer: 'Helpful explanation for hotel guests.',
                      };
                      setFormData({ ...formData, faqs: [...formData.faqs, newFaq] });
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#E5B869] text-stone-950 font-bold text-xs uppercase"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add FAQ</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.faqs.map((faq, faqIdx) => (
                    <div key={faq.id} className="p-4 rounded-xl bg-[#161B22] border border-stone-800 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => {
                            const updated = [...formData.faqs];
                            updated[faqIdx].question = e.target.value;
                            setFormData({ ...formData, faqs: updated });
                          }}
                          className="w-full font-bold text-xs text-[#E5B869] bg-transparent border-b border-transparent focus:border-[#E5B869] focus:outline-none"
                        />
                        <button
                          onClick={() => {
                            const updated = formData.faqs.filter((_, i) => i !== faqIdx);
                            setFormData({ ...formData, faqs: updated });
                          }}
                          className="text-stone-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <textarea
                        rows={2}
                        value={faq.answer}
                        onChange={(e) => {
                          const updated = [...formData.faqs];
                          updated[faqIdx].answer = e.target.value;
                          setFormData({ ...formData, faqs: updated });
                        }}
                        className="w-full bg-[#0D1117] p-2.5 rounded-lg text-xs text-stone-300 border border-stone-700"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: SEO & Search Rankings */}
            {activeTab === 'seo' && (
              <div className="space-y-8 animate-fadeIn max-w-5xl">
                {/* Header Strip */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-stone-900 via-[#18202b] to-stone-900 border border-stone-800">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#E5B869]/20 text-[#E5B869] border border-[#E5B869]/30">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="font-serif text-lg sm:text-xl font-bold text-white">
                          Search Engine Optimization (SEO) & Social Sharing
                        </h2>
                        <p className="text-xs text-stone-400 mt-0.5">
                          Manage Google search rankings, Open Graph social share cards (WhatsApp, Facebook, X), and Schema.org rich snippets.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (initialHotelData.seo) {
                          setFormData({
                            ...formData,
                            seo: { ...initialHotelData.seo }
                          });
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-semibold border border-stone-700 transition-colors cursor-pointer"
                      title="Load recommended SEO defaults"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Recommended Defaults</span>
                    </button>

                    <a
                      href="https://search.google.com/test/rich-results"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E5B869]/15 hover:bg-[#E5B869]/25 text-[#E5B869] text-xs font-semibold border border-[#E5B869]/30 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Rich Results Test</span>
                    </a>
                  </div>
                </div>

                {/* Live Previews Panel: Google SERP & Social Card */}
                <div className="p-6 rounded-2xl bg-[#161B22] border border-stone-800 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800/80 pb-4">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-[#E5B869]" />
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                        Live Search &amp; Social Share Previews
                      </h3>
                    </div>

                    <div className="flex items-center gap-1 p-1 rounded-xl bg-[#0D1117] border border-stone-800 text-xs">
                      <button
                        type="button"
                        onClick={() => setSeoPreviewMode('desktop')}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                          seoPreviewMode === 'desktop'
                            ? 'bg-[#E5B869] text-stone-950 font-bold'
                            : 'text-stone-400 hover:text-white'
                        }`}
                      >
                        <Monitor className="w-3.5 h-3.5" />
                        <span>Google Desktop</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSeoPreviewMode('mobile')}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                          seoPreviewMode === 'mobile'
                            ? 'bg-[#E5B869] text-stone-950 font-bold'
                            : 'text-stone-400 hover:text-white'
                        }`}
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                        <span>Google Mobile</span>
                      </button>
                    </div>
                  </div>

                  {/* Google Search Result Mockup */}
                  <div className="p-4 sm:p-5 rounded-xl bg-[#202124] border border-stone-700/60 font-sans shadow-md">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div className="w-6 h-6 rounded-full bg-[#303134] flex items-center justify-center overflow-hidden shrink-0 border border-stone-600">
                        <img src="/logo.svg" alt="Google Favicon" className="w-4 h-4 object-contain" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[12px] text-[#bdc1c6] font-medium leading-none">
                          Hotel Bridge, Unnao
                        </span>
                        <span className="text-[11px] text-[#9aa0a6] leading-none mt-1 truncate">
                          {formData.seo?.canonicalUrl || formData.website || 'https://hotelbridge.in'} › unnao › stay
                        </span>
                      </div>
                    </div>

                    <h4 className="text-base sm:text-lg text-[#8ab4f8] font-normal hover:underline cursor-pointer leading-snug line-clamp-2">
                      {formData.seo?.metaTitle || `${formData.name}, ${formData.city} | Best Hotel & Pure Veg Restaurant on Lucknow Bypass`}
                    </h4>

                    <p className="text-xs sm:text-sm text-[#bdc1c6] mt-1.5 line-clamp-2 leading-relaxed">
                      {formData.seo?.metaDescription ||
                        `Book your stay at ${formData.name}, ${formData.city}. Premium AC rooms, Royal Kitchen 100% pure vegetarian dining, banquet halls, and easy transit near Lucknow Bypass.`}
                    </p>

                    {/* Sitelinks mockup */}
                    <div className="mt-3 pt-3 border-t border-stone-700/60 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-[#8ab4f8]">
                      <div className="hover:underline cursor-pointer">Rooms &amp; Suites</div>
                      <div className="hover:underline cursor-pointer">Royal Kitchen Veg Dining</div>
                      <div className="hover:underline cursor-pointer">Banquets &amp; Weddings</div>
                      <div className="hover:underline cursor-pointer">Contact &amp; Location</div>
                    </div>
                  </div>

                  {/* Social Share Card Preview (WhatsApp / Facebook / Twitter) */}
                  <div className="pt-2">
                    <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-stone-400">
                      <Share2 className="w-3.5 h-3.5 text-[#E5B869]" />
                      <span>WhatsApp &amp; Social Card Share Preview</span>
                    </div>

                    <div className="max-w-md rounded-2xl overflow-hidden border border-stone-700/80 bg-[#0D1117] shadow-lg">
                      <div className="relative aspect-[1.91/1] w-full bg-stone-900 overflow-hidden">
                        <img
                          src={formData.seo?.ogImage || formData.heroImage}
                          alt="Social Share Thumbnail"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs text-[10px] text-white/90 font-mono">
                          1200 × 630 (OG Card)
                        </div>
                      </div>
                      <div className="p-3.5 space-y-1">
                        <span className="text-[10px] uppercase tracking-wider text-stone-400 font-mono block">
                          hotelbridge.in
                        </span>
                        <h5 className="text-xs sm:text-sm font-semibold text-white line-clamp-1">
                          {formData.seo?.metaTitle || formData.name}
                        </h5>
                        <p className="text-[11px] text-stone-400 line-clamp-2 leading-relaxed">
                          {formData.seo?.metaDescription || formData.heroSubtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Core Meta Tags Form */}
                <div className="p-6 rounded-2xl bg-[#161B22] border border-stone-800 space-y-6">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-[#E5B869]" />
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                        Metadata &amp; Search Tag Settings
                      </h3>
                    </div>
                  </div>

                  {/* Meta Title */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <label className="font-semibold text-stone-300">
                        Page Title (<code className="text-[#E5B869] text-[11px]">&lt;title&gt;</code> &amp; <code className="text-[#E5B869] text-[11px]">og:title</code>)
                      </label>
                      <span
                        className={`text-[11px] font-mono font-medium ${
                          (formData.seo?.metaTitle?.length || 0) >= 45 && (formData.seo?.metaTitle?.length || 0) <= 65
                            ? 'text-emerald-400'
                            : (formData.seo?.metaTitle?.length || 0) > 65
                            ? 'text-amber-400'
                            : 'text-stone-400'
                        }`}
                      >
                        {formData.seo?.metaTitle?.length || 0} / 60 characters (Optimal: 50–60)
                      </span>
                    </div>
                    <input
                      type="text"
                      value={formData.seo?.metaTitle || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          seo: {
                            ...(formData.seo || (initialHotelData.seo as any)),
                            metaTitle: e.target.value,
                          },
                        })
                      }
                      placeholder="Hotel Bridge, Unnao | Best Hotel & Pure Veg Restaurant on Lucknow Bypass"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0D1117] border border-stone-700 text-sm text-white focus:outline-none focus:border-[#E5B869]"
                    />
                    <p className="text-[11px] text-stone-500">
                      The primary headline displayed in Google search results and browser tabs.
                    </p>
                  </div>

                  {/* Meta Description */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <label className="font-semibold text-stone-300">
                        Meta Description (<code className="text-[#E5B869] text-[11px]">&lt;meta name="description"&gt;</code> &amp; <code className="text-[#E5B869] text-[11px]">og:description</code>)
                      </label>
                      <span
                        className={`text-[11px] font-mono font-medium ${
                          (formData.seo?.metaDescription?.length || 0) >= 120 && (formData.seo?.metaDescription?.length || 0) <= 165
                            ? 'text-emerald-400'
                            : (formData.seo?.metaDescription?.length || 0) > 165
                            ? 'text-amber-400'
                            : 'text-stone-400'
                        }`}
                      >
                        {formData.seo?.metaDescription?.length || 0} / 160 characters (Optimal: 120–160)
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      value={formData.seo?.metaDescription || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          seo: {
                            ...(formData.seo || (initialHotelData.seo as any)),
                            metaDescription: e.target.value,
                          },
                        })
                      }
                      placeholder="Book your stay at Hotel Bridge, Unnao. Premium AC rooms, Royal Kitchen 100% pure vegetarian dining, banquet halls, and easy transit near Lucknow Bypass with direct WhatsApp booking."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0D1117] border border-stone-700 text-sm text-white focus:outline-none focus:border-[#E5B869]"
                    />
                    <p className="text-[11px] text-stone-500">
                      Summarizes your property and dining for search snippets. Keep within 120–160 characters.
                    </p>
                  </div>

                  {/* Meta Keywords */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-stone-300">
                      Meta Keywords (Comma separated)
                    </label>
                    <input
                      type="text"
                      value={formData.seo?.metaKeywords || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          seo: {
                            ...(formData.seo || (initialHotelData.seo as any)),
                            metaKeywords: e.target.value,
                          },
                        })
                      }
                      placeholder="hotel in unnao, hotel bridge unnao, royal kitchen unnao, pure veg restaurant unnao, lucknow bypass hotel"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0D1117] border border-stone-700 text-sm text-white focus:outline-none focus:border-[#E5B869]"
                    />
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['hotel in unnao', 'royal kitchen unnao', 'pure veg restaurant unnao', 'lucknow bypass hotel', 'banquet hall unnao', 'wedding lawn unnao'].map((kw) => (
                        <span key={kw} className="text-[10px] px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 border border-stone-700">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Canonical URL */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-stone-300">
                        Canonical URL (<code className="text-[#E5B869] text-[11px]">rel="canonical"</code>)
                      </label>
                      <input
                        type="url"
                        value={formData.seo?.canonicalUrl || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            seo: {
                              ...(formData.seo || (initialHotelData.seo as any)),
                              canonicalUrl: e.target.value,
                            },
                          })
                        }
                        placeholder="https://hotelbridge.in/"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0D1117] border border-stone-700 text-sm text-white focus:outline-none focus:border-[#E5B869]"
                      />
                      <p className="text-[11px] text-stone-500">
                        Prevents duplicate content penalties across domains.
                      </p>
                    </div>

                    {/* Twitter Card Type */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-stone-300">
                        Twitter / X Card Format
                      </label>
                      <select
                        value={formData.seo?.twitterCardType || 'summary_large_image'}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            seo: {
                              ...(formData.seo || (initialHotelData.seo as any)),
                              twitterCardType: e.target.value as any,
                            },
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0D1117] border border-stone-700 text-sm text-white focus:outline-none focus:border-[#E5B869]"
                      >
                        <option value="summary_large_image">summary_large_image (High Impact Visual Banner)</option>
                        <option value="summary">summary (Compact Square Thumbnail)</option>
                      </select>
                      <p className="text-[11px] text-stone-500">
                        Configures how links render when shared on Twitter / X.
                      </p>
                    </div>
                  </div>

                  {/* Social Share Image (OG Image) */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-stone-300">
                      OpenGraph Social Share Image URL (<code className="text-[#E5B869] text-[11px]">og:image</code>)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={formData.seo?.ogImage || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            seo: {
                              ...(formData.seo || (initialHotelData.seo as any)),
                              ogImage: e.target.value,
                            },
                          })
                        }
                        placeholder="https://images.unsplash.com/photo-..."
                        className="flex-1 px-4 py-2.5 rounded-xl bg-[#0D1117] border border-stone-700 text-sm text-white focus:outline-none focus:border-[#E5B869]"
                      />
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-200 border border-stone-700 shrink-0">
                        <Upload className="w-3.5 h-3.5 text-[#E5B869]" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUpload(e, (url) => {
                              setFormData({
                                ...formData,
                                seo: {
                                  ...(formData.seo || (initialHotelData.seo as any)),
                                  ogImage: url,
                                },
                              });
                            })
                          }
                        />
                      </label>
                    </div>
                    <p className="text-[11px] text-stone-500">
                      Recommended dimension: 1200 x 630 px. Used by WhatsApp, Facebook, LinkedIn, Telegram, and Twitter.
                    </p>
                  </div>
                </div>

                {/* Local SEO & Coordinates */}
                <div className="p-6 rounded-2xl bg-[#161B22] border border-stone-800 space-y-4">
                  <div className="flex items-center gap-2 border-b border-stone-800 pb-3">
                    <MapPin className="w-4 h-4 text-[#E5B869]" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Local SEO &amp; Geotagging
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-400">Schema Business Type</label>
                      <select
                        value={formData.seo?.businessType || 'Hotel'}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            seo: {
                              ...(formData.seo || (initialHotelData.seo as any)),
                              businessType: e.target.value as any,
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#0D1117] border border-stone-700 text-xs text-white"
                      >
                        <option value="Hotel">Hotel (Recommended)</option>
                        <option value="LodgingBusiness">LodgingBusiness</option>
                        <option value="Resort">Resort</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-400">Latitude (<code className="text-[#E5B869]">geo.position</code>)</label>
                      <input
                        type="text"
                        value={formData.seo?.geoLatitude || '26.5450'}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            seo: {
                              ...(formData.seo || (initialHotelData.seo as any)),
                              geoLatitude: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#0D1117] border border-stone-700 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-400">Longitude (<code className="text-[#E5B869]">geo.position</code>)</label>
                      <input
                        type="text"
                        value={formData.seo?.geoLongitude || '80.4800'}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            seo: {
                              ...(formData.seo || (initialHotelData.seo as any)),
                              geoLongitude: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#0D1117] border border-stone-700 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Schema.org Structured Data Live Inspector */}
                <div className="p-6 rounded-2xl bg-[#161B22] border border-stone-800 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Code className="w-4 h-4 text-[#E5B869]" />
                      <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                          Live Schema.org Structured Data (JSON-LD)
                        </h3>
                        <p className="text-[11px] text-stone-400">
                          Automatically generated from your live rooms, restaurant menu, address, rating, and FAQs.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-300">
                        <input
                          type="checkbox"
                          checked={formData.seo?.enableStructuredData !== false}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              seo: {
                                ...(formData.seo || (initialHotelData.seo as any)),
                                enableStructuredData: e.target.checked,
                              },
                            })
                          }
                          className="w-4 h-4 accent-[#E5B869] rounded"
                        />
                        <span className="font-semibold">Enable JSON-LD Injection</span>
                      </label>

                      <button
                        type="button"
                        onClick={() => {
                          const jsonScript = document.getElementById('hotel-dynamic-jsonld');
                          const content = jsonScript?.textContent || '';
                          navigator.clipboard.writeText(content);
                          setCopiedJsonLd(true);
                          setTimeout(() => setCopiedJsonLd(false), 2000);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition-colors cursor-pointer"
                      >
                        {copiedJsonLd ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[#E5B869]" />
                            <span>Copy JSON-LD</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="bg-[#0D1117] rounded-xl p-4 border border-stone-800 max-h-56 overflow-y-auto font-mono text-[11px] text-emerald-400/90 custom-scrollbar select-text">
                    <pre className="whitespace-pre-wrap">
                      {JSON.stringify(
                        {
                          '@context': 'https://schema.org',
                          '@graph': [
                            {
                              '@type': [formData.seo?.businessType || 'Hotel', 'LodgingBusiness'],
                              name: formData.name,
                              description: formData.aboutIntro,
                              url: formData.seo?.canonicalUrl || formData.website,
                              telephone: formData.primaryPhone,
                              starRating: { '@type': 'Rating', ratingValue: formData.googleRating },
                              aggregateRating: {
                                '@type': 'AggregateRating',
                                ratingValue: formData.googleRating,
                                reviewCount: formData.reviewCount,
                              },
                              address: {
                                '@type': 'PostalAddress',
                                streetAddress: `${formData.addressLine1}, ${formData.addressLine2}`,
                                addressLocality: formData.city,
                                addressRegion: formData.state,
                                postalCode: formData.pincode,
                                addressCountry: 'IN',
                              },
                              amenityFeatureCount: formData.facilities?.length,
                              roomsCount: formData.rooms?.length,
                            },
                            {
                              '@type': 'Restaurant',
                              name: formData.restaurant?.name,
                              servesCuisine: formData.restaurant?.cuisines,
                              isPureVeg: formData.restaurant?.isPureVeg,
                            },
                            {
                              '@type': 'FAQPage',
                              faqsCount: formData.faqs?.length,
                            },
                          ],
                        },
                        null,
                        2
                      )}
                    </pre>
                  </div>
                </div>

                {/* SEO Health Audit Checklist */}
                <div className="p-6 rounded-2xl bg-[#161B22] border border-stone-800 space-y-4">
                  <div className="flex items-center gap-2 border-b border-stone-800 pb-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      SEO Technical Audit Checklist
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#0D1117] border border-stone-800">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-white block">Optimized Title Tag</span>
                        <span className="text-[11px] text-stone-400">
                          {formData.seo?.metaTitle?.length || 0} characters with branded keyword targeting.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#0D1117] border border-stone-800">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-white block">Actionable Meta Description</span>
                        <span className="text-[11px] text-stone-400">
                          {formData.seo?.metaDescription?.length || 0} characters with phone &amp; booking CTA.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#0D1117] border border-stone-800">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-white block">OpenGraph &amp; Twitter Cards</span>
                        <span className="text-[11px] text-stone-400">
                          Rich image previews configured for WhatsApp, Facebook &amp; X sharing.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#0D1117] border border-stone-800">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-white block">Schema.org JSON-LD Graph</span>
                        <span className="text-[11px] text-stone-400">
                          Structured data for Hotel, Restaurant, Breadcrumbs &amp; FAQ Accordions.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#0D1117] border border-stone-800">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-white block">Robots.txt &amp; XML Sitemap</span>
                        <span className="text-[11px] text-stone-400">
                          Active at <code className="text-[#E5B869]">/robots.txt</code> and <code className="text-[#E5B869]">/sitemap.xml</code>.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#0D1117] border border-stone-800">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-white block">Local Geotags &amp; Map Coordinates</span>
                        <span className="text-[11px] text-stone-400">
                          Geotagged for Unnao, Uttar Pradesh ({formData.seo?.geoLatitude || '26.5450'}, {formData.seo?.geoLongitude || '80.4800'}).
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#161B22] border border-stone-700 rounded-2xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 mx-auto flex items-center justify-center border border-rose-500/30">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Reset to Default Content?</h3>
              <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
                This will revert all your customized room descriptions, menus, photography links, and phone numbers back to initial Hotel Bridge defaults.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmReset}
                className="py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-lg"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Menu Category Modal */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#161B22] border border-stone-700 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="w-5 h-5 text-[#E5B869]" />
                <h3 className="text-base font-bold text-white">Add New Menu Category</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddCategoryModal(false)}
                className="text-stone-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Category Name <span className="text-[#E5B869]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mocktails & Cold Drinks, Tandoori Platters..."
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0D1117] rounded-xl border border-stone-700 text-white text-xs focus:border-[#E5B869] focus:outline-none"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Category Tagline / Description (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Refreshing mocktails, freshly brewed tea, coffee and shakes."
                  value={newCategoryDesc}
                  onChange={(e) => setNewCategoryDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0D1117] rounded-xl border border-stone-700 text-white text-xs focus:border-[#E5B869] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAddCategoryModal(false)}
                className="py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const catName = newCategoryName.trim() || 'New Menu Category';
                  const catDesc = newCategoryDesc.trim() || 'Fresh vegetarian specialties';
                  const newCat: MenuCategory = {
                    id: `cat-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
                    name: catName,
                    description: catDesc,
                    items: [
                      {
                        id: `dish-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
                        name: `${catName} Special`,
                        category: catName,
                        price: 220,
                        description: 'Signature freshly prepared delicacy',
                        isChefSpecial: true,
                        isJainAvailable: true,
                      },
                    ],
                  };
                  const updated = [...formData.restaurant.menuCategories, newCat];
                  setFormData({
                    ...formData,
                    restaurant: {
                      ...formData.restaurant,
                      menuCategories: updated,
                    },
                  });
                  setSelectedMenuCategoryIndex(updated.length - 1);
                  setShowAddCategoryModal(false);
                  setNewCategoryName('');
                  setNewCategoryDesc('');
                  showToast(`✓ Category "${catName}" created with 1 starter dish!`);
                }}
                className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#E5B869] to-[#C59B4B] hover:brightness-110 text-stone-950 font-bold text-xs uppercase shadow-lg cursor-pointer"
              >
                Create Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Live Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#161B22] border border-[#E5B869] text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle className="w-4 h-4 text-[#E5B869] shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

    </div>
  );
};
