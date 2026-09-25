import React from 'react';
import { useHotel } from '../context/HotelContext';
import { Star, ShieldCheck, ExternalLink } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from './MotionContainer';
import { motion } from 'motion/react';

export const ReviewsSection: React.FC = () => {
  const { hotel } = useHotel();

  return (
    <section id="reviews" className="py-20 bg-[#FAF8F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Rating Proof Summary Banner */}
        <FadeIn direction="up" distance={20} className="bg-white rounded-2xl p-6 sm:p-10 border border-[#E6DFD5] shadow-xs mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-5 text-center md:text-left">
              <div className="w-20 h-20 rounded-2xl bg-[#F5EFE6] border border-[#E6DFD5] flex flex-col items-center justify-center flex-shrink-0">
                <span className="font-serif text-3xl font-bold text-[#916B36]">
                  {hotel.googleRating}
                </span>
                <div className="flex items-center text-[#E5B869] mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 fill-[#E5B869]" />
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="text-xs uppercase font-bold tracking-widest text-[#916B36]">
                    GOOGLE RATING
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-green-700 bg-green-50 px-2 py-0.5 rounded font-semibold">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Public Score
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1E232A] mt-1">
                  Rated {hotel.googleRating} / 5.0
                </h3>
                <p className="text-xs text-[#6F6B64] mt-0.5">
                  Based on {hotel.reviewCount}+ public Google customer reviews
                </p>
              </div>
            </div>

            {/* Read on Google link */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Hotel+Bridge+Unnao"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FAF8F5] border border-[#D5CABE] hover:bg-[#F0E8DC] text-[#1E232A] text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              <span>Read Verified Google Reviews</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#916B36]" />
            </a>

          </div>
        </FadeIn>

        {/* Authentic Review Snippets with Stagger */}
        <StaggerContainer staggerDelay={0.12} initialDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hotel.reviews.map((rev) => (
            <StaggerItem
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-[#E6DFD5] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-[#E5B869] mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#E5B869]" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#4E5662] leading-relaxed italic mb-6">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#1E232A]">{rev.author}</h4>
                  <span className="text-[11px] text-stone-400">{rev.date}</span>
                </div>
                <span className="text-[10px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded font-medium">
                  {rev.source}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
};
