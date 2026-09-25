import React, { useEffect } from 'react';
import { useHotel } from '../context/HotelContext';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export const GalleryLightbox: React.FC = () => {
  const { lightboxImage, setLightboxImage, hotel } = useHotel();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxImage) return;
      if (e.key === 'Escape') setLightboxImage(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage, hotel.gallery]);

  if (!lightboxImage) return null;

  const gallery = hotel.gallery;
  const currentIndex = gallery.findIndex(item => item.id === lightboxImage.id);

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % gallery.length;
    setLightboxImage(gallery[nextIdx]);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + gallery.length) % gallery.length;
    setLightboxImage(gallery[prevIdx]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 select-none animate-fadeIn">
      {/* Close Button */}
      <button
        onClick={() => setLightboxImage(null)}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev Button */}
      <button
        onClick={handlePrev}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors z-50 border border-white/20"
        aria-label="Previous Image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors z-50 border border-white/20"
        aria-label="Next Image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Image Container */}
      <div className="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center">
        <img
          src={lightboxImage.url}
          alt={lightboxImage.alt || lightboxImage.title}
          className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
        />
        
        <div className="mt-4 text-center text-white">
          <h4 className="font-serif text-lg font-bold">
            {lightboxImage.title}
          </h4>
          <span className="text-xs text-stone-300 uppercase tracking-widest mt-1 block">
            {lightboxImage.category} • Photo {currentIndex + 1} of {gallery.length}
          </span>
        </div>
      </div>
    </div>
  );
};
