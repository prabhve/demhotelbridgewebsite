import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { HotelConfig, Room, GalleryMedia } from '../types/hotel';
import { initialHotelData } from '../data/hotelData';
import { cleanWhatsAppNumber, buildWhatsAppUrls, safeOpenNewTab, WhatsAppUrls } from '../utils/whatsapp';

interface HotelContextType {
  hotel: HotelConfig;
  updateHotel: (newConfig: HotelConfig) => void;
  resetHotelData: () => void;
  
  // WhatsApp Action Builders
  getWhatsAppUrl: (type: 'general' | 'room' | 'restaurant' | 'event' | 'contact', params?: Record<string, string>) => string;
  getWhatsAppWebUrl: (type: 'general' | 'room' | 'restaurant' | 'event' | 'contact', params?: Record<string, string>) => string;
  openWhatsApp: (type: 'general' | 'room' | 'restaurant' | 'event' | 'contact', params?: Record<string, string>) => void;
  openWhatsAppCustom: (customText: string, title?: string) => void;
  getPhoneCallUrl: () => string;
  
  // WhatsApp helper modal
  isWhatsAppModalOpen: boolean;
  setIsWhatsAppModalOpen: (open: boolean) => void;
  whatsAppModalData: WhatsAppUrls | null;
  
  // Modal states
  selectedRoom: Room | null;
  setSelectedRoom: (room: Room | null) => void;
  
  isMenuModalOpen: boolean;
  setIsMenuModalOpen: (open: boolean) => void;
  
  isEventModalOpen: boolean;
  setIsEventModalOpen: (open: boolean) => void;
  selectedEventOccasion: string | null;
  setSelectedEventOccasion: (id: string | null) => void;
  
  lightboxImage: GalleryMedia | null;
  setLightboxImage: (media: GalleryMedia | null) => void;
  
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  
  activePolicyModal: 'privacy' | 'terms' | 'cancellation' | null;
  setActivePolicyModal: (policy: 'privacy' | 'terms' | 'cancellation' | null) => void;
}

const STORAGE_KEY = 'hotel_bridge_config_v1';

const HotelContext = createContext<HotelContextType | undefined>(undefined);

export const HotelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [hotel, setHotel] = useState<HotelConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load local hotel config, falling back to default:', e);
    }
    return initialHotelData;
  });

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedEventOccasion, setSelectedEventOccasion] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<GalleryMedia | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activePolicyModal, setActivePolicyModal] = useState<'privacy' | 'terms' | 'cancellation' | null>(null);

  // WhatsApp Assistant Modal State
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [whatsAppModalData, setWhatsAppModalData] = useState<WhatsAppUrls | null>(null);

  // Sync document title with SEO title
  useEffect(() => {
    if (hotel.name) {
      document.title =
        hotel.seo?.metaTitle ||
        `${hotel.name}, ${hotel.city || 'Unnao'} | Best Hotel & Pure Veg Restaurant on Lucknow Bypass`;
    }
  }, [hotel.name, hotel.city, hotel.seo?.metaTitle]);

  const updateHotel = (newConfig: HotelConfig) => {
    setHotel(newConfig);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
    } catch (e) {
      console.error('Failed to save hotel config to localStorage:', e);
    }
  };

  const resetHotelData = () => {
    setHotel(initialHotelData);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear storage:', e);
    }
  };

  const getResolvedMessage = (
    type: 'general' | 'room' | 'restaurant' | 'event' | 'contact',
    params: Record<string, string> = {}
  ): string => {
    let template = hotel.whatsappTemplates[type] || hotel.whatsappTemplates.general;

    // Replace variable placeholders
    Object.entries(params).forEach(([key, value]) => {
      template = template.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
    });

    // Cleanup unreplaced placeholders if any
    template = template.replace(/\{[a-zA-Z0-9_]+\}/g, '');
    return template.trim();
  };

  const getWhatsAppUrl = (
    type: 'general' | 'room' | 'restaurant' | 'event' | 'contact',
    params: Record<string, string> = {}
  ): string => {
    const message = getResolvedMessage(type, params);
    const urls = buildWhatsAppUrls(hotel.whatsappNumber, message);
    return urls.apiUrl;
  };

  const getWhatsAppWebUrl = (
    type: 'general' | 'room' | 'restaurant' | 'event' | 'contact',
    params: Record<string, string> = {}
  ): string => {
    const message = getResolvedMessage(type, params);
    const urls = buildWhatsAppUrls(hotel.whatsappNumber, message);
    return urls.webUrl;
  };

  const openWhatsApp = (
    type: 'general' | 'room' | 'restaurant' | 'event' | 'contact',
    params: Record<string, string> = {}
  ) => {
    const message = getResolvedMessage(type, params);
    const urls = buildWhatsAppUrls(hotel.whatsappNumber, message);

    // Save modal data and open modal as assistant/fallback
    setWhatsAppModalData(urls);
    setIsWhatsAppModalOpen(true);

    // Attempt to open in a new tab without ever navigating current window/iframe
    safeOpenNewTab(urls.apiUrl);
  };

  const openWhatsAppCustom = (customText: string, _title?: string) => {
    const urls = buildWhatsAppUrls(hotel.whatsappNumber, customText);
    setWhatsAppModalData(urls);
    setIsWhatsAppModalOpen(true);
    safeOpenNewTab(urls.apiUrl);
  };

  const getPhoneCallUrl = (): string => {
    const cleaned = (hotel.primaryPhone || '+916307951300').replace(/[^0-9+]/g, '');
    return `tel:${cleaned}`;
  };

  return (
    <HotelContext.Provider
      value={{
        hotel,
        updateHotel,
        resetHotelData,
        getWhatsAppUrl,
        getWhatsAppWebUrl,
        openWhatsApp,
        openWhatsAppCustom,
        getPhoneCallUrl,
        isWhatsAppModalOpen,
        setIsWhatsAppModalOpen,
        whatsAppModalData,
        selectedRoom,
        setSelectedRoom,
        isMenuModalOpen,
        setIsMenuModalOpen,
        isEventModalOpen,
        setIsEventModalOpen,
        selectedEventOccasion,
        setSelectedEventOccasion,
        lightboxImage,
        setLightboxImage,
        isAdminOpen,
        setIsAdminOpen,
        activePolicyModal,
        setActivePolicyModal,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = (): HotelContextType => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};
