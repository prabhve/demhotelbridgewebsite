import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { HotelConfig, Room, GalleryMedia } from '../types/hotel';
import { initialHotelData } from '../data/hotelData';

interface HotelContextType {
  hotel: HotelConfig;
  updateHotel: (newConfig: HotelConfig) => void;
  resetHotelData: () => void;
  
  // WhatsApp Action Builders
  getWhatsAppUrl: (type: 'general' | 'room' | 'restaurant' | 'event' | 'contact', params?: Record<string, string>) => string;
  openWhatsApp: (type: 'general' | 'room' | 'restaurant' | 'event' | 'contact', params?: Record<string, string>) => void;
  getPhoneCallUrl: () => string;
  
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

  const getWhatsAppUrl = (
    type: 'general' | 'room' | 'restaurant' | 'event' | 'contact',
    params: Record<string, string> = {}
  ): string => {
    const rawNumber = (hotel.whatsappNumber || '916307951300').replace(/[^0-9]/g, '');
    let template = hotel.whatsappTemplates[type] || hotel.whatsappTemplates.general;

    // Replace variable placeholders
    Object.entries(params).forEach(([key, value]) => {
      template = template.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
    });

    // Cleanup unreplaced placeholders if any
    template = template.replace(/\{[a-zA-Z0-9_]+\}/g, '');

    const encodedText = encodeURIComponent(template.trim());
    return `https://wa.me/${rawNumber}?text=${encodedText}`;
  };

  const openWhatsApp = (
    type: 'general' | 'room' | 'restaurant' | 'event' | 'contact',
    params: Record<string, string> = {}
  ) => {
    const url = getWhatsAppUrl(type, params);
    try {
      const opened = window.open(url, '_blank', 'noopener,noreferrer');
      if (!opened || opened.closed || typeof opened.closed === 'undefined') {
        window.location.href = url;
      }
    } catch {
      window.location.href = url;
    }
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
        openWhatsApp,
        getPhoneCallUrl,
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
