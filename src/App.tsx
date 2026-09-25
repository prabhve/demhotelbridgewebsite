import React from 'react';
import { HotelProvider } from './context/HotelContext';
import { SEOHead } from './components/SEOHead';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { QuickInfoStrip } from './components/QuickInfoStrip';
import { AboutSection } from './components/AboutSection';
import { RoomsSection } from './components/RoomsSection';
import { RoomDetailModal } from './components/RoomDetailModal';
import { FacilitiesSection } from './components/FacilitiesSection';
import { RoyalKitchenSection } from './components/RoyalKitchenSection';
import { MenuViewerModal } from './components/MenuViewerModal';
import { EventsSection } from './components/EventsSection';
import { EventPlannerModal } from './components/EventPlannerModal';
import { GallerySection } from './components/GallerySection';
import { GalleryLightbox } from './components/GalleryLightbox';
import { AttractionsSection } from './components/AttractionsSection';
import { LocationSection } from './components/LocationSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { AdminCMSModal } from './components/AdminCMSModal';
import { PoliciesModal } from './components/PoliciesModal';

export default function App() {
  return (
    <HotelProvider>
      <SEOHead />
      <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E232A] font-sans antialiased selection:bg-[#E5D7C5] overflow-x-hidden pb-16 sm:pb-0">
        {/* 1. Header */}
        <Header />

        {/* Main Page Sections */}
        <main className="flex-1 w-full overflow-x-hidden">
          {/* 2. Hero */}
          <Hero />

          {/* 3. Quick Information Strip */}
          <QuickInfoStrip />

          {/* 4. Short Introduction */}
          <AboutSection />

          {/* 5. Rooms */}
          <RoomsSection />

          {/* 6. Facilities */}
          <FacilitiesSection />

          {/* 7. Royal Kitchen (Pure Veg Restaurant) */}
          <RoyalKitchenSection />

          {/* 8. Events & Celebrations */}
          <EventsSection />

          {/* 9. Gallery */}
          <GallerySection />

          {/* 10. Local Attractions */}
          <AttractionsSection />

          {/* 11. Location & Getting Here */}
          <LocationSection />

          {/* 12. Reviews & Social Proof */}
          <ReviewsSection />

          {/* 13. FAQ */}
          <FAQSection />

          {/* 14. Contact Section & Quick Inquiry Form */}
          <ContactSection />

          {/* 15. Final WhatsApp CTA */}
          <FinalCta />
        </main>

        {/* 16. Footer */}
        <Footer />

        {/* Floating Actions (WhatsApp & Call) */}
        <FloatingActions />

        {/* Contextual Interactive Modals */}
        <RoomDetailModal />
        <MenuViewerModal />
        <EventPlannerModal />
        <GalleryLightbox />
        <AdminCMSModal />
        <PoliciesModal />
      </div>
    </HotelProvider>
  );
}
