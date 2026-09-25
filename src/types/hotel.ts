export interface Room {
  id: string;
  name: string;
  category: 'deluxe' | 'suite' | 'super-deluxe' | 'standard';
  shortDesc: string;
  longDesc: string;
  size?: string;
  bedType: string;
  capacity: string;
  view?: string;
  images: string[];
  amenities: string[];
  featured: boolean;
  priceNote?: string;
  customPrice?: string; // Optional if enabled by admin
  showPrice?: boolean;
}

export interface Facility {
  id: string;
  name: string;
  iconName: string;
  description: string;
  category: 'room' | 'dining' | 'service' | 'safety' | 'transit';
  isVerified: boolean;
  isFeatured: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  isJainAvailable?: boolean;
  isChefSpecial?: boolean;
  spiciness?: 'mild' | 'medium' | 'spicy';
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
}

export interface RestaurantConfig {
  name: string;
  tagline: string;
  heading: string;
  subheading: string;
  description: string;
  isPureVeg: boolean;
  isJainAvailable: boolean;
  cuisines: string[];
  timing: string;
  images: string[];
  highlights: string[];
  menuCategories: MenuCategory[];
}

export interface EventOccasion {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  suitableCapacity?: string;
  features: string[];
}

export interface GalleryMedia {
  id: string;
  title: string;
  category: 'hotel' | 'rooms' | 'restaurant' | 'food' | 'events' | 'exterior' | 'interior';
  url: string;
  alt: string;
  isFeatured?: boolean;
}

export interface Attraction {
  id: string;
  name: string;
  distance: string;
  duration?: string;
  description: string;
  image: string;
  type: string;
  category?: 'transit' | 'industrial' | 'nature' | 'health' | 'sports' | 'shrine' | 'leisure';
  iconEmoji?: string;
  mapQuery?: string;
  googleMapsUrl?: string;
}

export interface TransitInfo {
  id: string;
  title: string;
  distance: string;
  type: 'railway' | 'airport' | 'highway' | 'industrial' | 'health' | 'sports';
  duration?: string;
  note?: string;
  iconEmoji?: string;
  mapQuery?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  source: 'Google Reviews' | 'Verified Guest';
  comment: string;
  date?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface WhatsAppTemplates {
  general: string;
  room: string;
  restaurant: string;
  event: string;
  contact: string;
}

export interface SEOConfig {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  canonicalUrl: string;
  ogImage: string;
  twitterCardType: 'summary_large_image' | 'summary';
  enableStructuredData: boolean;
  businessType: 'Hotel' | 'LodgingBusiness' | 'Resort';
  geoLatitude?: string;
  geoLongitude?: string;
}

export interface HotelConfig {
  name: string;
  tagline: string;
  heroHeadline: string;
  heroSubtitle: string;
  locationName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  fullAddress: string;
  primaryPhone: string;
  whatsappNumber: string;
  email?: string;
  website: string;
  logoUrl?: string;
  googleRating: number;
  reviewCount: number;
  googleMapUrl: string;
  googleMapEmbedUrl: string;
  heroImage: string;
  heroSecondaryImage?: string;
  aboutIntro: string;
  aboutHighlights: string[];
  whatsappTemplates: WhatsAppTemplates;
  rooms: Room[];
  facilities: Facility[];
  restaurant: RestaurantConfig;
  events: EventOccasion[];
  gallery: GalleryMedia[];
  attractions: Attraction[];
  transit: TransitInfo[];
  reviews: ReviewItem[];
  faqs: FAQItem[];
  seo?: SEOConfig;
}
